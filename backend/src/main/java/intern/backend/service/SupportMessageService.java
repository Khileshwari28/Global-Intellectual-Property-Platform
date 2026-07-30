package intern.backend.service;

import intern.backend.entity.SupportMessage;
import intern.backend.entity.User;
import intern.backend.repository.SupportMessageRepository;
import intern.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SupportMessageService {

    private final SupportMessageRepository repo;
    private final UserRepository userRepo;

    public SupportMessageService(SupportMessageRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // USER: submit a new support message
    public SupportMessage createMessage(SupportMessage msg) {
        msg.setStatus("OPEN");
        msg.setCreatedAt(LocalDateTime.now());
        return repo.save(msg);
    }

    // USER: view their own messages + any admin replies
    public List<SupportMessage> getMessagesForUser(Integer userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // ADMIN: view all messages, with the sender's username attached
    public List<Map<String, Object>> getAllMessagesForAdmin() {
        List<SupportMessage> messages = repo.findAllByOrderByCreatedAtDesc();
        List<Map<String, Object>> result = new ArrayList<>();

        for (SupportMessage m : messages) {
            User u = userRepo.findById(m.getUserId().longValue()).orElse(null);

            Map<String, Object> map = new HashMap<>();
            map.put("id", m.getId());
            map.put("userId", m.getUserId());
            map.put("userName", u != null ? u.getUsername() : "Unknown");
            map.put("userEmail", u != null ? u.getEmail() : "Unknown");
            map.put("subject", m.getSubject());
            map.put("message", m.getMessage());
            map.put("status", m.getStatus());
            map.put("adminReply", m.getAdminReply());
            map.put("createdAt", m.getCreatedAt());
            map.put("repliedAt", m.getRepliedAt());

            result.add(map);
        }
        return result;
    }

    // ADMIN: reply to a message (also marks it resolved)
    public SupportMessage replyToMessage(Long id, String reply) {
        SupportMessage msg = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Support message not found"));

        msg.setAdminReply(reply);
        msg.setRepliedAt(LocalDateTime.now());
        msg.setStatus("RESOLVED");
        return repo.save(msg);
    }

    // ADMIN: count of open tickets, e.g. for a navbar badge
    public long getOpenCount() {
        return repo.countByStatusIgnoreCase("OPEN");
    }
}