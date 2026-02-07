package com.romanticahq.backend.user.service;

import com.romanticahq.backend.user.dto.AuthResponse;
import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;

public interface UserService {

    // create a new user account
    void register(UserRegistrationRequest request);

    // login and return something the controller/frontend can use
    AuthResponse login(LoginRequest request);

    // email verification
    void verifyEmail(String token);

    // resend verification link
    void resendVerification(String email);

    // password reset
    void forgotPassword(String email);

    void resetPassword(String token, String newPassword);
}
