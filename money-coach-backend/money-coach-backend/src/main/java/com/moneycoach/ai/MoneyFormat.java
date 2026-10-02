package com.moneycoach.ai;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public final class MoneyFormat {

    private MoneyFormat() {
    }

    public static String rands(BigDecimal value) {
        if (value == null) {
            return "not available";
        }
        BigDecimal rounded = value.setScale(2, RoundingMode.HALF_UP);
        boolean whole = rounded.stripTrailingZeros().scale() <= 0;
        DecimalFormat format = new DecimalFormat(whole ? "#,##0" : "#,##0.00",
                DecimalFormatSymbols.getInstance(Locale.US));
        String body = format.format(rounded.abs());
        return (rounded.signum() < 0 ? "-R" : "R") + body;
    }
}
