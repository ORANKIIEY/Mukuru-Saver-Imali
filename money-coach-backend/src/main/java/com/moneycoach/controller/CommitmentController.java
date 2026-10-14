package com.moneycoach.controller;

import com.moneycoach.dto.CommitmentDto;
import com.moneycoach.service.CommitmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/commitments")
public class CommitmentController {

    private final CommitmentService commitmentService;

    public CommitmentController(CommitmentService commitmentService) {
        this.commitmentService = commitmentService;
    }

    @GetMapping
    public List<CommitmentDto> all() {
        return commitmentService.findAll();
    }
}
