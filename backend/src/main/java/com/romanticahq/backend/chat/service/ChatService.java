package com.romanticahq.backend.chat.service;

import com.romanticahq.backend.chat.dto.ConversationSummary;
import com.romanticahq.backend.chat.dto.MessageResponse;

import java.util.List;

public interface ChatService {

    List<ConversationSummary> listConversations(long userId);

    List<MessageResponse> listMessages(long userId, long conversationId);

    MessageResponse sendMessage(long userId, long conversationId, String body);
}

