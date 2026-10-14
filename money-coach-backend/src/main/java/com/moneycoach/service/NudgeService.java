package com.moneycoach.service;

import org.springframework.stereotype.Service;

@Service
public class NudgeService {

    static final double CLOSE_TO_GOAL = 150;


    public record Nudge(String code, double amount) {
    }

    public Nudge forGoal(double remaining) {
        if (remaining <= 0) {
            return new Nudge("nudge.goal.reached", 0);
        }
        if (remaining <= CLOSE_TO_GOAL) {
            return new Nudge("nudge.goal.close", remaining);
        }
        return new Nudge("nudge.goal.keepgoing", remaining);
    }
}
