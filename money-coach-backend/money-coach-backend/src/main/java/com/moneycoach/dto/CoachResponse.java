package com.moneycoach.dto;

import java.util.List;

public class CoachResponse {
    private String reply;
    private String message;
    private List<String> suggestions;
    private boolean fallback;

    public CoachResponse() {}

    public CoachResponse(String text, List<String> suggestions, boolean fallback) {
        this.reply = text;
        this.message = text;
        this.suggestions = suggestions;
        this.fallback = fallback;
    }

    public String getReply() { return reply; }
    public void setReply(String reply) {
        this.reply = reply;
        this.message = reply;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) {
        this.message = message;
        this.reply = message;
    }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

    public boolean isFallback() { return fallback; }
    public void setFallback(boolean fallback) { this.fallback = fallback; }
}