package intern.backend.dto;

public class KPIDTO {
    private int growthPercent;
    private long pendingActions;

    private long activeCountries;
    private long highPriorityIPs;

    public int getGrowthPercent() {
        return growthPercent;
    }

    public void setGrowthPercent(int growthPercent) {
        this.growthPercent = growthPercent;
    }

    public long getPendingActions() {
        return pendingActions;
    }

    public void setPendingActions(long pendingActions) {
        this.pendingActions = pendingActions;
    }

    public long getActiveCountries() {
        return activeCountries;
    }

    public void setActiveCountries(long activeCountries) {
        this.activeCountries = activeCountries;
    }

    public long getHighPriorityIPs() {
        return highPriorityIPs;
    }

    public void setHighPriorityIPs(long highPriorityIPs) {
        this.highPriorityIPs = highPriorityIPs;
    }


}
