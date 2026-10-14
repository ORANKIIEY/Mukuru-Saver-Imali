package com.moneycoach.model;

import java.math.BigDecimal;

public record Product(
        String id,
        String name,
        String unit,
        String store,
        BigDecimal usualPrice,
        BigDecimal todayPrice,
        boolean watchlist) {

    public BigDecimal saving() {
        BigDecimal diff = usualPrice.subtract(todayPrice);
        return diff.signum() > 0 ? diff : BigDecimal.ZERO;
    }
}
