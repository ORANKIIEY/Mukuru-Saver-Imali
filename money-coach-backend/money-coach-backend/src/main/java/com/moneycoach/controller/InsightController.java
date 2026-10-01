package com.moneycoach.controller;

import com.moneycoach.dto.InsightDto;
import com.moneycoach.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
public class InsightController {

    private final DashboardService dashboardService;

    public InsightController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public List<InsightDto> insights() {
        return dashboardService.insights();
    }
}
