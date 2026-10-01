package com.moneycoach.service;

import org.springframework.stereotype.Service;

@Service
public class MilestoneService {

    private static final int[] MILESTONES = {25, 50, 75, 100};


    public int newlyReached(double percentBefore, double percentAfter) {
        int reached = 0;
        for (int m : MILESTONES) {
            if (percentBefore < m && percentAfter >= m) {
                reached = m;
            }
        }
        return reached;
    }
}
