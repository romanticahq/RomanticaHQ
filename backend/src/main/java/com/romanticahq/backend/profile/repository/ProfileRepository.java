package com.romanticahq.backend.profile.repository;

import com.romanticahq.backend.profile.entity.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUserId(Long userId);

    Page<Profile> findByUserIdNot(Long userId, Pageable pageable);
}

