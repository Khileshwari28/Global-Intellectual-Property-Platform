package intern.backend.controller;

import intern.backend.entity.Subscription;
import intern.backend.entity.User;
import intern.backend.repository.UserRepository;
import intern.backend.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword())
                .<ResponseEntity<?>>map(u -> {

                    if (!Boolean.TRUE.equals(u.getEnabled())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("message", "Your account has been disabled. Please contact support."));
                    }

                    Subscription sub =
                            subscriptionService.ensureBasicSubscription(u.getId());

                    return ResponseEntity.ok(Map.of(
                            "id", u.getId(),
                            "email", u.getEmail(),
                            "username", u.getUsername(),
                            "role", u.getRole(),
                            "plan", sub.getPlanName()
                    ));
                })
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of("message", "Invalid email or password"))
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        return userRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        return userRepository.findById(id)
                .map(user -> {

                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());

                    // Add more fields if your User entity has them
                    // user.setCompany(updatedUser.getCompany());
                    // user.setPhone(updatedUser.getPhone());

                    userRepository.save(user);

                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        String currentPassword = body.get("currentPassword");
        String newPassword = body.get("newPassword");

        return userRepository.findById(id)
                .<ResponseEntity<?>>map(user -> {

                    if (!user.getPassword().equals(currentPassword)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(Map.of("message", "Current password is incorrect"));
                    }

                    user.setPassword(newPassword);
                    userRepository.save(user);

                    return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "User not found")));
    }

    @PostMapping("/{id}/support")
    public ResponseEntity<?> submitSupportQuery(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        return userRepository.findById(id)
                .<ResponseEntity<?>>map(user -> {
                    // e.g. save into a SupportTicket entity/table here,
                    // or email it to an admin address
                    return ResponseEntity.ok(Map.of("message", "Query submitted successfully"));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "User not found")));
    }
}
