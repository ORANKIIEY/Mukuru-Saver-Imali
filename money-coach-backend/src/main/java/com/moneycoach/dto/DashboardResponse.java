package com.moneycoach.dto;

import com.moneycoach.service.NudgeService;

import java.util.List;


public record DashboardResponse(
        String userName,
        String language,
        double income,
        SafeToSaveResponse safeToSave,
        GoalDto currentGoal,
        NudgeService.Nudge insight,
        List<CommitmentDto> commitments) {
}
