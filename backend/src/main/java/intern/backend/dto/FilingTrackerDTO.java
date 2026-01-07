package intern.backend.dto;

import java.util.List;

public class FilingTrackerDTO {

    private Long id;
    private String name;
    private String type;
    private int progress;
    private String status;
    private String startDate;
    private String expectedDate;
    private String description;
    private List<StepDTO> steps;

    public FilingTrackerDTO(
            Long id,
            String name,
            String type,
            int progress,
            String status,
            String startDate,
            String expectedDate,
            String description,
            List<StepDTO> steps
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.progress = progress;
        this.status = status;
        this.startDate = startDate;
        this.expectedDate = expectedDate;
        this.description = description;
        this.steps = steps;
    }

    public static class StepDTO {
        public String name;
        public boolean completed;
        public String date;

        public StepDTO(String name, boolean completed, String date) {
            this.name = name;
            this.completed = completed;
            this.date = date;
        }
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public int getProgress() { return progress; }
    public String getStatus() { return status; }
    public String getStartDate() { return startDate; }
    public String getExpectedDate() { return expectedDate; }
    public String getDescription() { return description; }
    public List<StepDTO> getSteps() { return steps; }
}
