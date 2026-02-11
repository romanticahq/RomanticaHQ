package com.romanticahq.backend.ai.service;

import com.romanticahq.backend.ai.dto.FirstMessageSuggestionsResponse;

public interface AiService {

    FirstMessageSuggestionsResponse firstMessageSuggestions(long viewerUserId, long targetUserId);
}

