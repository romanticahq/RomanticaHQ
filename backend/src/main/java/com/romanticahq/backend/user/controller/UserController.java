package com.romanticahq.backend.user.controller;

import com.romanticahq.backend.user.dto.AuthResponse;
import com.romanticahq.backend.user.dto.ForgotPasswordRequest;
import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.ResetPasswordRequest;
import com.romanticahq.backend.user.dto.ResendVerificationRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ========= REGISTER =========
    @PostMapping("/users/register")
    public ResponseEntity<Map<String, String>> register(
            @Valid @RequestBody UserRegistrationRequest request) {
        userService.register(request);

        Map<String, String> body = new HashMap<>();
        body.put("message",
                "Account created! Please check your email to verify your account before logging in.");

        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // ========= LOGIN =========
    @PostMapping("/users/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // ========= EMAIL VERIFICATION =========
    @GetMapping("/auth/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam("token") String token) {
        userService.verifyEmail(token);

        Map<String, String> body = new HashMap<>();
        body.put("message", "Your email is verified. You can now log in.");
        return ResponseEntity.ok(body);
    }

    // ========= RESEND VERIFICATION =========
    @PostMapping("/auth/resend-verification")
    public ResponseEntity<Map<String, String>> resendVerification(
            @Valid @RequestBody ResendVerificationRequest request) {

        userService.resendVerification(request.getEmail());

        Map<String, String> body = new HashMap<>();
        body.put("message", "If an account exists with that email, a new verification link has been sent.");
        return ResponseEntity.ok(body);
    }

    // ========= FORGOT PASSWORD =========
    @PostMapping("/auth/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        userService.forgotPassword(request.getEmail());

        Map<String, String> body = new HashMap<>();
        body.put("message", "If an account exists with that email, a reset link has been sent.");
        return ResponseEntity.ok(body);
    }

    // ========= RESET PASSWORD =========
    @PostMapping("/auth/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getPassword());

        Map<String, String> body = new HashMap<>();
        body.put("message", "Password updated. You can now log in.");
        return ResponseEntity.ok(body);
    }

}
