package com.moneycoach.service;

import com.moneycoach.model.Transaction;
import com.moneycoach.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionByID(int id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public Transaction saveTransaction(Transaction transaction) {
        CategorisationService categorisationService = new CategorisationService(transaction);
        categorisationService.categorise();

        return transactionRepository.save(transaction);
    }
}