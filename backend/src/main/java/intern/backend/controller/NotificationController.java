package intern.backend.controller;

import intern.backend.entity.Notification;
import intern.backend.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // ✅ Fetch only (NO generation)
    //@GetMapping("/user_id")
    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Integer userId) {
        return service.getNotifications(userId);
    }
}