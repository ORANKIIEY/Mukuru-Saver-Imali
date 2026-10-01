package com.moneycoach.dto;

public record SafeToSaveResponse(
        double income,
        double commitmentsTotal,
        double upcomingPayments,
        double available,
        double suggestedSaving,
        double flexibleSpending) {
}
