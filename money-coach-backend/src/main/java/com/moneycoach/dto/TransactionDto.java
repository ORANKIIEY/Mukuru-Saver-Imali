package com.moneycoach.dto;

import com.moneycoach.model.Category;

import java.time.LocalDate;

public class TransactionDto {

    private int transactionID;
    private LocalDate time;
    private double amount;
    private String description;
    private Category category;

    public TransactionDto() {
    }

    public TransactionDto(
            int transactionID,
            LocalDate time,
            double amount,
            String description,
            Category category) {

        this.transactionID = transactionID;
        this.time = time;
        this.amount = amount;
        this.description = description;
        this.category = category;
    }

    public int getTransactionID() {
        return transactionID;
    }

    public LocalDate getTime() {
        return time;
    }

    public double getAmount() {
        return amount;
    }

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }
}