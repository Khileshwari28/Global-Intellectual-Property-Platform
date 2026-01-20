package intern.backend.service;

import intern.backend.entity.SubscriptionPermission;
import intern.backend.repository.SubscriptionPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionPermissionService {

    @Autowired
    private SubscriptionPermissionRepository repo;

    public List<SubscriptionPermission> getAll() {
        return repo.findAll();
    }

    public List<String> getPermissionsForPlan(String plan) {
        return repo.findByPlanNameAndEnabledTrue(plan)
                .stream()
                .map(SubscriptionPermission::getFeatureKey)
                .toList();
    }

    public void updatePermission(String plan, String feature, boolean enabled) {
        SubscriptionPermission perm = repo
                .findByPlanNameAndFeatureKey(plan, feature)
                .orElse(new SubscriptionPermission());

        perm.setPlanName(plan);
        perm.setFeatureKey(feature);
        perm.setEnabled(enabled);

        repo.save(perm);
    }
}
