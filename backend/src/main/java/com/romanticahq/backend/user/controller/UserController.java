package com.romanticahq.backend.user.controller;

import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequest request) {
        User created = userService.register(request);
        created.setPasswordHash(null);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(request);
        user.setPasswordHash(null);

        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }

    public static class LoginResponse {
        private Long id;
        private String fullName;
        private String email;

        public LoginResponse(Long id, String fullName, String email) {
            this.id = id;
            this.fullName = fullName;
            this.email = email;
        }

        public Long getId() { return id; }

        public String getFullName() { return fullName; }

        public String getEmail() { return email; }
    }
}
