package intern.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "ip_assets")
public class IPAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String type;
    private String owner;
    private String country;
    private String status;
    private String issuingAuthority;

    @Column(length = 2000)
    private String description;

    private String expiryDate;
    private String searchKeyword;

    @Column(name = "filing_date")
    private LocalDate filingDate;

    private String publicationDate;
    private String grantDate;
    private String pdfLink;

    @Column(name = "is_tracked")
    private Boolean isTracked = false;



    public IPAsset() {}

    public Boolean getIsTracked() {
        return isTracked;
    }

    public void setIsTracked(Boolean isTracked) {
        this.isTracked = isTracked;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getType() { return type; }
    public String getOwner() { return owner; }
    public String getCountry() { return country; }
    public String getStatus() { return status; }
    public String getIssuingAuthority() { return issuingAuthority; }
    public String getDescription() { return description; }
    public String getExpiryDate() { return expiryDate; }
    public String getSearchKeyword() { return searchKeyword; }
    public LocalDate getFilingDate() {
        return filingDate;
    }

    public String getPublicationDate() { return publicationDate; }
    public String getGrantDate() { return grantDate; }
    public String getPdfLink() { return pdfLink; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setType(String type) { this.type = type; }
    public void setOwner(String owner) { this.owner = owner; }
    public void setCountry(String country) { this.country = country; }
    public void setStatus(String status) { this.status = status; }
    public void setIssuingAuthority(String issuingAuthority) { this.issuingAuthority = issuingAuthority; }
    public void setDescription(String description) { this.description = description; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
    public void setSearchKeyword(String searchKeyword) { this.searchKeyword = searchKeyword; }
    public void setFilingDate(LocalDate filingDate) { this.filingDate = filingDate; }
    public void setPublicationDate(String publicationDate) { this.publicationDate = publicationDate; }
    public void setGrantDate(String grantDate) { this.grantDate = grantDate; }
    public void setPdfLink(String pdfLink) { this.pdfLink = pdfLink; }

}
