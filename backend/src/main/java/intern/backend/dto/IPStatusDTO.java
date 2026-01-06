package intern.backend.dto;

public class IPStatusDTO {

    private String status;
    private Long count;

    public IPStatusDTO(String status, Long count) {
        this.status = status;
        this.count = count;
    }

    public String getStatus() {
        return status;
    }

    public Long getCount() {
        return count;
    }
}
