package com.moneycoach.dto;

import java.math.BigDecimal;

public record GroceryDealDto(
        String productId,
        String name,
        String unit,
        String store,
        BigDecimal usualPrice,
        BigDecimal todayPrice,
        BigDecimal saving,
        boolean deal) {
}
