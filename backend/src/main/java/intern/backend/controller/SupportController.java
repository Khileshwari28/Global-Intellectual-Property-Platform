package intern.backend.controller;

import intern.backend.entity.SupportMessage;
import intern.backend.service.SupportMessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:5173")
public class SupportController {

    private final SupportMessageService service;

    public SupportController(SupportMessageService service) {
        this.service = service;
    }

    // USER: submit a new query
    @PostMapping("/user/{userId}")
    public SupportMessage submit(@PathVariable Integer userId, @RequestBody SupportMessage msg) {
        msg.setUserId(userId);
        return service.createMessage(msg);
    }

    // USER: view their own messages + replies
    @GetMapping("/user/{userId}")
    public List<SupportMessage> userMessages(@PathVariable Integer userId) {
        return service.getMessagesForUser(userId);
    }

    // ADMIN: view all messages
    @GetMapping("/admin")
    public List<Map<String, Object>> adminMessages() {
        return service.getAllMessagesForAdmin();
    }

    // ADMIN: reply to a message
    @PutMapping("/admin/{id}/reply")
    public SupportMessage reply(@PathVariable Long id, @RequestParam String reply) {
        return service.replyToMessage(id, reply);
    }

    // ADMIN: open ticket count (for navbar badge)
    @GetMapping("/admin/open-count")
    public long openCount() {
        return service.getOpenCount();
    }
}