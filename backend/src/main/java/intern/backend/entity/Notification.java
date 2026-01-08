package intern.backend.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "ip_asset_id", nullable = false)
    private Integer ipAssetId;

    @Column(name = "message", columnDefinition = "TEXT")
    private String message;

    @Column(name = "type")
    private String type;

    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp = new Date();

    public Integer getId() { return id; }
    public Integer getUserId() { return userId; }
    public Integer getIpAssetId() { return ipAssetId; }
    public String getMessage() { return message; }
    public String getType() { return type; }
    public Date getTimestamp() { return timestamp; }

    public void setUserId(Integer userId) { this.userId = userId; }
    public void setIpAssetId(Integer ipAssetId) { this.ipAssetId = ipAssetId; }
    public void setMessage(String message) { this.message = message; }
    public void setType(String type) { this.type = type; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
}
