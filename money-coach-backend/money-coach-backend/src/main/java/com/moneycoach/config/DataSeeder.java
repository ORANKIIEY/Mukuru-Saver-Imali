package com.moneycoach.config;

import com.moneycoach.model.Transaction;
import com.moneycoach.repository.TransactionRepository;
import com.moneycoach.service.CategorisationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TransactionRepository transactionRepository;

    public DataSeeder(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public void run(String... args) {

        if (transactionRepository.count() > 0) {
            return;
        }

        Transaction salary = new Transaction(
                0,
                LocalDate.of(2026, 9, 25),
                8500.00,
                "Salary"
        );

        Transaction groceries = new Transaction(
                0,
                LocalDate.of(2026, 9, 26),
                650.00,
                "Checkers"
        );

        Transaction transport = new Transaction(
                0,
                LocalDate.of(2026, 9, 27),
                120.00,
                "Uber"
        );

        Transaction familySupport = new Transaction(
                0,
                LocalDate.of(2026, 9, 28),
                1000.00,
                "Transfer"
        );

        Transaction airtime = new Transaction(
                0,
                LocalDate.of(2026, 9, 29),
                50.00,
                "Airtime"
        );

        categoriseAndSave(salary);
        categoriseAndSave(groceries);
        categoriseAndSave(transport);
        categoriseAndSave(familySupport);
        categoriseAndSave(airtime);
    }

    private void categoriseAndSave(Transaction transaction) {
        CategorisationService categorisationService =
                new CategorisationService(transaction);

        categorisationService.categorise();

        transactionRepository.save(transaction);
    }
}