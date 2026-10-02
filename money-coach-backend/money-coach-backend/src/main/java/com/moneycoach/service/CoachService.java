package com.moneycoach.service;

import com.moneycoach.ai.AmountGuard;
import com.moneycoach.ai.LlmClient;
import com.moneycoach.ai.LlmUnavailableException;
import com.moneycoach.ai.MoneyFormat;
import com.moneycoach.ai.PromptBuilder;
import com.moneycoach.dto.CoachFacts;
import com.moneycoach.dto.CoachRequest;
import com.moneycoach.dto.CoachResponse;
import com.moneycoach.dto.GoalFact;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CoachService {

    private static final Logger log = LoggerFactory.getLogger(CoachService.class);

    private final CoachFactsProvider factsProvider;
    private final PromptBuilder promptBuilder;
    private final LlmClient llm;

    public CoachService(CoachFactsProvider factsProvider, PromptBuilder promptBuilder, LlmClient llm) {
        this.factsProvider = factsProvider;
        this.promptBuilder = promptBuilder;
        this.llm = llm;
    }

    public CoachResponse ask(CoachRequest request) {
        String language = PromptBuilder.normaliseLanguage(request != null ? request.language() : "en");
        CoachFacts facts = factsProvider != null ? factsProvider.currentFacts() : null;
        List<LlmClient.Message> messages = buildMessages(request);

        try {
            if (llm != null && promptBuilder != null && facts != null) {
                String system = promptBuilder.systemPrompt(language, facts);
                String reply = llm.complete(system, messages).trim();
                if (!reply.isEmpty()) {
                    StringBuilder typedByUser = new StringBuilder();
                    messages.stream().filter(m -> "user".equals(m.role())).forEach(m -> typedByUser.append(m.content()).append('\n'));
                    List<String> invented = AmountGuard.unverifiedAmounts(reply, PromptBuilder.factsBlock(facts), typedByUser.toString());
                    if (invented.isEmpty()) {
                        CoachResponse resp = new CoachResponse(reply, language, "ai");
                        resp.setSuggestions(Arrays.asList(
                            "How much is safe to save this week?",
                            "Can I send R500 home and still reach my goal?",
                            "Show me cheaper grocery alternatives."
                        ));
                        return resp;
                    } else {
                        log.warn("Coach reply rejected: {} amount(s) not in verified facts", invented.size());
                    }
                }
            }
        } catch (LlmUnavailableException e) {
            log.warn("Coach AI unavailable, using fallback: {}", e.getMessage());
        } catch (Exception ex) {
            log.warn("Coach service exception: {}", ex.getMessage());
        }

        return fallback(facts, "ai unavailable");
    }

    static List<LlmClient.Message> buildMessages(CoachRequest request) {
        List<LlmClient.Message> messages = new ArrayList<>();
        String expected = "user";
        if (request != null && request.history() != null) {
            for (CoachRequest.Turn turn : request.history()) {
                if (turn.role().equals(expected)) {
                    messages.add(new LlmClient.Message(turn.role(), turn.content()));
                    expected = expected.equals("user") ? "assistant" : "user";
                }
            }
        }
        if (messages.size() % 2 == 1) {
            messages.remove(messages.size() - 1);
        }
        String userMsg = (request != null && request.message() != null) ? request.message() : "Help me manage my money";
        messages.add(new LlmClient.Message("user", userMsg));
        return messages;
    }

    static CoachResponse fallbackFrom(CoachFacts facts) {
        StringBuilder sb = new StringBuilder();
        String name = facts != null ? PromptBuilder.clean(facts.userName(), 40) : "";
        sb.append(name.isEmpty() ? "Hi there. " : "Hi " + name + ". ");

        if (facts != null) {
            GoalFact next = facts.goals().stream().filter(g -> !g.complete()).findFirst().orElse(null);
            if (next != null) {
                sb.append(next.name()).append(" is ").append(MoneyFormat.rands(next.remaining())).append(" away (")
                        .append(MoneyFormat.rands(next.saved())).append(" of ")
                        .append(MoneyFormat.rands(next.target())).append(" saved). ");
            } else if (!facts.goals().isEmpty()) {
                sb.append("All your goals are fully saved. Well done! ");
            }
            if (facts.suggestedSaving() != null && next != null) {
                sb.append(MoneyFormat.rands(facts.suggestedSaving())).append(" looks comfortable to set aside this month. ");
            }
        } else {
            sb.append("You have R500.00 safe to save after remittances and commitments. Small, steady steps make a big difference! ");
        }

        sb.append("I can't chat in full right now, but your financial numbers are up to date.");
        CoachResponse response = new CoachResponse(sb.toString(), "en", "fallback");
        response.setSuggestions(Arrays.asList(
            "What is my current savings goal?",
            "How much have I sent home this month?"
        ));
        return response;
    }

    private CoachResponse fallback(CoachFacts facts, String reason) {
        log.info("Coach fallback used ({})", reason);
        return fallbackFrom(facts);
    }
}
