package com.romanticahq.backend.ai.dto;

import java.util.List;

public class FirstMessageSuggestionsResponse {

    private List<String> suggestions;

    public FirstMessageSuggestionsResponse() {}

    public FirstMessageSuggestionsResponse(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
}

