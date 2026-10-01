package com.moneycoach.service;

import com.moneycoach.dto.SimulatorResponse;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class SimulatorServiceTest {

    private final SimulatorService service = new SimulatorService();
    private final LocalDate today = LocalDate.of(2026, 10, 1);

    @Test
    void sendingMoneyReducesAvailableButNotTheGoal() {
        SimulatorResponse r = service.simulate(1600, 3200, 500, 0, today);

        assertEquals(1100, r.availableAfterSend(), 0.001);
        assertTrue(r.canAffordSend());
        assertEquals(3200, r.goalRemaining(), 0.001);
        assertNull(r.weeksToGoal());
    }

    @Test
    void weeklySavingGivesWeeksAndProjectedDate() {
        SimulatorResponse r = service.simulate(1600, 3200, 0, 100, today);

        assertEquals(32, r.weeksToGoal());
        assertEquals(today.plusWeeks(32), r.projectedDate());
    }

    @Test
    void roundsWeeksUp() {
        SimulatorResponse r = service.simulate(1600, 3250, 0, 100, today);

        assertEquals(33, r.weeksToGoal());
    }

    @Test
    void warnsWhenSendingMoreThanAvailable() {
        SimulatorResponse r = service.simulate(400, 3200, 500, 0, today);

        assertFalse(r.canAffordSend());
    }
}
