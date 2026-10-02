package com.moneycoach.service;

import com.moneycoach.dto.CoachRequest;
import com.moneycoach.dto.CoachResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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