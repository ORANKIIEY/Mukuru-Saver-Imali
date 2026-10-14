package com.moneycoach.controller;

import com.moneycoach.ai.CoachRateLimiter;
import com.moneycoach.dto.CoachRequest;
import com.moneycoach.dto.CoachResponse;
import com.moneycoach.service.CoachService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/coach")
public class CoachController {

    private final CoachService coachService;
    private final CoachRateLimiter rateLimiter;

    public CoachController(CoachService coachService, CoachRateLimiter rateLimiter) {
        this.coachService = coachService;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping
    public ResponseEntity<?> ask(@Valid @RequestBody CoachRequest request, HttpServletRequest http) {
        if (!rateLimiter.tryAcquire(http.getRemoteAddr())) {
            return ResponseEntity.status(429).body(Map.of("error", "Too many questions. Please wait a moment."));
        }
        CoachResponse response = coachService.ask(request);
        return ResponseEntity.ok(response);
    }
}
