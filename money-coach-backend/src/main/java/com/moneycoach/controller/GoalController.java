package com.moneycoach.controller;

import com.moneycoach.dto.ContributionRequest;
import com.moneycoach.dto.GoalDto;
import com.moneycoach.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<GoalDto> all() {
        return goalService.findAll();
    }

    @GetMapping("/{id}")
    public GoalDto one(@PathVariable Long id) {
        return goalService.findById(id);
    }

    @PostMapping
    public GoalDto create(@RequestBody GoalDto request) {
        return goalService.create(request);
    }

    @PutMapping("/{id}")
    public GoalDto update(@PathVariable Long id, @RequestBody GoalDto request) {
        return goalService.update(id, request);
    }

    @PostMapping("/{id}/contributions")
    public GoalDto contribute(@PathVariable Long id, @RequestBody ContributionRequest request) {
        return goalService.contribute(id, request.amount());
    }
}
