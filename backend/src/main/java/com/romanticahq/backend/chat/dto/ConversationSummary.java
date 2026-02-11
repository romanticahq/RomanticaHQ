package com.romanticahq.backend.chat.dto;

public class ConversationSummary {

    private Long id;
    private Long otherUserId;
    private String otherFullName;

    public ConversationSummary() {}

    public ConversationSummary(Long id, Long otherUserId, String otherFullName) {
        this.id = id;
        this.otherUserId = otherUserId;
        this.otherFullName = otherFullName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOtherUserId() { return otherUserId; }
    public void setOtherUserId(Long otherUserId) { this.otherUserId = otherUserId; }

    public String getOtherFullName() { return otherFullName; }
    public void setOtherFullName(String otherFullName) { this.otherFullName = otherFullName; }
}

