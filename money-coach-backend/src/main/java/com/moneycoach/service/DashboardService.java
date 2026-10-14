package com.moneycoach.service;

import com.moneycoach.dto.DashboardResponse;
import com.moneycoach.dto.GoalDto;
import com.moneycoach.dto.InsightDto;
import com.moneycoach.model.Goal;
import com.moneycoach.model.UserProfile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {

    private final MoneyEngineService engine;
    private final CommitmentService commitmentService;
    private final NudgeService nudgeService;

    public DashboardService(MoneyEngineService engine, CommitmentService commitmentService,
                            NudgeService nudgeService) {
        this.engine = engine;
        this.commitmentService = commitmentService;
        this.nudgeService = nudgeService;
    }

    public DashboardResponse dashboard() {
        UserProfile profile = engine.profile();
        Optional<Goal> goal = engine.primaryGoal();

        return new DashboardResponse(
                profile.getName(),
                profile.getLanguage(),
                profile.getMonthlyIncome(),
                engine.safeToSave(),
                goal.map(g -> GoalDto.from(g, 0)).orElse(null),
                goal.map(g -> nudgeService.forGoal(g.getRemaining())).orElse(null),
                commitmentService.findAll());
    }


    public List<InsightDto> insights() {
        return engine.goals().stream().map(g -> {
            NudgeService.Nudge nudge = nudgeService.forGoal(g.getRemaining());
            return new InsightDto(g.getId(), g.getName(), nudge.code(), nudge.amount());
        }).toList();
    }
}
