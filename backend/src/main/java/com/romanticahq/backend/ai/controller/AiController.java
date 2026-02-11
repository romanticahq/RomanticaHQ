package com.romanticahq.backend.ai.controller;

import com.romanticahq.backend.ai.dto.FirstMessageSuggestionsResponse;
import com.romanticahq.backend.ai.service.AiService;
import com.romanticahq.backend.auth.CurrentUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AiController {

    private final CurrentUser currentUser;
    private final AiService aiService;

    public AiController(CurrentUser currentUser, AiService aiService) {
        this.currentUser = currentUser;
        this.aiService = aiService;
    }

    @GetMapping("/ai/first-message")
    public ResponseEntity<FirstMessageSuggestionsResponse> firstMessage(
            Authentication authentication,
            @RequestParam("targetUserId") long targetUserId
    ) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(aiService.firstMessageSuggestions(userId, targetUserId));
    }
}
