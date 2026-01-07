package intern.backend.dto;

public class IPTrendDTO {

    private Integer label;
    private Long count;

    public IPTrendDTO(Integer label, Long count) {
        this.label = label;
        this.count = count;
    }

    public Integer getLabel() {
        return label;
    }

    public Long getCount() {
        return count;
    }
}
