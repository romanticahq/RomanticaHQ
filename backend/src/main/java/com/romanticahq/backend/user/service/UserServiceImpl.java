package com.romanticahq.backend.user.service;

import com.romanticahq.backend.auth.JwtService;
import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.LoginResponse;
import com.romanticahq.backend.user.dto.UserSummary;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final int MAX_FAILED_LOGIN_ATTEMPTS = 5;
    private static final long LOGIN_LOCK_MINUTES = 15;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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
        user.setGender(request.getGender());

        try {
            user.setBirthday(LocalDate.parse(request.getBirthday()));
        } catch (Exception ex) {
            throw new IllegalArgumentException("Birthday must be in YYYY-MM-DD format.");
        }

        // === EMAIL VERIFICATION FIELDS ===
        user.setEmailVerified(false);
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(Instant.now().plus(2, ChronoUnit.DAYS));
        user.setFailedLoginAttempts(0);
        user.setLoginLockedUntil(null);

        userRepository.save(user);

        // For now we just log the verification link.
        System.out.println("📧 Verification link for " + user.getEmail()
                + ": https://romanticahq.com/auth/verify?token=" + token);
    }

    // ========== LOGIN ==========

    @Override
    @Transactional(noRollbackFor = {IllegalArgumentException.class, IllegalStateException.class})
    public LoginResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User user = optionalUser.get();
        Instant now = Instant.now();

        if (user.getLoginLockedUntil() != null && user.getLoginLockedUntil().isAfter(now)) {
            long remainingSeconds = ChronoUnit.SECONDS.between(now, user.getLoginLockedUntil());
            long remainingMinutes = Math.max(1, (remainingSeconds + 59) / 60);
            throw new IllegalStateException("Too many failed login attempts. Try again in " + remainingMinutes + " minute(s).");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            int failed = Math.max(0, user.getFailedLoginAttempts()) + 1;
            if (failed >= MAX_FAILED_LOGIN_ATTEMPTS) {
                user.setFailedLoginAttempts(0);
                user.setLoginLockedUntil(now.plus(LOGIN_LOCK_MINUTES, ChronoUnit.MINUTES));
                userRepository.save(user);
                throw new IllegalStateException("Too many failed login attempts. Try again in " + LOGIN_LOCK_MINUTES + " minute(s).");
            } else {
                user.setFailedLoginAttempts(failed);
                user.setLoginLockedUntil(null);
            }
            userRepository.save(user);
            throw new IllegalArgumentException("Invalid email or password.");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalStateException("Please verify your email before logging in.");
        }

        if (user.getFailedLoginAttempts() != 0 || user.getLoginLockedUntil() != null) {
            user.setFailedLoginAttempts(0);
            user.setLoginLockedUntil(null);
            userRepository.save(user);
        }

        String token = jwtService.issueToken(user.getId());
        return new LoginResponse(
                token,
                new UserSummary(user.getId(), user.getFullName(), user.getEmail())
        );
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

        if (user.isEmailVerified()) {
            // Keep message generic at the controller level; no need to resend.
            return;
        }

        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(Instant.now().plus(2, ChronoUnit.DAYS));

        userRepository.save(user);

        System.out.println("📧 Resent verification link for " + user.getEmail()
                + ": https://romanticahq.com/auth/verify?token=" + token);
    }

    // ========== PASSWORD RESET ==========

    @Override
    public void forgotPassword(String emailRaw) {
        String email = emailRaw.toLowerCase();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            // Do nothing – don't reveal whether this email exists
            return;
        }

        User user = optionalUser.get();
        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(Instant.now().plus(2, ChronoUnit.HOURS));
        userRepository.save(user);

        // For now we just log the reset link.
        System.out.println("🔐 Password reset link for " + user.getEmail()
                + ": https://romanticahq.com/reset-password?token=" + token);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        Optional<User> optionalUser = userRepository.findByPasswordResetToken(token);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired reset token.");
        }

        User user = optionalUser.get();

        if (user.getPasswordResetTokenExpiry() != null &&
                user.getPasswordResetTokenExpiry().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Reset link has expired. Please request a new one.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        userRepository.save(user);
    }
}
