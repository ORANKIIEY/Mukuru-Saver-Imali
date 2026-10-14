package com.moneycoach.repository;

import com.moneycoach.model.Commitment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommitmentRepository extends JpaRepository<Commitment, Long> {
}
