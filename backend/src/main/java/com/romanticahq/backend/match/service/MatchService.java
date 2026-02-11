package com.romanticahq.backend.match.service;

import com.romanticahq.backend.match.dto.LikeResponse;
import com.romanticahq.backend.match.entity.LikeStatus;

public interface MatchService {

    LikeResponse act(long fromUserId, long toUserId, LikeStatus status);
}

