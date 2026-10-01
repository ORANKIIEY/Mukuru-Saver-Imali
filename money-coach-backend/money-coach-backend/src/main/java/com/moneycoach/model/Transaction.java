package com.moneycoach.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionID;
    private LocalDate time;
    private double amount;
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    public Transaction() {
    }

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