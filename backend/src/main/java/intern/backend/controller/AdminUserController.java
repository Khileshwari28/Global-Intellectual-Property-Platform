package intern.backend.controller;

import intern.backend.entity.Subscription;
import intern.backend.entity.User;
import intern.backend.repository.UserRepository;
import intern.backend.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://global-ip-portal.netlify.app"
})
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionService subscriptionService;

    // 1. GET ALL USERS (Admin User Management page)
    @GetMapping("/getall")
    public List<Map<String, Object>> getAllUsers() {

        return userRepository.findAll().stream().map(user -> {

            Subscription sub = subscriptionService.getSubscriptionByUserId(user.getId());

            Map<String, Object> map = new HashMap<>();
            map.put("id", user.getId());
            map.put("username", user.getUsername());
            map.put("email", user.getEmail());
            map.put("role", user.getRole());
            map.put("createdAt", user.getCreatedAt());
            map.put("enabled", user.getEnabled());


            if (sub != null) {
                map.put("plan", sub.getPlanName());
                map.put("planStatus", sub.getStatus());
                map.put("planStart", sub.getStartDate());
                map.put("planEnd", sub.getEndDate());
            } else {
                map.put("plan", "NONE");
                map.put("planStatus", "INACTIVE");
                map.put("planStart", null);
                map.put("planEnd", null);
            }

            return map;

        }).collect(Collectors.toList());
    }


    // 2. DELETE USER
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    // 3. DISABLE USER
    @PutMapping("/{id}/disable")
    public void disableUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(false);
        userRepository.save(user);
    }

    // 4. ENABLE USER
    @PutMapping("/{id}/enable")
    public void enableUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(true);
        userRepository.save(user);
    }

    // 5. PROMOTE USER (USER → ADMIN)
    @PutMapping("/{id}/promote")
    public void promoteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setRole("ADMIN");
        userRepository.save(user);
    }

    // 6. UPDATE USER DETAILS
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updated) {
        User user = userRepository.findById(id).orElseThrow();

        user.setUsername(updated.getUsername());
        user.setEmail(updated.getEmail());
        user.setRole(updated.getRole());

        return userRepository.save(user);
    }
}
