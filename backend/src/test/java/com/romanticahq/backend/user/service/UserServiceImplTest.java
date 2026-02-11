package com.romanticahq.backend.user.service;

import com.romanticahq.backend.auth.JwtService;
import com.romanticahq.backend.notification.EmailService;
import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.LoginResponse;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private EmailService emailService;

    private UserServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new UserServiceImpl(userRepository, passwordEncoder, jwtService, emailService);
    }

    @Test
    void registerSavesUserAndSendsVerificationEmail() {
        UserRegistrationRequest request = new UserRegistrationRequest();
        request.setFullName("Ana");
        request.setEmail("Ana@Example.com");
        request.setPassword("secret123");
        request.setGender("WOMAN");
        request.setBirthday("2000-01-01");

        when(userRepository.findByEmail("ana@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("secret123")).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0, User.class));

        service.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User saved = userCaptor.getValue();
        assertEquals("ana@example.com", saved.getEmail());
        assertEquals("encoded", saved.getPassword());
        assertEquals(LocalDate.parse("2000-01-01"), saved.getBirthday());
        assertFalse(saved.isEmailVerified());
        assertNotNull(saved.getVerificationToken());
        verify(emailService).sendVerificationEmail(eq("ana@example.com"), anyString());
    }

    @Test
    void loginSuccessReturnsTokenAndUserSummary() {
        User user = new User();
        user.setId(42L);
        user.setFullName("Ana");
        user.setEmail("ana@example.com");
        user.setPassword("encoded");
        user.setEmailVerified(true);
        user.setFailedLoginAttempts(0);

        LoginRequest request = new LoginRequest();
        request.setEmail("ana@example.com");
        request.setPassword("secret123");

        when(userRepository.findByEmail("ana@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("secret123", "encoded")).thenReturn(true);
        when(jwtService.issueToken(42L)).thenReturn("jwt-token");

        LoginResponse response = service.login(request);

        assertEquals("jwt-token", response.getToken());
        assertNotNull(response.getUser());
        assertEquals(42L, response.getUser().getId());
        verify(jwtService).issueToken(42L);
    }

    @Test
    void forgotPasswordForExistingUserSavesTokenAndSendsEmail() {
        User user = new User();
        user.setEmail("ana@example.com");

        when(userRepository.findByEmail("ana@example.com")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0, User.class));

        service.forgotPassword("ana@example.com");

        assertNotNull(user.getPasswordResetToken());
        assertNotNull(user.getPasswordResetTokenExpiry());
        verify(emailService).sendPasswordResetEmail(eq("ana@example.com"), anyString());
    }
}
