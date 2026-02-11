package com.romanticahq.backend.chat.dto;

import java.time.Instant;

public class MessageResponse {

    private Long id;
    private Long senderId;
    private String body;
    private Instant createdAt;

    public MessageResponse() {}

    public MessageResponse(Long id, Long senderId, String body, Instant createdAt) {
        this.id = id;
        this.senderId = senderId;
        this.body = body;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}

