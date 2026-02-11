package com.romanticahq.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    private record Rule(int maxRequests, int windowSeconds) {}
    private static final Map<String, Rule> RULES = Map.of(
            "POST:/api/users/login", new Rule(10, 60),
            "POST:/api/users/register", new Rule(5, 600),
            "POST:/api/auth/forgot-password", new Rule(5, 600),
            "POST:/api/auth/resend-verification", new Rule(5, 600)
    );

    private static final class Counter {
        long windowStartEpochSec;
        int count;
    }

    private final ConcurrentHashMap<String, Counter> counters = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String key = request.getMethod() + ":" + request.getRequestURI();
        Rule rule = RULES.get(key);
        if (rule == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = resolveClientIp(request);
        String bucketKey = key + ":" + clientIp;
        long now = Instant.now().getEpochSecond();

        Counter counter = counters.computeIfAbsent(bucketKey, ignored -> {
            Counter c = new Counter();
            c.windowStartEpochSec = now;
            c.count = 0;
            return c;
        });

        int retryAfter;
        synchronized (counter) {
            long elapsed = now - counter.windowStartEpochSec;
            if (elapsed >= rule.windowSeconds) {
                counter.windowStartEpochSec = now;
                counter.count = 0;
                elapsed = 0;
            }

            counter.count++;
            if (counter.count <= rule.maxRequests) {
                retryAfter = 0;
            } else {
                retryAfter = (int) Math.max(1, rule.windowSeconds - elapsed);
            }
        }

        if (retryAfter > 0) {
            response.setStatus(429);
            response.setContentType("application/json");
            response.setHeader("Retry-After", String.valueOf(retryAfter));
            response.getWriter().write("{\"error\":\"Too many requests. Please try again later.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private static String resolveClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            int idx = xff.indexOf(',');
            return (idx > 0 ? xff.substring(0, idx) : xff).trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) return realIp.trim();
        return request.getRemoteAddr() == null ? "unknown" : request.getRemoteAddr();
    }
}

