package com.romanticahq.backend.user.service;

import com.romanticahq.backend.user.dto.LoginRequest;
import com.romanticahq.backend.user.dto.UserRegistrationRequest;
import com.romanticahq.backend.user.entity.User;

public interface UserService {

    User register(UserRegistrationRequest request);

    User login(LoginRequest request);
}
