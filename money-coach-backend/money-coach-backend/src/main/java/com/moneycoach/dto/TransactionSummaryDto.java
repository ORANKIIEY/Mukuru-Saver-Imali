package com.moneycoach.dto;

import com.moneycoach.model.Category;

import java.util.Map;


public record TransactionSummaryDto(
        String month,
        double income,
        double familySupport,
        double householdSpending,
        double totalSpending,
        Map<Category, Double> byCategory) {
}
