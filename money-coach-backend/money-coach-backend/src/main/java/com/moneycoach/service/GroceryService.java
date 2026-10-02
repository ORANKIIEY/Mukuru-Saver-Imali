package com.moneycoach.service;

import com.moneycoach.dto.GoalFact;
import com.moneycoach.dto.GroceryDealDto;
import com.moneycoach.dto.SaveDealResponse;
import com.moneycoach.model.Product;
import com.moneycoach.repository.ProductRepository;
import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroceryService {

    private static final int MAX_WATCHED = 5;

    private final ProductRepository products;
    private final GoalContributionPort goals;
    private final Clock clock;

    private final Set<String> claimed = ConcurrentHashMap.newKeySet();

    @Autowired
    public GroceryService(ProductRepository products, GoalContributionPort goals) {
        this(products, goals, Clock.system(ZoneId.of("Africa/Johannesburg")));
    }

    public GroceryService(ProductRepository products, GoalContributionPort goals, Clock clock) {
        this.products = products;
        this.goals = goals;
        this.clock = clock;
    }

    public List<GroceryDealDto> watchlist(List<String> productIds) {
        List<Product> chosen;
        if (productIds == null || productIds.isEmpty()) {
            chosen = products.findAll().stream().filter(Product::watchlist).limit(MAX_WATCHED).toList();
        } else {
            if (productIds.size() > MAX_WATCHED) {
                throw new IllegalArgumentException("You can watch up to " + MAX_WATCHED + " staples.");
            }
            chosen = productIds.stream()
                    .map(id -> products.findById(id)
                            .orElseThrow(() -> new IllegalArgumentException("Unknown product: " + id)))
                    .toList();
        }
        return chosen.stream().map(GroceryService::toDto).toList();
    }

    public SaveDealResponse saveDeal(String productId, Long goalId) {
        Product product = products.findById(productId)
                .orElseThrow(() -> new java.util.NoSuchElementException("Unknown product: " + productId));
        BigDecimal saving = product.saving();
        if (saving.signum() <= 0) {
            throw new IllegalStateException(product.name() + " has no saving today.");
        }

        String claimKey = product.id() + "|" + LocalDate.now(clock) + "|" + product.todayPrice().toPlainString();
        if (!claimed.add(claimKey)) {
            throw new IllegalStateException("You already saved today's " + product.name() + " deal.");
        }
        try {
            GoalFact updated = goals.contribute(goalId, saving);
            return new SaveDealResponse(product.name(), saving, updated.id(), updated.name(), updated.saved(),
                    updated.target(), updated.remaining(), updated.percentComplete(), updated.complete());
        } catch (RuntimeException e) {
            claimed.remove(claimKey);
            throw e;
        }
    }

    private static GroceryDealDto toDto(Product p) {
        BigDecimal saving = p.saving();
        return new GroceryDealDto(p.id(), p.name(), p.unit(), p.store(), p.usualPrice(), p.todayPrice(),
                saving, saving.signum() > 0);
    }
}
