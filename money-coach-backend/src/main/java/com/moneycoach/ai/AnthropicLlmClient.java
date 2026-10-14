package com.moneycoach.ai;

import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpClient;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
public class AnthropicLlmClient implements LlmClient {

    private final RestClient http;
    private final String apiKey;
    private final String model;
    private final int maxTokens;

    public AnthropicLlmClient(
            @Value("${coach.llm.api-key:${ANTHROPIC_API_KEY:}}") String apiKey,
            @Value("${coach.llm.model:claude-haiku-4-5-20251001}") String model,
            @Value("${coach.llm.base-url:https://api.anthropic.com}") String baseUrl,
            @Value("${coach.llm.timeout-seconds:20}") int timeoutSeconds,
            @Value("${coach.llm.max-tokens:400}") int maxTokens) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.model = model;
        this.maxTokens = maxTokens;

        HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(client);
        factory.setReadTimeout(Duration.ofSeconds(timeoutSeconds));
        this.http = RestClient.builder().baseUrl(baseUrl).requestFactory(factory).build();
    }

    @Override
    public String complete(String systemPrompt, List<Message> messages) {
        if (apiKey.isBlank()) {
            throw new LlmUnavailableException("ANTHROPIC_API_KEY is not set");
        }
        List<Map<String, String>> apiMessages = new ArrayList<>();
        for (Message m : messages) {
            apiMessages.add(Map.of("role", m.role(), "content", m.content()));
        }
        Map<String, Object> body = Map.of(
                "model", model,
                "max_tokens", maxTokens,
                "system", systemPrompt,
                "messages", apiMessages);

        JsonNode root;
        try {
            root = http.post()
                    .uri("/v1/messages")
                    .header("x-api-key", apiKey)
                    .header("anthropic-version", "2023-06-01")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);
        } catch (RestClientResponseException e) {
            throw new LlmUnavailableException("Claude API returned HTTP " + e.getStatusCode().value(), e);
        } catch (RuntimeException e) {
            throw new LlmUnavailableException("Claude API call failed: " + e.getClass().getSimpleName(), e);
        }

        StringBuilder text = new StringBuilder();
        if (root != null) {
            for (JsonNode block : root.path("content")) {
                if ("text".equals(block.path("type").asText())) {
                    text.append(block.path("text").asText());
                }
            }
        }
        if (text.isEmpty()) {
            throw new LlmUnavailableException("Claude API returned no text");
        }
        return text.toString();
    }
}
