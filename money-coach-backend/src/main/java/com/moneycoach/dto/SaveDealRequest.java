package com.moneycoach.dto;

import jakarta.validation.constraints.NotNull;

public record SaveDealRequest(@NotNull Long goalId) {
}
