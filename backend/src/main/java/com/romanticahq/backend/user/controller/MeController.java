package com.romanticahq.backend.user.controller;

import com.romanticahq.backend.auth.CurrentUser;
import com.romanticahq.backend.user.dto.UserSummary;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MeController {

    private final CurrentUser currentUser;
    private final UserRepository userRepository;

    public MeController(CurrentUser currentUser, UserRepository userRepository) {
        this.currentUser = currentUser;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UserSummary> me(Authentication authentication) {
        long userId = currentUser.requireUserId(authentication);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        return ResponseEntity.ok(new UserSummary(user.getId(), user.getFullName(), user.getEmail()));
    }
}

