package com.moneycoach.service;

import com.moneycoach.dto.CommitmentDto;
import com.moneycoach.model.Commitment;
import com.moneycoach.repository.CommitmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitmentService {

    private final CommitmentRepository commitmentRepository;

    public CommitmentService(CommitmentRepository commitmentRepository) {
        this.commitmentRepository = commitmentRepository;
    }

    public List<CommitmentDto> findAll() {
        return commitmentRepository.findAll().stream().map(CommitmentDto::from).toList();
    }

    /** Total of all monthly commitments. */
    public double total() {
        return commitmentRepository.findAll().stream().mapToDouble(Commitment::getAmount).sum();
    }
}
