package com.romanticahq.backend.user.controller;

import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.LoginResponse;
import com.romanticahq.backend.user.dto.UserSummary;
import com.romanticahq.backend.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserControllerTest {

    @Test
    void loginSetsSecureCookieHeader() {
        UserService userService = Mockito.mock(UserService.class);
        when(userService.login(any(LoginRequest.class)))
                .thenReturn(new LoginResponse("token-123", new UserSummary(1L, "Ana", "ana@example.com")));

        UserController controller = new UserController(userService, "RHQ_AUTH", true, 604800, "Strict");
        LoginRequest request = new LoginRequest();
        request.setEmail("ana@example.com");
        request.setPassword("secret123");

        ResponseEntity<UserSummary> response = controller.login(request);
        String setCookie = response.getHeaders().getFirst(HttpHeaders.SET_COOKIE);

        assertTrue(setCookie != null && setCookie.contains("HttpOnly"));
        assertTrue(setCookie != null && setCookie.contains("Secure"));
        assertTrue(setCookie != null && setCookie.contains("SameSite=Strict"));
    }
}

