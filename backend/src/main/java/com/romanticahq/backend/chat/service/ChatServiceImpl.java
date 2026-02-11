package com.romanticahq.backend.chat.service;

import com.romanticahq.backend.chat.dto.ConversationSummary;
import com.romanticahq.backend.chat.dto.MessageResponse;
import com.romanticahq.backend.chat.entity.Conversation;
import com.romanticahq.backend.chat.entity.Message;
import com.romanticahq.backend.chat.realtime.ChatRealtimePublisher;
import com.romanticahq.backend.chat.repository.ConversationRepository;
import com.romanticahq.backend.chat.repository.MessageRepository;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class ChatServiceImpl implements ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatRealtimePublisher chatRealtimePublisher;

    public ChatServiceImpl(
            ConversationRepository conversationRepository,
            MessageRepository messageRepository,
            UserRepository userRepository,
            ChatRealtimePublisher chatRealtimePublisher
    ) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.chatRealtimePublisher = chatRealtimePublisher;
    }

    @Override
    public List<ConversationSummary> listConversations(long userId) {
        List<Conversation> convos = conversationRepository.findByUser1IdOrUser2IdOrderByCreatedAtDesc(userId, userId);
        return convos.stream().map(c -> {
            User other = c.getUser1().getId().equals(userId) ? c.getUser2() : c.getUser1();
            return new ConversationSummary(c.getId(), other.getId(), other.getFullName());
        }).toList();
    }

    @Override
    public List<MessageResponse> listMessages(long userId, long conversationId) {
        Conversation convo = requireConversationMember(userId, conversationId);
        List<Message> msgs = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
        return msgs.stream()
                .map(m -> new MessageResponse(m.getId(), m.getSender().getId(), m.getBody(), m.getCreatedAt()))
                .toList();
    }

    @Override
    public MessageResponse sendMessage(long userId, long conversationId, String body) {
        if (body == null || body.trim().isBlank()) {
            throw new IllegalArgumentException("Message body is required.");
        }
        if (body.length() > 2000) {
            throw new IllegalArgumentException("Message is too long.");
        }

        Conversation convo = requireConversationMember(userId, conversationId);
        User sender = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        Message msg = new Message();
        msg.setConversation(convo);
        msg.setSender(sender);
        msg.setBody(body.trim());
        msg.setCreatedAt(Instant.now());
        messageRepository.save(msg);

        MessageResponse response = new MessageResponse(msg.getId(), sender.getId(), msg.getBody(), msg.getCreatedAt());
        chatRealtimePublisher.publish(conversationId, response);
        return response;
    }

    private Conversation requireConversationMember(long userId, long conversationId) {
        Conversation convo = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new IllegalArgumentException("Conversation not found."));
        long u1 = convo.getUser1().getId();
        long u2 = convo.getUser2().getId();
        if (userId != u1 && userId != u2) {
            throw new IllegalArgumentException("Not allowed.");
        }
        return convo;
    }
}
