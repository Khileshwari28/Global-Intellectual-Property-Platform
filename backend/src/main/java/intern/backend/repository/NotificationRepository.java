package intern.backend.repository;

import intern.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserIdOrderByTimestampDesc(Integer userId);

    boolean existsByUserIdAndIpAssetIdAndMessage(
            Integer userId,
            Integer ipAssetId,
            String message
    );
}
