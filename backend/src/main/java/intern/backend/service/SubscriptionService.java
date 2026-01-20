package intern.backend.service;

import intern.backend.entity.Subscription;
import intern.backend.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository repository;
    @Autowired
    private NotificationService notificationService;

    /* 🔹 AUTO BASIC PLAN ON LOGIN */
    public Subscription ensureBasicSubscription(Long userId) {

        return repository.findByUserIdAndStatus(userId, "ACTIVE")
                .orElseGet(() -> {
                    Subscription sub = new Subscription();
                    sub.setUserId(userId);
                    sub.setPlanName("BASIC");
                    sub.setStartDate(LocalDateTime.now());
                    sub.setStatus("ACTIVE");
                    return repository.save(sub);
                });
    }

    /* 🔹 UPGRADE PLAN */
    public Subscription upgradePlan(Long userId, String newPlan, int months) {

        // 1️⃣ ENSURE BASIC EXISTS
        Subscription sub = repository.findByUserIdAndStatus(userId, "ACTIVE")
                .orElseGet(() -> {
                    Subscription basic = new Subscription();
                    basic.setUserId(userId);
                    basic.setPlanName("BASIC");
                    basic.setStartDate(LocalDateTime.now());
                    basic.setStatus("ACTIVE");
                    return repository.save(basic);
                });

        // 2️⃣ UPGRADE
        sub.setPlanName(newPlan.toUpperCase()); // PROFESSIONAL / ENTERPRISE
        sub.setStartDate(LocalDateTime.now());
        sub.setEndDate(LocalDateTime.now().plusMonths(months));
        sub.setStatus("ACTIVE");

        Subscription saved = repository.save(sub);

        // 🔔 NOTIFICATION
        notificationService.createIfNotExists(
                userId.intValue(),
                null,
                "Your subscription has been upgraded to " + newPlan,
                "SUBSCRIPTION"
        );

        notificationService.createSubscriptionNotification(
                userId.intValue(),
                "Your subscription has been upgraded to " + newPlan.toUpperCase()
        );

        return saved;
    }

    /* 🔹 USED BY ADMIN USER MANAGEMENT */
    public Subscription getSubscriptionByUserId(Long userId) {
        return repository.findByUserIdAndStatus(userId, "ACTIVE")
                .orElse(null);
    }
}
