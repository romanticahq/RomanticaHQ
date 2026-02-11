package com.romanticahq.backend.match.service;

import com.romanticahq.backend.chat.entity.Conversation;
import com.romanticahq.backend.chat.repository.ConversationRepository;
import com.romanticahq.backend.match.dto.LikeResponse;
import com.romanticahq.backend.match.entity.LikeStatus;
import com.romanticahq.backend.match.entity.UserLike;
import com.romanticahq.backend.match.repository.UserLikeRepository;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {

    private final UserRepository userRepository;
    private final UserLikeRepository userLikeRepository;
    private final ConversationRepository conversationRepository;

    public MatchServiceImpl(
            UserRepository userRepository,
            UserLikeRepository userLikeRepository,
            ConversationRepository conversationRepository
    ) {
        this.userRepository = userRepository;
        this.userLikeRepository = userLikeRepository;
        this.conversationRepository = conversationRepository;
    }

    @Override
    public LikeResponse act(long fromUserId, long toUserId, LikeStatus status) {
        if (fromUserId == toUserId) {
            throw new IllegalArgumentException("Invalid target user.");
        }

        User from = userRepository.findById(fromUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        User to = userRepository.findById(toUserId)
                .orElseThrow(() -> new IllegalArgumentException("Target user not found."));

        UserLike like = userLikeRepository.findByFromUserIdAndToUserId(fromUserId, toUserId)
                .orElseGet(() -> {
                    UserLike ul = new UserLike();
                    ul.setFromUser(from);
                    ul.setToUser(to);
                    return ul;
                });

        like.setStatus(status);
        userLikeRepository.save(like);

        if (status != LikeStatus.LIKE) {
            return new LikeResponse(false, null);
        }

        boolean reciprocal = userLikeRepository.existsByFromUserIdAndToUserIdAndStatus(toUserId, fromUserId, LikeStatus.LIKE);
        if (!reciprocal) {
            return new LikeResponse(false, null);
        }

        Conversation convo = getOrCreateConversation(from, to);
        return new LikeResponse(true, convo.getId());
    }

    private Conversation getOrCreateConversation(User a, User b) {
        long id1 = a.getId();
        long id2 = b.getId();
        User user1 = id1 < id2 ? a : b;
        User user2 = id1 < id2 ? b : a;

        Optional<Conversation> existing = conversationRepository.findByUser1IdAndUser2Id(user1.getId(), user2.getId());
        if (existing.isPresent()) return existing.get();

        Conversation c = new Conversation();
        c.setUser1(user1);
        c.setUser2(user2);
        return conversationRepository.save(c);
    }
}

