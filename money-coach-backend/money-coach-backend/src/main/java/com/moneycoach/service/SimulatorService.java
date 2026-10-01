package com.moneycoach.service;

import com.moneycoach.dto.SimulatorResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SimulatorService {


    public SimulatorResponse simulate(double available, double goalRemaining,
                                      double amountSent, double weeklySaving, LocalDate today) {
        double availableAfter = available - amountSent;

        Integer weeks = null;
        LocalDate projected = null;
        if (weeklySaving > 0) {
            weeks = (int) Math.ceil(goalRemaining / weeklySaving);
            projected = today.plusWeeks(weeks);
        }
        return new SimulatorResponse(availableAfter, availableAfter >= 0, goalRemaining, weeks, projected);
    }
}
