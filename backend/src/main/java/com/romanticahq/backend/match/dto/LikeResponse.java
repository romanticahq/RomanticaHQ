package com.romanticahq.backend.match.dto;

public class LikeResponse {

    private boolean matched;
    private Long conversationId;

    public LikeResponse() {}

    public LikeResponse(boolean matched, Long conversationId) {
        this.matched = matched;
        this.conversationId = conversationId;
    }

    public boolean isMatched() { return matched; }
    public void setMatched(boolean matched) { this.matched = matched; }

    public Long getConversationId() { return conversationId; }
    public void setConversationId(Long conversationId) { this.conversationId = conversationId; }
}

