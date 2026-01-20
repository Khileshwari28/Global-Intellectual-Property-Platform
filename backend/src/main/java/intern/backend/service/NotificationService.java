package intern.backend.service;

import intern.backend.entity.IPAsset;
import intern.backend.entity.Notification;
import intern.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepo;

    public NotificationService(NotificationRepository notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    // ✅ STORE notification
    public void createIfNotExists(
            Integer userId,
            IPAsset ip,
            String message,
            String type
    ) {
        if (userId == null) return;

        boolean exists = notificationRepo.existsByUserIdAndIpAssetIdAndMessage(
                userId,
                ip.getId().intValue(),
                message
        );

        if (exists) return;

        Notification n = new Notification();
        n.setUserId(userId);
        n.setIpAssetId(ip.getId().intValue());
        n.setMessage(message);
        n.setType(type);
        n.setTimestamp(new Date());

        notificationRepo.save(n);
    }

    // ✅ FETCH notifications (by USER)
    public List<Notification> getNotifications(Integer userId) {
        return notificationRepo.findByUserIdOrderByTimestampDesc(userId);
    }

    public void createSubscriptionNotification(Integer userId, String message) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setIpAssetId(0); // 0 = system generated
        n.setMessage(message);
        n.setType("SUBSCRIPTION");
        n.setTimestamp(new Date());
        notificationRepo.save(n);
    }


}
