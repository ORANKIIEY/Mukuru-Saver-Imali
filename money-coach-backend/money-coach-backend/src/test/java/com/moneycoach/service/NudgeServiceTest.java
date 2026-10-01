package com.moneycoach.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NudgeServiceTest {

    private final NudgeService service = new NudgeService();

    @Test
    void closeToGoalWhenUnder150() {
        NudgeService.Nudge nudge = service.forGoal(120);

        assertEquals("nudge.goal.close", nudge.code());
        assertEquals(120, nudge.amount(), 0.001);
    }

    @Test
    void keepGoingWhenFarAway() {
        assertEquals("nudge.goal.keepgoing", service.forGoal(4800).code());
    }

    @Test
    void goalReachedWhenNothingRemains() {
        assertEquals("nudge.goal.reached", service.forGoal(0).code());
    }
}
