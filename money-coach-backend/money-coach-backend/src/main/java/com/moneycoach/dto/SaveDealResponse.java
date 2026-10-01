package com.moneycoach.dto;

import java.math.BigDecimal;

public record SaveDealResponse(
        String productName,
        BigDecimal amountSaved,
        Long goalId,
        String goalName,
        BigDecimal goalSaved,
        BigDecimal goalTarget,
        BigDecimal goalRemaining,
        int goalPercentComplete,
        boolean goalComplete) {
}
