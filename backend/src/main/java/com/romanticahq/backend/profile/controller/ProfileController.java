package com.romanticahq.backend.profile.controller;

import com.romanticahq.backend.auth.CurrentUser;
import com.romanticahq.backend.profile.dto.ProfileResponse;
import com.romanticahq.backend.profile.dto.ProfileUpdateRequest;
import com.romanticahq.backend.profile.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final CurrentUser currentUser;
    private final ProfileService profileService;

    public ProfileController(CurrentUser currentUser, ProfileService profileService) {
        this.currentUser = currentUser;
        this.profileService = profileService;
    }

    @GetMapping("/profile/me")
    public ResponseEntity<ProfileResponse> myProfile(Authentication authentication) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(profileService.getMyProfile(userId));
    }

    @PutMapping("/profile/me")
    public ResponseEntity<ProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileUpdateRequest request
    ) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(profileService.updateMyProfile(userId, request));
    }

    @GetMapping("/profiles/{userId}")
    public ResponseEntity<ProfileResponse> getProfile(
            Authentication authentication,
            @PathVariable("userId") long targetUserId
    ) {
        long viewerId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(profileService.getProfile(viewerId, targetUserId));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<ProfileResponse>> recommendations(
            Authentication authentication,
            @RequestParam(name = "limit", defaultValue = "20") int limit
    ) {
        long userId = currentUser.requireUserId(authentication);
        return ResponseEntity.ok(profileService.recommend(userId, limit));
    }
}
