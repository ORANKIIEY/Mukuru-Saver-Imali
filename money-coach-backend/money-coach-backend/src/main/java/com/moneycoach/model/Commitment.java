package com.moneycoach.model;

import jakarta.persistence.*;


@Entity
@Table(name = "commitments")
public class Commitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private double amount;

    private String type;   // FAMILY or HOUSEHOLD

    protected Commitment() {

    }

    public Commitment(String name, double amount, String type) {
        this.name = name;
        this.amount = amount;
        this.type = type;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getAmount() { return amount; }
    public String getType() { return type; }
}
