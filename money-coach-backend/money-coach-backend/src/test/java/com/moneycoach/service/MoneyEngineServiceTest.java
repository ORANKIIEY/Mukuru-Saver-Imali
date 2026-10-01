package com.moneycoach.service;

import com.moneycoach.dto.SafeToSaveResponse;
import com.moneycoach.dto.SimulatorRequest;
import com.moneycoach.dto.SimulatorResponse;
import com.moneycoach.model.Goal;
import com.moneycoach.model.UserProfile;
import com.moneycoach.repository.GoalRepository;
import com.moneycoach.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MoneyEngineServiceTest {

    private UserProfileRepository profileRepository;
    private GoalRepository goalRepository;
    private CommitmentService commitmentService;
    private MoneyEngineService engine;

    @BeforeEach
    void setUp() {
        profileRepository = mock(UserProfileRepository.class);
        goalRepository = mock(GoalRepository.class);
        commitmentService = mock(CommitmentService.class);
        engine = new MoneyEngineService(profileRepository, goalRepository, commitmentService,
                new SafeToSaveService(), new SimulatorService());

        when(profileRepository.findAll()).thenReturn(List.of(new UserProfile("Grace", 8500, 600, "en")));
        when(commitmentService.total()).thenReturn(5700.0);
    }

    @Test
    void safeToSaveUsesProfileAndCommitments() {
        SafeToSaveResponse r = engine.safeToSave();

        assertEquals(2200, r.available(), 0.001);
        assertEquals(500, r.suggestedSaving(), 0.001);
    }

    @Test
    void simulateUsesAvailableMoneyAndFirstUnfinishedGoal() {
        when(goalRepository.findAll()).thenReturn(List.of(new Goal("School fees", null, 4500, 1300, null)));

        SimulatorResponse r = engine.simulate(new SimulatorRequest(500, 100));

        assertEquals(1700, r.availableAfterSend(), 0.001);   // 2200 - 500
        assertEquals(3200, r.goalRemaining(), 0.001);        // 4500 - 1300
        assertEquals(32, r.weeksToGoal());
    }

    @Test
    void simulateRejectsNegativeAmounts() {
        assertThrows(ResponseStatusException.class, () -> engine.simulate(new SimulatorRequest(-1, 0)));
    }

    @Test
    void profileMissingGivesNotFound() {
        when(profileRepository.findAll()).thenReturn(List.of());

        assertThrows(ResponseStatusException.class, () -> engine.profile());
    }
}
