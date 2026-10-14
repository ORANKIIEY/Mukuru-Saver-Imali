package com.moneycoach.dto;

import java.util.List;

public class CoachResponse {
    private String reply;
    private String message;
    private String language;
    private String source;
    private List<String> suggestions;
    private boolean fallback;

    public CoachResponse() {}

    public CoachResponse(String reply, String language, String source) {
        this.reply = reply;
        this.message = reply;
        this.language = language;
        this.source = source;
        this.fallback = "fallback".equalsIgnoreCase(source);
    }

    public CoachResponse(String text, List<String> suggestions, boolean fallback) {
        this.reply = text;
        this.message = text;
        this.suggestions = suggestions;
        this.fallback = fallback;
        this.source = fallback ? "fallback" : "ai";
    }

    public String getReply() { return reply; }
    public void setReply(String reply) {
        this.reply = reply;
        this.message = reply;
    }

    public String reply() { return reply; }

    public String getMessage() { return message; }
    public void setMessage(String message) {
        this.message = message;
        this.reply = message;
    }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String language() { return language; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String source() { return source; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

    public boolean isFallback() { return fallback; }
    public void setFallback(boolean fallback) { this.fallback = fallback; }
}
