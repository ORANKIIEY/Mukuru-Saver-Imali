package com.moneycoach.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;          // e.g. "School fees"

    private String nickname;      // e.g. "Frosty" (optional)

    @Column(nullable = false)
    private double targetAmount;

    private double savedAmount;

    private LocalDate targetDate;

    protected Goal() {
        // needed by JPA
    }

    public Goal(String name, String nickname, double targetAmount, double savedAmount, LocalDate targetDate) {
        this.name = name;
        this.nickname = nickname;
        this.targetAmount = targetAmount;
        this.savedAmount = savedAmount;
        this.targetDate = targetDate;
    }


    public double getRemaining() {
        return Math.max(0, targetAmount - savedAmount);
    }


    public double getProgressPercent() {
        if (targetAmount <= 0) return 0;
        return Math.min(100, savedAmount / targetAmount * 100);
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public double getTargetAmount() { return targetAmount; }
    public void setTargetAmount(double targetAmount) { this.targetAmount = targetAmount; }
    public double getSavedAmount() { return savedAmount; }
    public void setSavedAmount(double savedAmount) { this.savedAmount = savedAmount; }
    public LocalDate getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }
}
