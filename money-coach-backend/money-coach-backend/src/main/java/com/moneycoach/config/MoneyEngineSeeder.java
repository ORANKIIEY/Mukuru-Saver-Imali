package com.moneycoach.config;

import com.moneycoach.model.Commitment;
import com.moneycoach.model.Goal;
import com.moneycoach.model.UserProfile;
import com.moneycoach.repository.CommitmentRepository;
import com.moneycoach.repository.GoalRepository;
import com.moneycoach.repository.UserProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


@Component
public class MoneyEngineSeeder implements CommandLineRunner {

    private final UserProfileRepository profileRepository;
    private final CommitmentRepository commitmentRepository;
    private final GoalRepository goalRepository;

    public MoneyEngineSeeder(UserProfileRepository profileRepository,
                             CommitmentRepository commitmentRepository,
                             GoalRepository goalRepository) {
        this.profileRepository = profileRepository;
        this.commitmentRepository = commitmentRepository;
        this.goalRepository = goalRepository;
    }

    @Override
    public void run(String... args) {
        if (profileRepository.count() == 0) {
            profileRepository.save(new UserProfile("Grace", 8500, 600, "en"));
        }
        if (commitmentRepository.count() == 0) {
            commitmentRepository.save(new Commitment("Family support", 1500, "FAMILY"));
            commitmentRepository.save(new Commitment("Household essentials", 3200, "HOUSEHOLD"));
            commitmentRepository.save(new Commitment("Transport", 1000, "HOUSEHOLD"));
        }
        if (goalRepository.count() == 0) {
            goalRepository.save(new Goal("School fees", null, 4500, 1300, LocalDate.of(2027, 1, 31)));
            goalRepository.save(new Goal("Fridge", "Frosty", 6000, 1200, LocalDate.of(2027, 3, 31)));
        }
    }
}
