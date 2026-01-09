package intern.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;

import intern.backend.entity.Subscription;
import intern.backend.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscription")
@CrossOrigin(origins = "http://localhost:5173")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/upgrade")
    public Subscription upgrade(
            @RequestParam Long userId,
            @RequestParam String plan
    ) {
        int months = plan.equalsIgnoreCase("ENTERPRISE") ? 12 : 1;
        return subscriptionService.upgradePlan(userId, plan, months);
    }
}
