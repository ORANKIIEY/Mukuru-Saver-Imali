package com.moneycoach.service;

import com.moneycoach.dto.SafeToSaveResponse;
import com.moneycoach.dto.SimulatorRequest;
import com.moneycoach.dto.SimulatorResponse;
import com.moneycoach.model.Goal;
import com.moneycoach.model.UserProfile;
import com.moneycoach.repository.GoalRepository;
import com.moneycoach.repository.UserProfileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class MoneyEngineService {

    private final UserProfileRepository profileRepository;
    private final GoalRepository goalRepository;
    private final CommitmentService commitmentService;
    private final SafeToSaveService safeToSaveService;
    private final SimulatorService simulatorService;

    public MoneyEngineService(UserProfileRepository profileRepository, GoalRepository goalRepository,
                              CommitmentService commitmentService, SafeToSaveService safeToSaveService,
                              SimulatorService simulatorService) {
        this.profileRepository = profileRepository;
        this.goalRepository = goalRepository;
        this.commitmentService = commitmentService;
        this.safeToSaveService = safeToSaveService;
        this.simulatorService = simulatorService;
    }

    public UserProfile profile() {
        return profileRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No user profile found. Has the seed data run?"));
    }

    public SafeToSaveResponse safeToSave() {
        UserProfile profile = profile();
        return safeToSaveService.calculate(profile.getMonthlyIncome(),
                commitmentService.total(), profile.getUpcomingPayments());
    }


    public List<Goal> goals() {
        return goalRepository.findAll().stream().sorted(Comparator.comparing(Goal::getId)).toList();
    }


    public Optional<Goal> primaryGoal() {
        List<Goal> goals = goals();
        return goals.stream().filter(g -> g.getRemaining() > 0).findFirst()
                .or(() -> goals.stream().findFirst());
    }

    public SimulatorResponse simulate(SimulatorRequest request) {
        if (request.amountSent() < 0 || request.weeklySaving() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Amounts cannot be negative");
        }
        double remaining = primaryGoal().map(Goal::getRemaining).orElse(0.0);
        return simulatorService.simulate(safeToSave().available(), remaining,
                request.amountSent(), request.weeklySaving(), LocalDate.now());
    }
}
