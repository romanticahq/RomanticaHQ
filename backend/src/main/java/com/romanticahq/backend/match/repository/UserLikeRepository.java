package com.romanticahq.backend.match.repository;

import com.romanticahq.backend.match.entity.LikeStatus;
import com.romanticahq.backend.match.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {

    Optional<UserLike> findByFromUserIdAndToUserId(Long fromUserId, Long toUserId);

    boolean existsByFromUserIdAndToUserIdAndStatus(Long fromUserId, Long toUserId, LikeStatus status);
}

