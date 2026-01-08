package intern.backend.controller;

import intern.backend.entity.Subscription;
import intern.backend.entity.User;
import intern.backend.repository.UserRepository;
import intern.backend.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        user.setCreatedAt(LocalDateTime.now());

        // default role
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Object loginUser(@RequestBody User user) {

        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())
                .map(u -> {

                    // ✅ ENSURE BASIC PLAN
                    Subscription sub =
                            subscriptionService.ensureBasicSubscription(u.getId());

                    // ✅ SEND PLAN TO FRONTEND
                    return Map.of(
                            "id", u.getId(),
                            "email", u.getEmail(),
                            "username", u.getUsername(),
                            "role", u.getRole(),
                            "plan", sub.getPlanName()
                    );
                })
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
