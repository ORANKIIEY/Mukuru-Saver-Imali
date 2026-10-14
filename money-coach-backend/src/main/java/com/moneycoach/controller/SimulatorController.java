package com.moneycoach.controller;

import com.moneycoach.dto.SimulatorRequest;
import com.moneycoach.dto.SimulatorResponse;
import com.moneycoach.service.MoneyEngineService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/simulator")
public class SimulatorController {

    private final MoneyEngineService engine;

    public SimulatorController(MoneyEngineService engine) {
        this.engine = engine;
    }

    @PostMapping
    public SimulatorResponse simulate(@RequestBody SimulatorRequest request) {
        return engine.simulate(request);
    }
}
