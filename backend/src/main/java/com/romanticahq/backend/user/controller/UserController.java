package com.romanticahq.backend.user.controller;

import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.ResendVerificationRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ========= REGISTER =========
    @PostMapping("/users/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UserRegistrationRequest request) {
        userService.register(request);

        Map<String, String> body = new HashMap<>();
        body.put("message",
                "Account created! Please check your email to verify your account before logging in.");

        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    // ========= LOGIN =========
    @PostMapping("/users/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String welcomeMessage = userService.login(request);

        Map<String, String> body = new HashMap<>();
        body.put("message", welcomeMessage);

        return ResponseEntity.ok(body);
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
            @RequestBody ResendVerificationRequest request) {

        userService.resendVerification(request.getEmail());

        Map<String, String> body = new HashMap<>();
        body.put("message", "If an account exists with that email, a new verification link has been sent.");
        return ResponseEntity.ok(body);
    }

    // ========= BASIC ERROR HANDLING FOR CLEAN JSON =========
    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<Map<String, String>> handleBadRequest(RuntimeException ex) {
        Map<String, String> body = new HashMap<>();
        body.put("error", ex.getMessage());

        // For now treat both as 400; we can fine-tune later.
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }
}
