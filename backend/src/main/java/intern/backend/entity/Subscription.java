package intern.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;   // ✅ CHANGED TO Long

    @Column(name = "plan_name", nullable = false)
    private String planName;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "status", nullable = false)
    private String status;

    public Subscription() {
        this.startDate = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getPlanName() { return planName; }
    public LocalDateTime getStartDate() { return startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPlanName(String planName) { this.planName = planName; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    public void setStatus(String status) { this.status = status; }
}
