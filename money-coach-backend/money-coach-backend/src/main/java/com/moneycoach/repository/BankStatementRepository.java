package com.moneycoach.repository;

import com.moneycoach.model.BankStatement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankStatementRepository
        extends JpaRepository<BankStatement, Integer> {
}