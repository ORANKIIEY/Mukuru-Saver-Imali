package com.moneycoach.service;

import com.moneycoach.dto.SafeToSaveResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SafeToSaveServiceTest {

    private final SafeToSaveService service = new SafeToSaveService();

    @Test
    void worksOutAvailableSuggestedAndFlexible() {
        // income 8500 - (family 1500 + household 3200 + transport 1000) - upcoming 600 = 2200
        SafeToSaveResponse r = service.calculate(8500, 5700, 600);

        assertEquals(2200, r.available(), 0.001);
        assertEquals(500, r.suggestedSaving(), 0.001);   // 25% = 550, rounded down to nearest 100
        assertEquals(1700, r.flexibleSpending(), 0.001);
    }

    @Test
    void neverGoesBelowZeroWhenCommitmentsExceedIncome() {
        SafeToSaveResponse r = service.calculate(3000, 3500, 0);

        assertEquals(0, r.available(), 0.001);
        assertEquals(0, r.suggestedSaving(), 0.001);
    }
}
