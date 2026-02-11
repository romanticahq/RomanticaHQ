package com.romanticahq.backend.auth;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class CurrentUser {

    public long requireUserId(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new IllegalArgumentException("Unauthenticated.");
        }
        String principal = String.valueOf(authentication.getPrincipal());
        try {
            return Long.parseLong(principal);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Invalid authentication principal.");
        }
    }
}

