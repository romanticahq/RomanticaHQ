package com.romanticahq.backend.match.controller;

import com.romanticahq.backend.auth.CurrentUser;
import com.romanticahq.backend.match.dto.LikeRequest;
import com.romanticahq.backend.match.dto.LikeResponse;
import com.romanticahq.backend.match.entity.LikeStatus;
import com.romanticahq.backend.match.service.MatchService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MatchController {

    private final CurrentUser currentUser;
    private final MatchService matchService;

    public MatchController(CurrentUser currentUser, MatchService matchService) {
        this.currentUser = currentUser;
        this.matchService = matchService;
    }

    @PostMapping("/likes")
    public ResponseEntity<LikeResponse> like(Authentication authentication, @Valid @RequestBody LikeRequest request) {
        long fromUserId = currentUser.requireUserId(authentication);
        if (request.getTargetUserId() == null) {
            throw new IllegalArgumentException("Missing targetUserId.");
        }
        LikeStatus status;
        try {
            status = LikeStatus.valueOf(String.valueOf(request.getAction()).trim().toUpperCase());
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid action. Use LIKE or PASS.");
        }
        return ResponseEntity.ok(matchService.act(fromUserId, request.getTargetUserId(), status));
    }
}
