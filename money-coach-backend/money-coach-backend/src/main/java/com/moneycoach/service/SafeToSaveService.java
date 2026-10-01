package com.moneycoach.service;

import com.moneycoach.dto.SafeToSaveResponse;
import org.springframework.stereotype.Service;

@Service
public class SafeToSaveService {

    // Team decision: suggest saving a quarter of what is available, rounded down to the nearest R100.
    static final double SAVE_SHARE = 0.25;
    static final double ROUND_TO = 100;


    public SafeToSaveResponse calculate(double income, double commitmentsTotal, double upcomingPayments) {
        double available = Math.max(0, income - commitmentsTotal - upcomingPayments);
        double suggested = Math.floor(available * SAVE_SHARE / ROUND_TO) * ROUND_TO;
        double flexible = available - suggested;
        return new SafeToSaveResponse(income, commitmentsTotal, upcomingPayments, available, suggested, flexible);
    }
}
