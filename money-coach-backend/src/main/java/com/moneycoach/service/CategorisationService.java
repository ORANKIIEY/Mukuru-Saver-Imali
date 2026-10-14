package com.moneycoach.service;

import com.moneycoach.model.Category;
import com.moneycoach.model.Transaction;

public class CategorisationService {

    Transaction transaction;

    public CategorisationService(Transaction transaction) {
        this.transaction = transaction;
    }

    public void categorise() {

        String description = transaction.getDescription();

        if (description == null || description.isBlank()) {
            transaction.setCategory(Category.OTHER);
            return;
        }

        String descriptionLowerCase = description.toLowerCase();

        if (descriptionLowerCase.contains("checkers")
                || descriptionLowerCase.contains("shoprite")
                || descriptionLowerCase.contains("pick n pay")) {

            transaction.setCategory(Category.GROCERIES);

        } else if (descriptionLowerCase.contains("uber")
                || descriptionLowerCase.contains("bolt")
                || descriptionLowerCase.contains("taxi")) {

            transaction.setCategory(Category.TRANSPORT);

        } else if (descriptionLowerCase.contains("salary")
                || descriptionLowerCase.contains("wage")) {

            transaction.setCategory(Category.INCOME);

        } else if (descriptionLowerCase.contains("airtime")
                || descriptionLowerCase.contains("vodacom")
                || descriptionLowerCase.contains("mtn")
                || descriptionLowerCase.contains("telkom")) {

            transaction.setCategory(Category.AIRTIME);

        } else if (descriptionLowerCase.contains("transfer")
                || descriptionLowerCase.contains("mukuru")
                || descriptionLowerCase.contains("family")) {

            transaction.setCategory(Category.FAMILY_SUPPORT);

        } else {
            transaction.setCategory(Category.OTHER);
        }
    }
}