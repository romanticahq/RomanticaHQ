package com.romanticahq.backend.ai.service;

import com.romanticahq.backend.ai.dto.FirstMessageSuggestionsResponse;
import com.romanticahq.backend.profile.entity.Profile;
import com.romanticahq.backend.profile.repository.ProfileRepository;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class AiServiceImpl implements AiService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public AiServiceImpl(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Override
    public FirstMessageSuggestionsResponse firstMessageSuggestions(long viewerUserId, long targetUserId) {
        if (viewerUserId == targetUserId) {
            throw new IllegalArgumentException("Invalid target user.");
        }

        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new IllegalArgumentException("Target user not found."));
        Profile p = profileRepository.findByUserId(targetUserId).orElse(null);

        String name = target.getFullName() != null ? target.getFullName().trim() : "there";
        String intention = p != null ? safe(p.getIntention()) : "";
        String lookingFor = p != null ? safe(p.getLookingFor()) : "";

        List<String> suggestions = new ArrayList<>();

        suggestions.add("Hey " + firstName(name) + " , what does a calm and intentional connection look like for you?");
        suggestions.add("Hi " + firstName(name) + " , what are you hoping to build on here: something serious, slow, or still figuring it out?");

        if (!intention.isEmpty()) {
            suggestions.add("I noticed your intention is \"" + intention + "\". What does that mean to you in real life?");
        }
        if (!lookingFor.isEmpty()) {
            suggestions.add("You said you're looking for \"" + lookingFor + "\". What's one thing that makes you feel safe in a relationship?");
        }

        suggestions.add("Random question: what is a green flag you wish more people had?");

        // Keep it short and high quality.
        return new FirstMessageSuggestionsResponse(suggestions.stream().distinct().limit(5).toList());
    }

    private static String safe(String v) {
        if (v == null) return "";
        return v.trim();
    }

    private static String firstName(String fullName) {
        String n = fullName.trim();
        int idx = n.indexOf(' ');
        if (idx <= 0) return n;
        return n.substring(0, idx);
    }
}

