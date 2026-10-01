package com.moneycoach.service;

import com.moneycoach.dto.GoalFact;
import java.math.BigDecimal;

public interface GoalContributionPort {
    GoalFact contribute(Long goalId, BigDecimal amount);
}
