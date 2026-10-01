package com.moneycoach.controller;

import com.moneycoach.dto.GroceryDealDto;
import com.moneycoach.dto.SaveDealRequest;
import com.moneycoach.dto.SaveDealResponse;
import com.moneycoach.service.GroceryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groceries")
public class GroceryController {

    private final GroceryService groceryService;

    public GroceryController(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    @GetMapping
    public List<GroceryDealDto> watchlist(@RequestParam(required = false) List<String> staples) {
        return groceryService.watchlist(staples);
    }

    @PostMapping("/{productId}/save")
    public SaveDealResponse save(@PathVariable String productId, @Valid @RequestBody SaveDealRequest request) {
        return groceryService.saveDeal(productId, request.goalId());
    }
}
