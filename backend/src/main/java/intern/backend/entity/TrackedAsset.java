package intern.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tracked_assets", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "asset_id"})
})
public class TrackedAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    private IPAsset asset;

    @Column(name = "tracked_at")
    private LocalDateTime trackedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public IPAsset getAsset() { return asset; }
    public void setAsset(IPAsset asset) { this.asset = asset; }
    public LocalDateTime getTrackedAt() { return trackedAt; }
    public void setTrackedAt(LocalDateTime trackedAt) { this.trackedAt = trackedAt; }
}