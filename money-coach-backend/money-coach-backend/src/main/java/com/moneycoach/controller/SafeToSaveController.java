package com.moneycoach.controller;

import com.moneycoach.dto.SafeToSaveResponse;
import com.moneycoach.service.MoneyEngineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/safe-to-save")
public class SafeToSaveController {

    private final MoneyEngineService engine;

    public SafeToSaveController(MoneyEngineService engine) {
        this.engine = engine;
    }

    @GetMapping
    public SafeToSaveResponse safeToSave() {
        return engine.safeToSave();
    }
}
