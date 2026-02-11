package com.romanticahq.backend.chat.controller;

import com.romanticahq.backend.auth.CurrentUser;
import com.romanticahq.backend.chat.dto.ConversationSummary;
import com.romanticahq.backend.chat.dto.MessageResponse;
import com.romanticahq.backend.chat.dto.SendMessageRequest;
import com.romanticahq.backend.chat.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final CurrentUser currentUser;
    private final ChatService chatService;

    public ChatController(CurrentUser currentUser, ChatService chatService) {
        this.currentUser = currentUser;
        this.chatService = chatService;
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationSummary>> conversations(Authentication authentication) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(chatService.listConversations(userId));
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<MessageResponse>> messages(
            Authentication authentication,
            @PathVariable("conversationId") long conversationId
    ) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(chatService.listMessages(userId, conversationId));
    }

    @PostMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<MessageResponse> send(
            Authentication authentication,
            @PathVariable("conversationId") long conversationId,
            @Valid @RequestBody SendMessageRequest request
    ) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(chatService.sendMessage(userId, conversationId, request.getBody()));
    }
}
