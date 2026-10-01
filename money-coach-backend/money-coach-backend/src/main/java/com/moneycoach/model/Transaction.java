package com.moneycoach.model;

import java.time.LocalDate;

public class Transaction {
    private int transactionID;
    private LocalDate time;
    private double amount;
    private String description;
    private Category category;

    public Transaction(int transactionID, LocalDate time, double amount, String description) {
        this.transactionID = transactionID;
        this.time = time;
        this.amount = amount;
        this.description = description;
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

    public void setCategory(Category category) {
        this.category = category;
    }


}

//    "I think it needs an ID, date, amount, description and category."