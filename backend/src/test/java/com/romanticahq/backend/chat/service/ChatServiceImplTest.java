package com.romanticahq.backend.chat.service;

import com.romanticahq.backend.chat.dto.MessageResponse;
import com.romanticahq.backend.chat.entity.Conversation;
import com.romanticahq.backend.chat.entity.Message;
import com.romanticahq.backend.chat.realtime.ChatRealtimePublisher;
import com.romanticahq.backend.chat.repository.ConversationRepository;
import com.romanticahq.backend.chat.repository.MessageRepository;
import com.romanticahq.backend.user.entity.User;
import com.romanticahq.backend.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChatServiceImplTest {

    @Mock
    private ConversationRepository conversationRepository;
    @Mock
    private MessageRepository messageRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ChatRealtimePublisher chatRealtimePublisher;

    private ChatServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ChatServiceImpl(
                conversationRepository,
                messageRepository,
                userRepository,
                chatRealtimePublisher
        );
    }

    @Test
    void sendMessageBroadcastsToConversation() {
        User sender = new User();
        sender.setId(11L);

        User other = new User();
        other.setId(12L);

        Conversation conversation = new Conversation();
        conversation.setId(77L);
        conversation.setUser1(sender);
        conversation.setUser2(other);

        when(conversationRepository.findById(77L)).thenReturn(Optional.of(conversation));
        when(userRepository.findById(11L)).thenReturn(Optional.of(sender));
        when(messageRepository.save(any(Message.class))).thenAnswer(inv -> {
            Message m = inv.getArgument(0, Message.class);
            m.setId(501L);
            return m;
        });

        MessageResponse response = service.sendMessage(11L, 77L, "hello");

        assertEquals(501L, response.getId());
        assertEquals(11L, response.getSenderId());
        assertEquals("hello", response.getBody());
        verify(chatRealtimePublisher).publish(eq(77L), any(MessageResponse.class));
    }

    @Test
    void sendMessageRejectsNonMember() {
        User u1 = new User();
        u1.setId(21L);
        User u2 = new User();
        u2.setId(22L);
        Conversation conversation = new Conversation();
        conversation.setId(88L);
        conversation.setUser1(u1);
        conversation.setUser2(u2);

        when(conversationRepository.findById(88L)).thenReturn(Optional.of(conversation));

        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.sendMessage(99L, 88L, "not allowed")
        );
        assertEquals("Not allowed.", ex.getMessage());
        verifyNoInteractions(chatRealtimePublisher);
    }
}
