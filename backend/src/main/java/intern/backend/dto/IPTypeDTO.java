package intern.backend.dto;

public class IPTypeDTO {

    private String type;
    private Long count;

    public IPTypeDTO(String type, Long count) {
        this.type = type;
        this.count = count;
    }

    public String getType() {
        return type;
    }

    public Long getCount() {
        return count;
    }
}
