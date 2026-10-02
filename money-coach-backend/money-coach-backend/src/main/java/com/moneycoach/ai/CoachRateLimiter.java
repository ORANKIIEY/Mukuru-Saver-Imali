package com.moneycoach.ai;

import java.time.Clock;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CoachRateLimiter {

    private record Window(long minute, int count) {
    }

    private final ConcurrentHashMap<String, Window> windows = new ConcurrentHashMap<>();
    private final int maxPerMinute;
    private final Clock clock;

    @Autowired
    public CoachRateLimiter(@Value("${coach.rate-limit.per-minute:20}") int maxPerMinute) {
        this(maxPerMinute, Clock.systemUTC());
    }

    public CoachRateLimiter(int maxPerMinute, Clock clock) {
        this.maxPerMinute = maxPerMinute;
        this.clock = clock;
    }

    public boolean tryAcquire(String key) {
        long minute = clock.millis() / 60_000;
        if (windows.size() > 10_000) {
            windows.entrySet().removeIf(e -> e.getValue().minute() < minute);
        }
        Window w = windows.merge(key, new Window(minute, 1),
                (old, fresh) -> old.minute() == minute ? new Window(minute, old.count() + 1) : fresh);
        return w.count() <= maxPerMinute;
    }
}
