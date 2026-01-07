package intern.backend.dto;

import java.util.Map;

public class LegalStatusDTO {

    private Long id;
    private String name;
    private String type;
    private String jurisdiction;
    private String description;
    private String filedDate;
    private String expiryDate;
    private String filingNumber;
    private String status;
    private String legalRisk;
    private Map<String, String> details;

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getJurisdiction() { return jurisdiction; }
    public String getDescription() { return description; }
    public String getFiledDate() { return filedDate; }
    public String getExpiryDate() { return expiryDate; }
    public String getFilingNumber() { return filingNumber; }
    public String getStatus() { return status; }
    public String getLegalRisk() { return legalRisk; }
    public Map<String, String> getDetails() { return details; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setType(String type) { this.type = type; }
    public void setJurisdiction(String jurisdiction) { this.jurisdiction = jurisdiction; }
    public void setDescription(String description) { this.description = description; }
    public void setFiledDate(String filedDate) { this.filedDate = filedDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public void setFilingNumber(String filingNumber) { this.filingNumber = filingNumber; }
    public void setStatus(String status) { this.status = status; }
    public void setLegalRisk(String legalRisk) { this.legalRisk = legalRisk; }
    public void setDetails(Map<String, String> details) { this.details = details; }
}
