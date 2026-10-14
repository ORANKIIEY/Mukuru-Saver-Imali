package com.moneycoach.service;

import com.moneycoach.ai.MoneyFormat;
import com.moneycoach.dto.CoachFacts;
import com.moneycoach.dto.GoalFact;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "coach.facts.source", havingValue = "demo", matchIfMissing = true)
public class DemoFinancialData implements CoachFactsProvider, GoalContributionPort {

    private final List<GoalFact> goals = new CopyOnWriteArrayList<>();

    public DemoFinancialData() {
        goals.add(new GoalFact(1L, "Frosty", bd("6000"), bd("1200"), LocalDate.of(2027, 3, 31)));
        goals.add(new GoalFact(2L, "School fees", bd("3000"), bd("2850"), LocalDate.of(2027, 1, 15)));
    }

    @Override
    public synchronized CoachFacts currentFacts() {
        List<String> nudges = new ArrayList<>();
        for (GoalFact g : goals) {
            if (!g.complete() && g.remaining().compareTo(bd("200")) <= 0) {
                nudges.add(g.name() + " is " + MoneyFormat.rands(g.remaining()) + " away.");
            }
        }
        return new CoachFacts("Grace", bd("8500"), bd("1500"), bd("4200"), bd("600"),
                bd("2200"), bd("500"), bd("1700"), new ArrayList<>(goals), nudges, List.of());
    }

    @Override
    public synchronized GoalFact contribute(Long goalId, BigDecimal amount) {
        if (amount == null || amount.signum() <= 0) {
            throw new IllegalArgumentException("Amount must be more than zero.");
        }
        for (int i = 0; i < goals.size(); i++) {
            GoalFact g = goals.get(i);
            if (g.id().equals(goalId)) {
                GoalFact updated = g.withSaved(g.saved().add(amount));
                goals.set(i, updated);
                return updated;
            }
        }
        throw new NoSuchElementException("Goal " + goalId + " was not found.");
    }

    private static BigDecimal bd(String v) {
        return new BigDecimal(v);
    }
}
