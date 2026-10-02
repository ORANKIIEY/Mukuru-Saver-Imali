package com.moneycoach.ai;

import java.util.List;

public interface LlmClient {

    record Message(String role, String content) {
    }

    String complete(String systemPrompt, List<Message> messages);
}
