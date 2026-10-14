package com.moneycoach.ai;

import com.moneycoach.dto.CoachFacts;
import com.moneycoach.dto.GoalFact;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public static final Map<String, String> LANGUAGES = new LinkedHashMap<>();

    static {
        LANGUAGES.put("en", "English");
        LANGUAGES.put("zu", "isiZulu");
        LANGUAGES.put("xh", "isiXhosa");
        LANGUAGES.put("st", "Sesotho");
        LANGUAGES.put("sn", "Shona");
        LANGUAGES.put("ny", "Chichewa");
    }

    private final String template;

    @Autowired
    public PromptBuilder(@Value("classpath:prompts/coach-system-prompt.txt") Resource promptFile) {
        this(read(promptFile));
    }

    public PromptBuilder(String template) {
        this.template = template;
    }

    public static String normaliseLanguage(String code) {
        if (code == null) {
            return "en";
        }
        String c = code.trim().toLowerCase(Locale.ROOT);
        return LANGUAGES.containsKey(c) ? c : "en";
    }

    public String systemPrompt(String languageCode, CoachFacts facts) {
        String language = LANGUAGES.get(normaliseLanguage(languageCode));
        return template.replace("{{LANGUAGE}}", language).replace("{{FACTS}}", factsBlock(facts));
    }

    public static String factsBlock(CoachFacts f) {
        StringBuilder sb = new StringBuilder("<verified_facts>\n");
        sb.append("Customer first name: ").append(clean(f.userName(), 40)).append('\n');
        sb.append("Monthly income: ").append(MoneyFormat.rands(f.monthlyIncome())).append('\n');
        sb.append("Family commitments each month: ").append(MoneyFormat.rands(f.familyCommitments())).append('\n');
        sb.append("Household costs each month (food, transport, electricity, airtime): ")
                .append(MoneyFormat.rands(f.householdCosts())).append('\n');
        sb.append("Upcoming bills this month: ").append(MoneyFormat.rands(f.upcomingBills())).append('\n');
        sb.append("Left after costs and commitments: ").append(MoneyFormat.rands(f.leftAfterCosts())).append('\n');
        sb.append("Comfortable amount to save this month: ").append(MoneyFormat.rands(f.suggestedSaving())).append('\n');
        sb.append("Extra flexible amount if the customer wants to save more: ")
                .append(MoneyFormat.rands(f.flexibleAmount())).append('\n');

        sb.append("Goals:\n");
        if (f.goals().isEmpty()) {
            sb.append("- none yet\n");
        }
        for (GoalFact g : f.goals()) {
            sb.append("- ").append(clean(g.name(), 40)).append(": saved ")
                    .append(MoneyFormat.rands(g.saved())).append(" of ").append(MoneyFormat.rands(g.target()))
                    .append(" (").append(g.percentComplete()).append("%), ")
                    .append(MoneyFormat.rands(g.remaining())).append(" to go");
            if (g.targetDate() != null) {
                sb.append(", target date ").append(g.targetDate());
            }
            sb.append(g.complete() ? ", REACHED" : "").append('\n');
        }
        appendList(sb, "Nudges already calculated", f.nudges());
        appendList(sb, "Scenario results already calculated", f.scenarios());
        return sb.append("</verified_facts>").toString();
    }

    public static String clean(String text, int maxLength) {
        if (text == null) {
            return "";
        }
        String s = text.replaceAll("[\\p{Cntrl}<>]", " ").replaceAll("\\s+", " ").trim();
        return s.length() > maxLength ? s.substring(0, maxLength) : s;
    }

    private static void appendList(StringBuilder sb, String title, List<String> items) {
        if (items.isEmpty()) {
            return;
        }
        sb.append(title).append(":\n");
        for (String item : items) {
            sb.append("- ").append(clean(item, 200)).append('\n');
        }
    }

    private static String read(Resource resource) {
        try (var in = resource.getInputStream()) {
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read the coach system prompt", e);
        }
    }
}
