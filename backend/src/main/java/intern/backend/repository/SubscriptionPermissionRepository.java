package intern.backend.repository;

import intern.backend.entity.SubscriptionPermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionPermissionRepository
        extends JpaRepository<SubscriptionPermission, Long> {

    List<SubscriptionPermission> findByPlanNameAndEnabledTrue(String planName);

    Optional<SubscriptionPermission> findByPlanNameAndFeatureKey(String planName, String featureKey);
}
