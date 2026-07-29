package intern.backend.dto;

public class LegalStatusSummaryDTO {
    private long totalFilings;
    private long activeCount;
    private long pendingCount;
    private String riskLevel;

    public long getTotalFilings() {
        return totalFilings;
    }

    public void setTotalFilings(long totalFilings) {
        this.totalFilings = totalFilings;
    }

    public long getActiveCount() {
        return activeCount;
    }

    public void setActiveCount(long activeCount) {
        this.activeCount = activeCount;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(long pendingCount) {
        this.pendingCount = pendingCount;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    private long rejectedCount;

    public long getRejectedCount() { return rejectedCount; }
    public void setRejectedCount(long rejectedCount) { this.rejectedCount = rejectedCount; }

}
