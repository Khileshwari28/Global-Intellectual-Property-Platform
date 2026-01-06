package intern.backend.dto;

public class IPTrendDTO {

    private String year;
    private Long count;

    public IPTrendDTO(String year, Long count) {
        this.year = year;
        this.count = count;
    }

    public String getYear() {
        return year;
    }

    public Long getCount() {
        return count;
    }
}
