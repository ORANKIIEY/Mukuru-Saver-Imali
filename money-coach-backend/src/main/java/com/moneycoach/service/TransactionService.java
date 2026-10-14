package com.moneycoach.service;

import com.moneycoach.dto.MonthSummaryDto;
import com.moneycoach.dto.TransactionDto;
import com.moneycoach.exception.ResourceNotFoundException;
import com.moneycoach.model.Category;
import com.moneycoach.model.Transaction;
import com.moneycoach.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionDto> getAllTransactions(
            Category category,
            YearMonth month,
            String text) {

        return transactionRepository.findAll()
                .stream()
                .filter(transaction ->
                        category == null
                                || transaction.getCategory() == category)
                .filter(transaction ->
                        month == null
                                || YearMonth.from(transaction.getTime()).equals(month))
                .filter(transaction ->
                        text == null
                                || text.isBlank()
                                || transaction.getDescription()
                                .toLowerCase()
                                .contains(text.toLowerCase()))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TransactionDto getTransactionByID(int id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Transaction with ID " + id + " was not found"));

        return convertToDto(transaction);
    }

    public TransactionDto saveTransaction(Transaction transaction) {

        CategorisationService categorisationService =
                new CategorisationService(transaction);

        categorisationService.categorise();

        Transaction savedTransaction =
                transactionRepository.save(transaction);

        return convertToDto(savedTransaction);
    }

    public MonthSummaryDto getMonthSummary(YearMonth month) {

        List<Transaction> transactions = transactionRepository.findAll()
                .stream()
                .filter(transaction ->
                        YearMonth.from(transaction.getTime()).equals(month))
                .toList();

        double income = 0;
        double familySupport = 0;
        double householdSpending = 0;
        double totalSpending = 0;

        Map<String, Double> totalsPerCategory = new HashMap<>();

        for (Transaction transaction : transactions) {

            Category category = transaction.getCategory();
            double amount = transaction.getAmount();

            totalsPerCategory.put(
                    category.name(),
                    totalsPerCategory.getOrDefault(category.name(), 0.0)
                            + amount
            );

            if (category == Category.INCOME) {

                income += amount;

            } else {

                totalSpending += amount;

                if (category == Category.FAMILY_SUPPORT) {
                    familySupport += amount;
                } else {
                    householdSpending += amount;
                }
            }
        }

        return new MonthSummaryDto(
                month.toString(),
                income,
                familySupport,
                householdSpending,
                totalSpending,
                totalsPerCategory
        );
    }

    private TransactionDto convertToDto(Transaction transaction) {

        return new TransactionDto(
                transaction.getTransactionID(),
                transaction.getTime(),
                transaction.getAmount(),
                transaction.getDescription(),
                transaction.getCategory()
        );
    }
}