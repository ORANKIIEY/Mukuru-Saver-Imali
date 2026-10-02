package com.moneycoach.dto;

import java.math.BigDecimal;
import java.util.List;

public record CoachFacts(
        String userName,
        BigDecimal monthlyIncome,
        BigDecimal familyCommitments,
        BigDecimal householdCosts,
        BigDecimal upcomingBills,
        BigDecimal leftAfterCosts,
        BigDecimal suggestedSaving,
        BigDecimal flexibleAmount,
        List<GoalFact> goals,
        List<String> nudges,
        List<String> scenarios) {

    public CoachFacts {
        goals = goals == null ? List.of() : List.copyOf(goals);
        nudges = nudges == null ? List.of() : List.copyOf(nudges);
        scenarios = scenarios == null ? List.of() : List.copyOf(scenarios);
    }
}
