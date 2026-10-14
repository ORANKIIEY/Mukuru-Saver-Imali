package com.moneycoach.dto;

import com.moneycoach.model.Goal;
import java.time.LocalDate;


public record GoalDto(
        Long id,
        String name,
        String nickname,
        double targetAmount,
        double savedAmount,
        double remaining,
        double progressPercent,
        LocalDate targetDate,
        int milestoneReached) {

    public static GoalDto from(Goal g, int milestoneReached) {
        return new GoalDto(g.getId(), g.getName(), g.getNickname(), g.getTargetAmount(),
                g.getSavedAmount(), g.getRemaining(), g.getProgressPercent(),
                g.getTargetDate(), milestoneReached);
    }
}
