package com.moneycoach.controller;

import com.moneycoach.dto.SafeToSaveResponse;
import com.moneycoach.service.SafeToSaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/safe-to-save")
public class SafeToSaveController {

    private final SafeToSaveService safeToSaveService;

    public SafeToSaveController(SafeToSaveService safeToSaveService) {
        this.safeToSaveService = safeToSaveService;
    }

    @GetMapping
    public ResponseEntity<SafeToSaveResponse> getSafeToSave(
            @RequestParam(name = "userId", defaultValue = "user-grace-01") String userId) {
        return ResponseEntity.ok(safeToSaveService.getSafeToSave(userId));
    }
}