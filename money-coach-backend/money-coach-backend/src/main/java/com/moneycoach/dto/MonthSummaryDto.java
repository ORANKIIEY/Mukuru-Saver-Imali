package com.moneycoach.dto;

import java.util.Map;

public class MonthSummaryDto {

    private String month;
    private double income;
    private double familySupport;
    private double householdSpending;
    private double totalSpending;
    private Map<String, Double> totalsPerCategory;

    public MonthSummaryDto(
            String month,
            double income,
            double familySupport,
            double householdSpending,
            double totalSpending,
            Map<String, Double> totalsPerCategory) {

        this.month = month;
        this.income = income;
        this.familySupport = familySupport;
        this.householdSpending = householdSpending;
        this.totalSpending = totalSpending;
        this.totalsPerCategory = totalsPerCategory;
    }

    public String getMonth() {
        return month;
    }

    public double getIncome() {
        return income;
    }

    public double getFamilySupport() {
        return familySupport;
    }

    public double getHouseholdSpending() {
        return householdSpending;
    }

    public double getTotalSpending() {
        return totalSpending;
    }

    public Map<String, Double> getTotalsPerCategory() {
        return totalsPerCategory;
    }
}