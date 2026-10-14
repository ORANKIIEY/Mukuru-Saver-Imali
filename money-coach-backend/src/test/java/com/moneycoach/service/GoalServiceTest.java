package com.moneycoach.service;

import com.moneycoach.dto.GoalDto;
import com.moneycoach.model.Goal;
import com.moneycoach.repository.GoalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class GoalServiceTest {

    private GoalRepository repository;
    private GoalService service;

    @BeforeEach
    void setUp() {
        repository = mock(GoalRepository.class);
        service = new GoalService(repository, new MilestoneService());
    }

    @Test
    void contributeAddsToSavedAndReportsMilestone() {
        Goal goal = new Goal("School fees", null, 4000, 900, null);   // 22.5%
        when(repository.findById(1L)).thenReturn(Optional.of(goal));
        when(repository.save(any(Goal.class))).thenAnswer(inv -> inv.getArgument(0));

        GoalDto result = service.contribute(1L, 200);                 // 1100 = 27.5%, crosses 25%

        assertEquals(1100, result.savedAmount(), 0.001);
        assertEquals(2900, result.remaining(), 0.001);
        assertEquals(25, result.milestoneReached());
    }

    @Test
    void contributeRejectsZeroOrNegativeAmount() {
        assertThrows(ResponseStatusException.class, () -> service.contribute(1L, 0));
        assertThrows(ResponseStatusException.class, () -> service.contribute(1L, -50));
    }

    @Test
    void contributeFailsForUnknownGoal() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> service.contribute(99L, 100));
    }

    @Test
    void createRejectsMissingName() {
        GoalDto bad = new GoalDto(null, " ", null, 1000, 0, 0, 0, null, 0);

        assertThrows(ResponseStatusException.class, () -> service.create(bad));
    }

    @Test
    void createRejectsZeroTarget() {
        GoalDto bad = new GoalDto(null, "Fridge", "Frosty", 0, 0, 0, 0, null, 0);

        assertThrows(ResponseStatusException.class, () -> service.create(bad));
    }
}
