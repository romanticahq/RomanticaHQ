package com.romanticahq.backend.api;

import com.romanticahq.backend.chat.realtime.ChatRealtimePublisher;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    private final JdbcTemplate jdbcTemplate;
    private final ChatRealtimePublisher chatRealtimePublisher;
    private final JavaMailSender mailSender;
    private final boolean emailEnabled;
    private final boolean redisEnabled;
    private final org.springframework.data.redis.core.StringRedisTemplate redisTemplate;

    public HealthController(
            JdbcTemplate jdbcTemplate,
            ChatRealtimePublisher chatRealtimePublisher,
            ObjectProvider<JavaMailSender> mailSenderProvider,
            ObjectProvider<org.springframework.data.redis.core.StringRedisTemplate> redisTemplateProvider,
            @Value("${app.email.enabled:false}") boolean emailEnabled,
            @Value("${app.realtime.redis.enabled:false}") boolean redisEnabled
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.chatRealtimePublisher = chatRealtimePublisher;
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.redisTemplate = redisTemplateProvider.getIfAvailable();
        this.emailEnabled = emailEnabled;
        this.redisEnabled = redisEnabled;
    }

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        Map<String, Object> components = new LinkedHashMap<>();
        components.put("database", checkDatabase());
        components.put("mail", checkMail());
        components.put("websocket", Map.of("status", "UP", "activeSessions", chatRealtimePublisher.activeWebSocketSessions()));
        components.put("redis", checkRedis());

        boolean up = components.values().stream()
                .map(v -> (Map<?, ?>) v)
                .allMatch(v -> "UP".equals(v.get("status")));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("status", up ? "UP" : "DEGRADED");
        result.put("components", components);
        return result;
    }

    private Map<String, Object> checkDatabase() {
        try {
            Integer one = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return Map.of("status", (one != null && one == 1) ? "UP" : "DOWN");
        } catch (RuntimeException ex) {
            return Map.of("status", "DOWN", "error", ex.getClass().getSimpleName());
        }
    }

    private Map<String, Object> checkMail() {
        if (!emailEnabled) {
            return Map.of("status", "UP", "enabled", false);
        }
        if (mailSender == null) {
            return Map.of("status", "DOWN", "enabled", true, "error", "mail sender unavailable");
        }
        try {
            mailSender.createMimeMessage();
            return Map.of("status", "UP", "enabled", true);
        } catch (RuntimeException ex) {
            return Map.of("status", "DOWN", "enabled", true, "error", ex.getClass().getSimpleName());
        }
    }

    private Map<String, Object> checkRedis() {
        if (!redisEnabled) {
            return Map.of("status", "UP", "enabled", false);
        }
        if (redisTemplate == null) {
            return Map.of("status", "DOWN", "enabled", true, "error", "redis template unavailable");
        }
        try {
            String pong = redisTemplate.execute((RedisCallback<String>) connection -> connection.ping());
            return Map.of("status", "PONG".equalsIgnoreCase(pong) ? "UP" : "DOWN", "enabled", true);
        } catch (RuntimeException ex) {
            return Map.of("status", "DOWN", "enabled", true, "error", ex.getClass().getSimpleName());
        }
    }
}
