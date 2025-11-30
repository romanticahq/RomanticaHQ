package com.romanticahq.backend.user.service;

import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ========== REGISTER ==========

    @Override
    public void register(UserRegistrationRequest request) {
        String email = request.getEmail().toLowerCase();

        // We only rely on findByEmail, since existsByEmail is not in the repository
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // If your entity has gender, this will work; otherwise it's safe to ignore
        try {
            user.setGender(request.getGender());
        } catch (Exception ignored) {
        }

        // === EMAIL VERIFICATION FIELDS ===
        user.setEmailVerified(false);
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(Instant.now().plus(2, ChronoUnit.DAYS));

        userRepository.save(user);

        // For now we just log the verification link.
        System.out.println("📧 Verification link for " + user.getEmail()
                + ": https://romanticahq.com/auth/verify?token=" + token);
    }

    // ========== LOGIN ==========

    @Override
    public String login(LoginRequest request) {
        String email = request.getEmail().toLowerCase();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // OPTIONAL: uncomment this block once you're sure User has emailVerified field
        /*
        if (Boolean.FALSE.equals(user.getEmailVerified())) {
            throw new IllegalStateException("Please verify your email before logging in.");
        }
        */

        // We are not touching lastLogin anymore, since that method doesn’t exist on User yet

        // Controller expects a String; returning full name makes the popup nice.
        return user.getFullName();
    }

    // ========== VERIFY EMAIL ==========

    @Override
    public void verifyEmail(String token) {
        Optional<User> optionalUser = userRepository.findByVerificationToken(token);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired verification token.");
        }

        User user = optionalUser.get();

        if (user.getVerificationTokenExpiry() != null &&
                user.getVerificationTokenExpiry().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Verification link has expired. Please request a new one.");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);

        userRepository.save(user);
    }

    // ========== RESEND VERIFICATION ==========

    @Override
    public void resendVerification(String emailRaw) {
        String email = emailRaw.toLowerCase();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            // Do nothing – don't reveal whether this email exists
            return;
        }

        User user = optionalUser.get();

        // OPTIONAL: if already verified, nothing to resend
        /*
        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new IllegalStateException("Email is already verified.");
        }
        */

        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(Instant.now().plus(2, ChronoUnit.DAYS));

        userRepository.save(user);

        System.out.println("📧 Resent verification link for " + user.getEmail()
                + ": https://romanticahq.com/auth/verify?token=" + token);
    }
}
