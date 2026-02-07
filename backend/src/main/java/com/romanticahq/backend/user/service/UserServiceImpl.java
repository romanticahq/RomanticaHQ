package com.romanticahq.backend.user.service;

import com.romanticahq.backend.email.EmailService;
import com.romanticahq.backend.security.JwtService;
import com.romanticahq.backend.user.dto.AuthResponse;
import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService,
                           EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    // ========== REGISTER ==========

    @Override
    public void register(UserRegistrationRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        // We only rely on findByEmail, since existsByEmail is not in the repository
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setGender(normalizeGender(request.getGender()));
        user.setBirthday(parseBirthday(request.getBirthday()));

        // === EMAIL VERIFICATION FIELDS ===
        user.setEmailVerified(false);
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(Instant.now().plus(2, ChronoUnit.DAYS));

        userRepository.save(user);
        emailService.sendVerificationEmail(user.getEmail(), token);
    }

    // ========== LOGIN ==========

    @Override
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalStateException("Please verify your email before logging in.");
        }
        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse("Welcome back, " + user.getFullName() + ".", token);
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
        String email = emailRaw.trim().toLowerCase();
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
        emailService.sendVerificationEmail(user.getEmail(), token);
    }

    // ========== FORGOT PASSWORD ==========

    @Override
    public void forgotPassword(String emailRaw) {
        String email = emailRaw == null ? "" : emailRaw.trim().toLowerCase();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            // Do nothing – don't reveal whether this email exists.
            return;
        }

        User user = optionalUser.get();

        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(Instant.now().plus(2, ChronoUnit.HOURS));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user.getEmail(), token);
    }

    // ========== RESET PASSWORD ==========

    @Override
    public void resetPassword(String token, String newPassword) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Invalid or expired reset token.");
        }
        if (newPassword == null || newPassword.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters.");
        }

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

    private String normalizeGender(String gender) {
        return gender == null ? null : gender.trim().toLowerCase();
    }

    private LocalDate parseBirthday(String birthdayRaw) {
        try {
            LocalDate birthday = LocalDate.parse(birthdayRaw);
            int years = Period.between(birthday, LocalDate.now()).getYears();
            if (years < 18) {
                throw new IllegalArgumentException("You must be at least 18 years old to register.");
            }
            return birthday;
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalArgumentException("Birthday must be in YYYY-MM-DD format.");
        }
    }
}
