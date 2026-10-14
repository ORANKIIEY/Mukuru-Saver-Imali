package com.moneycoach.controller;

import com.moneycoach.dto.SafeToSaveResponse;
import com.moneycoach.service.SafeToSaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/safe-to-save")
public class SafeToSaveController {

    private final SafeToSaveService safeToSaveService;

    public SafeToSaveController(SafeToSaveService safeToSaveService) {
        this.safeToSaveService = safeToSaveService;
    }

    @GetMapping
    public ResponseEntity<SafeToSaveResponse> getSafeToSave(
            @RequestParam(name = "income", defaultValue = "4500.0") double income,
            @RequestParam(name = "commitmentsTotal", defaultValue = "1200.0") double commitmentsTotal,
            @RequestParam(name = "upcomingPayments", defaultValue = "300.0") double upcomingPayments) {
        return ResponseEntity.ok(safeToSaveService.calculate(income, commitmentsTotal, upcomingPayments));
    }
}