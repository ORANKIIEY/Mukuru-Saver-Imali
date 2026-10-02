package com.moneycoach.service;

<<<<<<< Updated upstream
import com.moneycoach.dto.CoachRequest;
import com.moneycoach.dto.CoachResponse;
=======
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
>>>>>>> Stashed changes
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

<<<<<<< Updated upstream
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

@Service
public class CoachService {
    private static final Logger log = LoggerFactory.getLogger(CoachService.class);

    private final Object llmClient;
    private final Object promptBuilder;
    private final Object factsProvider;
    private final Object amountGuard;

    public CoachService(
            org.springframework.beans.factory.ObjectProvider<com.moneycoach.ai.LlmClient> llmProvider,
            org.springframework.beans.factory.ObjectProvider<com.moneycoach.ai.PromptBuilder> promptProvider,
            org.springframework.beans.factory.ObjectProvider<com.moneycoach.service.CoachFactsProvider> factsProv,
            org.springframework.beans.factory.ObjectProvider<com.moneycoach.ai.AmountGuard> guardProv) {
        this.llmClient = llmProvider.getIfAvailable();
        this.promptBuilder = promptProvider.getIfAvailable();
        this.factsProvider = factsProv.getIfAvailable();
        this.amountGuard = guardProv.getIfAvailable();
    }

    public CoachResponse ask(CoachRequest request) {
        return handleQuery(request);
    }

    public CoachResponse handleQuery(CoachRequest request) {
        String userQuery = extract(request, "getMessage", "getQuery", "Help me manage my money");
        String lang = extract(request, "getLanguage", null, "en");
        String userId = extract(request, "getUserId", null, "user-grace-01");

        Object facts = null;
        if (factsProvider != null) {
            try {
                for (Method m : factsProvider.getClass().getMethods()) {
                    if (m.getParameterCount() == 1 && m.getParameterTypes()[0].equals(String.class)) {
                        facts = m.invoke(factsProvider, userId);
                        break;
                    }
                }
            } catch (Exception e) {
                log.debug("Facts fetch bypassed: {}", e.getMessage());
            }
        }

        try {
            if (llmClient != null) {
                String prompt = userQuery;
                if (promptBuilder != null && facts != null) {
                    for (Method m : promptBuilder.getClass().getMethods()) {
                        if (m.getName().toLowerCase().contains("prompt")) {
                            if (m.getParameterCount() == 3) {
                                prompt = (String) m.invoke(promptBuilder, facts, userQuery, lang);
                                break;
                            } else if (m.getParameterCount() == 1) {
                                prompt = (String) m.invoke(promptBuilder, facts);
                                break;
                            }
                        }
                    }
                }

                String reply = null;
                for (Method m : llmClient.getClass().getMethods()) {
                    if ((m.getName().contains("generate") || m.getName().contains("ask") || m.getName().contains("chat"))
                            && m.getParameterCount() == 1) {
                        reply = (String) m.invoke(llmClient, prompt);
                        break;
                    }
                }

                if (reply != null && amountGuard != null && facts != null) {
                    try {
                        for (Method m : amountGuard.getClass().getMethods()) {
                            if (m.getParameterCount() == 2) {
                                reply = (String) m.invoke(amountGuard, reply, facts);
                                break;
                            }
                        }
                    } catch (Exception ignored) {}
                }

                if (reply != null && !reply.trim().isEmpty()) {
                    List<String> suggestions = Arrays.asList(
                            "How much is safe to save this week?",
                            "Can I send R500 home and still reach my goal?",
                            "Show me cheaper grocery alternatives."
                    );
                    return new CoachResponse(reply, suggestions, false);
                }
            }
        } catch (Exception ex) {
            log.warn("LLM generation unavailable: {}", ex.getMessage());
        }

        return buildFallback(facts, lang);
    }

    private String extract(Object obj, String method1, String method2, String defaultVal) {
        if (obj == null) return defaultVal;
        try {
            Method m = obj.getClass().getMethod(method1);
            Object res = m.invoke(obj);
            if (res != null) return res.toString();
        } catch (Exception ignored) {}
        if (method2 != null) {
            try {
                Method m = obj.getClass().getMethod(method2);
                Object res = m.invoke(obj);
                if (res != null) return res.toString();
            } catch (Exception ignored) {}
        }
        return defaultVal;
    }

    private CoachResponse buildFallback(Object facts, String language) {
        String amountStr = "500.00";
        if (facts != null) {
            amountStr = extract(facts, "getSafeToSaveAmount", "getSafeToSave", "500.00");
        }

        String message;
        if ("zu".equalsIgnoreCase(language)) {
            message = "Sawubona! Kusale imali ephephile ukuthi ungayilondoloza kule nyanga ngemuva kokubhekelela izidingo zasekhaya. Izinyathelo ezincane zenza umehluko omkhulu!";
        } else {
            message = "Hello Grace! You have R" + amountStr + " safe to save after remittances and commitments. Small, steady steps make a big difference!";
        }

        List<String> suggestions = Arrays.asList(
                "What is my current savings goal?",
                "How much have I sent home this month?"
        );
        return new CoachResponse(message, suggestions, true);
    }
}
=======
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
>>>>>>> Stashed changes
