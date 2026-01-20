package intern.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subscription_permissions")
public class SubscriptionPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "feature_key")
    private String featureKey;

    private boolean enabled;

    public Long getId() { return id; }
    public String getPlanName() { return planName; }
    public String getFeatureKey() { return featureKey; }
    public boolean isEnabled() { return enabled; }

    public void setId(Long id) { this.id = id; }
    public void setPlanName(String planName) { this.planName = planName; }
    public void setFeatureKey(String featureKey) { this.featureKey = featureKey; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
