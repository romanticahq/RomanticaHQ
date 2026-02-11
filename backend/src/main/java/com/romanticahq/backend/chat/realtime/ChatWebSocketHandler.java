package com.romanticahq.backend.chat.realtime;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.romanticahq.backend.chat.dto.MessageResponse;
import com.romanticahq.backend.chat.entity.Conversation;
import com.romanticahq.backend.chat.repository.ConversationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(ChatWebSocketHandler.class);
    private static final String ATTR_CONVERSATION_ID = "conversationId";

    private final ConversationRepository conversationRepository;
    private final ObjectMapper objectMapper;

    // conversationId -> sessionId -> session
    private final ConcurrentHashMap<Long, ConcurrentHashMap<String, WebSocketSession>> sessionsByConversation =
            new ConcurrentHashMap<>();

    public ChatWebSocketHandler(ConversationRepository conversationRepository, ObjectMapper objectMapper) {
        this.conversationRepository = conversationRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Long userId = longAttr(session, JwtHandshakeInterceptor.ATTR_USER_ID);
        Long conversationId = parseConversationId(session.getUri());

        if (userId == null || conversationId == null) {
            session.close(CloseStatus.POLICY_VIOLATION);
            return;
        }

        if (!isConversationMember(userId, conversationId)) {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("Not allowed"));
            return;
        }

        session.getAttributes().put(ATTR_CONVERSATION_ID, conversationId);
        sessionsByConversation
                .computeIfAbsent(conversationId, ignored -> new ConcurrentHashMap<>())
                .put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        removeSession(session);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.warn("WebSocket transport error for session {}", session.getId(), exception);
        removeSession(session);
        if (session.isOpen()) {
            session.close(CloseStatus.SERVER_ERROR);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        // This endpoint is server-push only. Clients send messages via authenticated REST endpoint.
    }

    public void broadcastToConversation(long conversationId, MessageResponse payload) {
        Map<String, WebSocketSession> sessions = sessionsByConversation.get(conversationId);
        if (sessions == null || sessions.isEmpty()) return;

        String json;
        try {
            json = objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException ex) {
            log.error("Failed to serialize websocket message", ex);
            return;
        }

        TextMessage text = new TextMessage(json);
        sessions.values().forEach(session -> {
            if (!session.isOpen()) return;
            try {
                session.sendMessage(text);
            } catch (IOException ex) {
                log.warn("Failed to send websocket message to session {}", session.getId(), ex);
            }
        });
    }

    private boolean isConversationMember(long userId, long conversationId) {
        Conversation convo = conversationRepository.findById(conversationId).orElse(null);
        if (convo == null) return false;
        long u1 = convo.getUser1().getId();
        long u2 = convo.getUser2().getId();
        return userId == u1 || userId == u2;
    }

    private void removeSession(WebSocketSession session) {
        Long conversationId = longAttr(session, ATTR_CONVERSATION_ID);
        if (conversationId == null) return;
        Map<String, WebSocketSession> sessions = sessionsByConversation.get(conversationId);
        if (sessions == null) return;
        sessions.remove(session.getId());
        if (sessions.isEmpty()) {
            sessionsByConversation.remove(conversationId);
        }
    }

    private static Long parseConversationId(URI uri) {
        if (uri == null || uri.getQuery() == null) return null;
        String[] parts = uri.getQuery().split("&");
        for (String part : parts) {
            int eq = part.indexOf('=');
            if (eq <= 0) continue;
            String key = part.substring(0, eq);
            String val = part.substring(eq + 1);
            if (!"conversationId".equals(key)) continue;
            try {
                long id = Long.parseLong(val);
                return id > 0 ? id : null;
            } catch (NumberFormatException ignored) {
                return null;
            }
        }
        return null;
    }

    private static Long longAttr(WebSocketSession session, String key) {
        Object value = session.getAttributes().get(key);
        if (value instanceof Long l) return l;
        if (value instanceof Number n) return n.longValue();
        return null;
    }
}

