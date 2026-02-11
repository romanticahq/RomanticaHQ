package com.romanticahq.backend.chat.realtime;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.romanticahq.backend.chat.dto.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class ChatRealtimePublisher {

    private static final Logger log = LoggerFactory.getLogger(ChatRealtimePublisher.class);

    private final ChatWebSocketHandler chatWebSocketHandler;
    private final ObjectMapper objectMapper;
    private final StringRedisTemplate redisTemplate;
    private final boolean redisEnabled;
    private final String redisChannel;
    private final String instanceId;

    public ChatRealtimePublisher(
            ChatWebSocketHandler chatWebSocketHandler,
            ObjectMapper objectMapper,
            @Value("${app.realtime.redis.enabled:false}") boolean redisEnabled,
            @Value("${app.realtime.redis.channel:rhq:chat:messages}") String redisChannel,
            @Value("${app.realtime.redis.instanceId:local}") String instanceId,
            org.springframework.beans.factory.ObjectProvider<StringRedisTemplate> redisTemplateProvider
    ) {
        this.chatWebSocketHandler = chatWebSocketHandler;
        this.objectMapper = objectMapper;
        this.redisEnabled = redisEnabled;
        this.redisChannel = redisChannel;
        this.instanceId = instanceId;
        this.redisTemplate = redisTemplateProvider.getIfAvailable();
    }

    public void publish(long conversationId, MessageResponse payload) {
        chatWebSocketHandler.broadcastToConversation(conversationId, payload);

        if (!redisEnabled || redisTemplate == null) return;

        try {
            RealtimeEnvelope envelope = new RealtimeEnvelope(instanceId, conversationId, payload);
            String json = objectMapper.writeValueAsString(envelope);
            redisTemplate.convertAndSend(redisChannel, json);
        } catch (Exception ex) {
            log.warn("Failed to publish realtime chat event to Redis", ex);
        }
    }

    @SuppressWarnings("unused")
    public void handleRedisEnvelope(String rawJson) {
        if (!redisEnabled || rawJson == null || rawJson.isBlank()) return;
        try {
            RealtimeEnvelope envelope = objectMapper.readValue(rawJson, RealtimeEnvelope.class);
            if (envelope.instanceId != null && envelope.instanceId.equals(instanceId)) {
                return;
            }
            if (envelope.message == null) return;
            chatWebSocketHandler.broadcastToConversation(envelope.conversationId, envelope.message);
        } catch (Exception ex) {
            log.warn("Failed to process realtime Redis payload", ex);
        }
    }

    public int activeWebSocketSessions() {
        return chatWebSocketHandler.activeSessionCount();
    }

    public boolean isRedisEnabled() {
        return redisEnabled;
    }

    private static class RealtimeEnvelope {
        public String instanceId;
        public long conversationId;
        public MessageResponse message;

        public RealtimeEnvelope() {
        }

        public RealtimeEnvelope(String instanceId, long conversationId, MessageResponse message) {
            this.instanceId = instanceId;
            this.conversationId = conversationId;
            this.message = message;
        }
    }
}

