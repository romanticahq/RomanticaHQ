package com.romanticahq.backend.match.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LikeRequest {

    @NotNull
    private Long targetUserId;
    @NotBlank
    private String action; // LIKE or PASS

    public Long getTargetUserId() { return targetUserId; }
    public void setTargetUserId(Long targetUserId) { this.targetUserId = targetUserId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
