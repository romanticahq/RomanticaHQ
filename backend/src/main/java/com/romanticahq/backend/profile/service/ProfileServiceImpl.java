package com.romanticahq.backend.profile.service;

import com.romanticahq.backend.profile.dto.ProfileResponse;
import com.romanticahq.backend.profile.dto.ProfileUpdateRequest;
import com.romanticahq.backend.profile.entity.Profile;
import com.romanticahq.backend.profile.repository.ProfileRepository;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneOffset;
import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProfileResponse getMyProfile(long userId) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));
        return toResponse(profile.getUser(), profile);
    }

    @Override
    public ProfileResponse updateMyProfile(long userId, ProfileUpdateRequest request) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));

        if (request.getBio() != null) profile.setBio(trimTo(request.getBio(), 800));
        if (request.getLocation() != null) profile.setLocation(trimTo(request.getLocation(), 120));
        if (request.getIntention() != null) profile.setIntention(trimTo(request.getIntention(), 80));
        if (request.getLookingFor() != null) profile.setLookingFor(trimTo(request.getLookingFor(), 200));
        profile.setUpdatedAt(Instant.now());

        profileRepository.save(profile);
        return toResponse(profile.getUser(), profile);
    }

    @Override
    public ProfileResponse getProfile(long viewerUserId, long targetUserId) {
        if (viewerUserId == targetUserId) return getMyProfile(viewerUserId);
        Profile profile = profileRepository.findByUserId(targetUserId)
                .orElseGet(() -> createDefaultProfile(targetUserId));
        return toResponse(profile.getUser(), profile);
    }

    @Override
    public List<ProfileResponse> recommend(long userId, int limit) {
        int safeLimit = Math.max(1, Math.min(50, limit));
        var page = profileRepository.findByUserIdNot(
                userId,
                PageRequest.of(0, safeLimit, Sort.by(Sort.Direction.DESC, "id"))
        );
        return page.getContent().stream()
                .map(p -> toResponse(p.getUser(), p))
                .toList();
    }

    private Profile createDefaultProfile(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setBio("");
        profile.setLocation("");
        profile.setIntention("");
        profile.setLookingFor("");
        return profileRepository.save(profile);
    }

    private static String trimTo(String s, int maxLen) {
        String v = s.trim();
        if (v.length() <= maxLen) return v;
        return v.substring(0, maxLen);
    }

    private static Integer calcAge(LocalDate birthday) {
        if (birthday == null) return null;
        LocalDate today = LocalDate.now(ZoneOffset.UTC);
        int years = Period.between(birthday, today).getYears();
        return years < 0 ? null : years;
    }

    private static ProfileResponse toResponse(User user, Profile profile) {
        return new ProfileResponse(
                user.getId(),
                user.getFullName(),
                calcAge(user.getBirthday()),
                user.getGender(),
                profile.getLocation(),
                profile.getBio(),
                profile.getIntention(),
                profile.getLookingFor()
        );
    }
}

