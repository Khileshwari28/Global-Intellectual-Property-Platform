package intern.backend.repository;

import intern.backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {


    Optional<Subscription> findByUserIdAndStatus(Long userId, String active);
}
