package com.moneycoach.dto;

import java.time.LocalDate;


public record SimulatorResponse(
        double availableAfterSend,
        boolean canAffordSend,
        double goalRemaining,
        Integer weeksToGoal,
        LocalDate projectedDate) {
}
