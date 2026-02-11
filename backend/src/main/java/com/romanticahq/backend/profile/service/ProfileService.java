package com.romanticahq.backend.profile.service;

import com.romanticahq.backend.profile.dto.ProfileResponse;
import com.romanticahq.backend.profile.dto.ProfileUpdateRequest;

import java.util.List;

public interface ProfileService {

    ProfileResponse getMyProfile(long userId);

    ProfileResponse updateMyProfile(long userId, ProfileUpdateRequest request);

    ProfileResponse getProfile(long viewerUserId, long targetUserId);

    List<ProfileResponse> recommend(long userId, int limit);
}

