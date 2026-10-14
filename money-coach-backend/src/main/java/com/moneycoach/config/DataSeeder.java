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

        Transaction salaryAugust = new Transaction(
                0,
                LocalDate.of(2026, 8, 25),
                8500.00,
                "Salary"
        );

        Transaction groceriesAugust = new Transaction(
                0,
                LocalDate.of(2026, 8, 26),
                700.00,
                "Checkers Sixty60"
        );

        Transaction transportAugust = new Transaction(
                0,
                LocalDate.of(2026, 8, 27),
                150.00,
                "Uber trip"
        );

        Transaction familyAugust = new Transaction(
                0,
                LocalDate.of(2026, 8, 28),
                1200.00,
                "Mukuru transfer to family"
        );

        Transaction airtimeAugust = new Transaction(
                0,
                LocalDate.of(2026, 8, 29),
                50.00,
                "Vodacom Airtime"
        );


        Transaction salarySeptember = new Transaction(
                0,
                LocalDate.of(2026, 9, 25),
                8500.00,
                "Salary"
        );

        Transaction groceriesSeptember = new Transaction(
                0,
                LocalDate.of(2026, 9, 26),
                650.00,
                "CHECKERS SANDTON"
        );

        Transaction transportSeptember = new Transaction(
                0,
                LocalDate.of(2026, 9, 27),
                120.00,
                "Uber"
        );

        Transaction familySeptember = new Transaction(
                0,
                LocalDate.of(2026, 9, 28),
                1000.00,
                "Mukuru transfer"
        );

        Transaction airtimeSeptember = new Transaction(
                0,
                LocalDate.of(2026, 9, 29),
                50.00,
                "Airtime"
        );


        Transaction salaryOctober = new Transaction(
                0,
                LocalDate.of(2026, 10, 1),
                8500.00,
                "Salary"
        );

        Transaction groceriesOctober = new Transaction(
                0,
                LocalDate.of(2026, 10, 1),
                600.00,
                "Checkers"
        );

        Transaction transportOctober = new Transaction(
                0,
                LocalDate.of(2026, 10, 1),
                100.00,
                "Bolt taxi"
        );

        Transaction familyOctober = new Transaction(
                0,
                LocalDate.of(2026, 10, 1),
                900.00,
                "Family transfer"
        );

        Transaction airtimeOctober = new Transaction(
                0,
                LocalDate.of(2026, 10, 1),
                50.00,
                "MTN Airtime"
        );

        categoriseAndSave(salaryAugust);
        categoriseAndSave(groceriesAugust);
        categoriseAndSave(transportAugust);
        categoriseAndSave(familyAugust);
        categoriseAndSave(airtimeAugust);

        categoriseAndSave(salarySeptember);
        categoriseAndSave(groceriesSeptember);
        categoriseAndSave(transportSeptember);
        categoriseAndSave(familySeptember);
        categoriseAndSave(airtimeSeptember);

        categoriseAndSave(salaryOctober);
        categoriseAndSave(groceriesOctober);
        categoriseAndSave(transportOctober);
        categoriseAndSave(familyOctober);
        categoriseAndSave(airtimeOctober);
    }

    private void categoriseAndSave(Transaction transaction) {

        CategorisationService categorisationService =
                new CategorisationService(transaction);

        categorisationService.categorise();

        transactionRepository.save(transaction);
    }
}