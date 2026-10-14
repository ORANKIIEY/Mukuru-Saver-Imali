package com.moneycoach.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MilestoneServiceTest {

    private final MilestoneService service = new MilestoneService();

    @Test
    void reportsMilestoneWhenCrossed() {
        assertEquals(25, service.newlyReached(22.5, 27.5));
    }

    @Test
    void reportsNothingWhenNoMilestoneCrossed() {
        assertEquals(0, service.newlyReached(30, 40));
    }

    @Test
    void reportsHighestWhenSeveralCrossedAtOnce() {
        assertEquals(75, service.newlyReached(20, 80));
    }

    @Test
    void reportsGoalCompleteAt100() {
        assertEquals(100, service.newlyReached(90, 100));
    }
}
