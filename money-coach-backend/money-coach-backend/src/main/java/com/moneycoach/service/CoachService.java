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
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
        String language = PromptBuilder.normaliseLanguage(request.language());
        CoachFacts facts = factsProvider.currentFacts();
        List<LlmClient.Message> messages = buildMessages(request);

        try {
            String system = promptBuilder.systemPrompt(language, facts);
            String reply = llm.complete(system, messages).trim();
            if (reply.isEmpty()) {
                return fallback(facts, "empty reply");
            }

            StringBuilder typedByUser = new StringBuilder();
            messages.stream().filter(m -> "user".equals(m.role())).forEach(m -> typedByUser.append(m.content()).append('\n'));
            List<String> invented = AmountGuard.unverifiedAmounts(reply, PromptBuilder.factsBlock(facts), typedByUser.toString());
            if (!invented.isEmpty()) {
                log.warn("Coach reply rejected: {} amount(s) not in verified facts", invented.size());
                return fallback(facts, "unverified amounts");
            }
            return new CoachResponse(reply, language, "ai");
        } catch (LlmUnavailableException e) {
            log.warn("Coach AI unavailable, using fallback: {}", e.getMessage());
            return fallback(facts, "ai unavailable");
        }
    }

    static List<LlmClient.Message> buildMessages(CoachRequest request) {
        List<LlmClient.Message> messages = new ArrayList<>();
        String expected = "user";
        if (request.history() != null) {
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
        messages.add(new LlmClient.Message("user", request.message()));
        return messages;
    }

    static CoachResponse fallbackFrom(CoachFacts facts) {
        StringBuilder sb = new StringBuilder();
        String name = PromptBuilder.clean(facts.userName(), 40);
        sb.append(name.isEmpty() ? "Hi there. " : "Hi " + name + ". ");

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
        sb.append("I can't chat in full right now, but these numbers are up to date.");
        return new CoachResponse(sb.toString(), "en", "fallback");
    }

    private CoachResponse fallback(CoachFacts facts, String reason) {
        log.info("Coach fallback used ({})", reason);
        return fallbackFrom(facts);
    }
}
