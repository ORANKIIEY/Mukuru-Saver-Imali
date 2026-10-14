package com.moneycoach.ai;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class AmountGuard {

    private static final Pattern AMOUNT =
            Pattern.compile("(?<![\\p{L}])R\\s?(\\d+(?:[ ,\\u00A0]\\d{3})*(?:\\.\\d{1,2})?)");

    private AmountGuard() {
    }

    public static Set<String> amountsIn(String text) {
        Set<String> found = new LinkedHashSet<>();
        if (text == null) {
            return found;
        }
        Matcher m = AMOUNT.matcher(text);
        while (m.find()) {
            found.add(normalise(m.group(1)));
        }
        return found;
    }

    public static List<String> unverifiedAmounts(String reply, String... trustedTexts) {
        Set<String> trusted = new LinkedHashSet<>();
        for (String t : trustedTexts) {
            trusted.addAll(amountsIn(t));
        }
        List<String> bad = new ArrayList<>();
        for (String amount : amountsIn(reply)) {
            if (!trusted.contains(amount)) {
                bad.add(amount);
            }
        }
        return bad;
    }

    private static String normalise(String raw) {
        String digits = raw.replaceAll("[ ,\\u00A0]", "");
        return new BigDecimal(digits).stripTrailingZeros().toPlainString();
    }
}
