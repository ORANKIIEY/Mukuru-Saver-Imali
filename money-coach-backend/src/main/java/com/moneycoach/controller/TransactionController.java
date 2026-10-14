package com.moneycoach.controller;

import com.moneycoach.dto.MonthSummaryDto;
import com.moneycoach.dto.TransactionDto;
import com.moneycoach.model.Category;
import com.moneycoach.model.Transaction;
import com.moneycoach.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<TransactionDto> getAllTransactions(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) String text) {

        YearMonth yearMonth = null;

        if (month != null && !month.isBlank()) {
            yearMonth = YearMonth.parse(month);
        }

        return transactionService.getAllTransactions(
                category,
                yearMonth,
                text
        );
    }

    @GetMapping("/{id}")
    public TransactionDto getTransactionByID(@PathVariable int id) {

        return transactionService.getTransactionByID(id);
    }

    @GetMapping("/summary")
    public MonthSummaryDto getMonthSummary(
            @RequestParam String month) {

        return transactionService.getMonthSummary(
                YearMonth.parse(month)
        );
    }

    @PostMapping
    public TransactionDto saveTransaction(
            @RequestBody Transaction transaction) {

        return transactionService.saveTransaction(transaction);
    }
}