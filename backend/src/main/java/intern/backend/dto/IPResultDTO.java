package intern.backend.dto;

public class IPResultDTO {

    private Long id;
    private String title;
    private String type;
    private String owner;
    private String country;
    private String status;

    public IPResultDTO() {}

    public IPResultDTO(Long id, String title, String type, String owner, String country, String status) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.owner = owner;
        this.country = country;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
