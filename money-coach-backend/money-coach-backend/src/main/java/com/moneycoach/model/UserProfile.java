package com.moneycoach.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double monthlyIncome;
    private double upcomingPayments;
    private String language;

    protected UserProfile() {

    }

    public UserProfile(String name, double monthlyIncome, double upcomingPayments, String language) {
        this.name = name;
        this.monthlyIncome = monthlyIncome;
        this.upcomingPayments = upcomingPayments;
        this.language = language;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getMonthlyIncome() { return monthlyIncome; }
    public double getUpcomingPayments() { return upcomingPayments; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
