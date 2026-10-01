package com.moneycoach.service;

import com.moneycoach.dto.GoalDto;
import com.moneycoach.model.Goal;
import com.moneycoach.repository.GoalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final MilestoneService milestoneService;

    public GoalService(GoalRepository goalRepository, MilestoneService milestoneService) {
        this.goalRepository = goalRepository;
        this.milestoneService = milestoneService;
    }

    public List<GoalDto> findAll() {
        return goalRepository.findAll().stream().map(g -> GoalDto.from(g, 0)).toList();
    }

    public GoalDto findById(Long id) {
        return GoalDto.from(getGoal(id), 0);
    }

    public GoalDto create(GoalDto request) {
        validate(request);
        Goal goal = new Goal(request.name(), request.nickname(), request.targetAmount(),
                Math.max(0, request.savedAmount()), request.targetDate());
        return GoalDto.from(goalRepository.save(goal), 0);
    }

    public GoalDto update(Long id, GoalDto request) {
        validate(request);
        Goal goal = getGoal(id);
        goal.setName(request.name());
        goal.setNickname(request.nickname());
        goal.setTargetAmount(request.targetAmount());
        goal.setTargetDate(request.targetDate());
        return GoalDto.from(goalRepository.save(goal), 0);
    }

    /** Adds money to a goal and reports any milestone (25/50/75/100) this contribution crossed. */
    public GoalDto contribute(Long id, double amount) {
        if (amount <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amount must be more than 0");
        }
        Goal goal = getGoal(id);
        double before = goal.getProgressPercent();
        goal.setSavedAmount(goal.getSavedAmount() + amount);
        Goal saved = goalRepository.save(goal);
        int milestone = milestoneService.newlyReached(before, saved.getProgressPercent());
        return GoalDto.from(saved, milestone);
    }

    private Goal getGoal(Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Goal not found"));
    }

    private void validate(GoalDto request) {
        if (request.name() == null || request.name().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Goal name is required");
        }
        if (request.targetAmount() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Target must be more than 0");
        }
    }
}
