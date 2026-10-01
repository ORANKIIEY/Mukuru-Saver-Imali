package com.moneycoach.service;
import com.moneycoach.model.Category;
import  com.moneycoach.model.Transaction;
public class CategorisationService {
    Transaction transaction;

    public CategorisationService(Transaction transaction) {
        this.transaction = transaction;
    }

    public void categorise() {
        String description = transaction.getDescription();
        if (description.equals("Checkers")) {
            transaction.setCategory(Category.GROCERIES);
        } else if (description.equalsIgnoreCase("uber")) {
            transaction.setCategory(Category.TRANSPORT);
        } else if (description.equalsIgnoreCase("salary")) {
            transaction.setCategory(Category.INCOME);
        } else if (description.equalsIgnoreCase("airtime")) {
            transaction.setCategory(Category.AIRTIME);
        } else if (description.equalsIgnoreCase("transfer")) {
            transaction.setCategory(Category.FAMILY_SUPPORT);
        } else {
            transaction.setCategory(Category.OTHER);
        }

    }

}