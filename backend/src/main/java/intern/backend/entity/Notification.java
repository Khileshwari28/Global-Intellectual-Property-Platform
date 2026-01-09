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
    private Integer userId;   // ✅ FK → users.id

    @Column(name = "ip_asset_id", nullable = false)
    private Integer ipAssetId;

    private String message;
    private String type;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp = new Date();

    // getters & setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getIpAssetId() {
        return ipAssetId;
    }

    public void setIpAssetId(Integer ipAssetId) {
        this.ipAssetId = ipAssetId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
