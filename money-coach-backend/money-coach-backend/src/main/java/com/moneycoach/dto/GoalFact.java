package com.moneycoach.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

public record GoalFact(Long id, String name, BigDecimal target, BigDecimal saved, LocalDate targetDate) {

    public BigDecimal remaining() {
        BigDecimal left = target.subtract(saved);
        return left.signum() < 0 ? BigDecimal.ZERO : left;
    }

    public int percentComplete() {
        if (target.signum() <= 0) {
            return 0;
        }
        int pct = saved.multiply(BigDecimal.valueOf(100)).divide(target, 0, RoundingMode.DOWN).intValue();
        return Math.min(pct, 100);
    }

    public boolean complete() {
        return saved.compareTo(target) >= 0;
    }

    public GoalFact withSaved(BigDecimal newSaved) {
        return new GoalFact(id, name, target, newSaved, targetDate);
    }
}
