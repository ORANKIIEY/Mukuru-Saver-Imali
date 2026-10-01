package com.moneycoach.dto;

import com.moneycoach.model.Commitment;

public record CommitmentDto(Long id, String name, double amount, String type) {

    public static CommitmentDto from(Commitment c) {
        return new CommitmentDto(c.getId(), c.getName(), c.getAmount(), c.getType());
    }
}
