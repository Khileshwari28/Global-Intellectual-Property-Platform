package intern.backend.service;

import intern.backend.dto.FilingTrackerDTO;
import intern.backend.dto.IPDetailDTO;
import intern.backend.dto.IPResultDTO;
import intern.backend.dto.IPSearchRequest;
import intern.backend.entity.IPAsset;
import intern.backend.repository.IPAssetRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class IPService {

    private final IPAssetRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ip.api.key}")
    private String apiKey;

    @Value("${ip.api.url}")
    private String apiUrl;

    public IPService(IPAssetRepository repository) {
        this.repository = repository;
    }

    // ================= SEARCH =================
    public List<IPResultDTO> searchIPs(IPSearchRequest request) {

        if (request.getKeyword() == null || request.getKeyword().isBlank()) {
            return List.of();
        }

        String url = apiUrl
                + "?engine=google_patents"
                + "&q=" + request.getKeyword()
                + "&api_key=" + apiKey;

        Map<String, Object> response;
        try {
            response = restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // ✅ prevents 500
        }

        Object resultsObj = response != null ? response.get("organic_results") : null;
        if (!(resultsObj instanceof List)) {
            return List.of();
        }

        List<?> organicResults = (List<?>) resultsObj;

        for (Object obj : organicResults) {
            if (!(obj instanceof Map)) continue;

            Map<String, Object> item = (Map<String, Object>) obj;

            String title = (String) item.getOrDefault("title", "Untitled");
            String snippet = (String) item.getOrDefault("snippet", "");

            // OWNER
            String owner = "Not Available";

            // Primary: assignee (STRING)
            if (item.get("assignee") instanceof String assignee && !assignee.isBlank()) {
                owner = assignee;
            }

// Fallback: inventor
            else if (item.get("inventor") instanceof String inventor && !inventor.isBlank()) {
                owner = inventor;
            }


            // ================= PDF LINK =================
            String pdfLink = (String) item.get("pdf");


            // COUNTRY
            String country = "NA";
            Object pub = item.get("publication_number");
            if (pub instanceof String p && p.length() >= 2) {
                country = p.substring(0, 2);
            }

            String filingDate = (String) item.get("filing_date");
            String publicationDate = (String) item.get("publication_date");
            String grantDate = (String) item.get("grant_date");

            String status = (grantDate != null && !grantDate.isBlank())
                    ? "GRANTED"
                    : "PENDING";

            if (repository.existsByTitleIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
                    title, country, request.getKeyword())) {
                continue;
            }

            IPAsset asset = new IPAsset();
            asset.setTitle(title);
            asset.setType(request.getType());
            asset.setCountry(country);
            asset.setOwner(owner);
            asset.setStatus(status);
            asset.setIssuingAuthority("Google Patents");
            asset.setDescription(snippet);
            asset.setSearchKeyword(request.getKeyword());
            asset.setFilingDate(filingDate);
            asset.setPublicationDate(publicationDate);
            asset.setGrantDate(grantDate);
            asset.setPdfLink(pdfLink);

            repository.save(asset);
        }


        // ================= FETCH FROM DB =================
        List<IPAsset> dbResults;

        boolean hasCountry =
                request.getCountry() != null &&
                        !request.getCountry().isBlank() &&
                        !"All Countries".equalsIgnoreCase(request.getCountry());

        if (hasCountry) {
            dbResults =
                    repository.findByTypeIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
                            request.getType(),
                            request.getCountry(),
                            request.getKeyword()
                    );
        } else {
            dbResults =
                    repository.findByTypeIgnoreCaseAndSearchKeywordIgnoreCase(
                            request.getType(),
                            request.getKeyword()
                    );
        }

        return mapToResultDTO(dbResults);
    }

    // ================= DETAILS =================
    public IPDetailDTO getIPDetails(Long id) {

        IPAsset asset = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("IP not found"));

        IPDetailDTO dto = new IPDetailDTO();
        dto.setId(asset.getId());
        dto.setTitle(asset.getTitle());
        dto.setType(asset.getType());
        dto.setCountry(asset.getCountry());
        dto.setOwner(asset.getOwner());
        dto.setStatus(asset.getStatus());
        dto.setIssuingAuthority(asset.getIssuingAuthority());
        dto.setDescription(asset.getDescription());
        dto.setFilingDate(asset.getFilingDate());
        dto.setGrantDate(asset.getGrantDate());
        dto.setPdfLink(asset.getPdfLink());

        return dto;
    }

    // ================= MAPPER =================
    private List<IPResultDTO> mapToResultDTO(List<IPAsset> assets) {

        List<IPResultDTO> results = new ArrayList<>();

        for (IPAsset asset : assets) {
            results.add(new IPResultDTO(
                    asset.getId(),
                    asset.getTitle(),
                    asset.getType(),
                    asset.getOwner(),
                    asset.getCountry(),
                    asset.getStatus()
            ));
        }
        return results;
    }


    //================FilingTracker============
    public List<FilingTrackerDTO> getFilingTracker() {

        List<IPAsset> assets = repository.findAll();

        List<FilingTrackerDTO> list = new ArrayList<>();

        for (IPAsset asset : assets) {

            List<FilingTrackerDTO.StepDTO> steps = List.of(
                    new FilingTrackerDTO.StepDTO("Application Submitted", true, asset.getFilingDate()),
                    new FilingTrackerDTO.StepDTO("Examination", asset.getGrantDate() != null, asset.getGrantDate() != null ? asset.getGrantDate() : "Pending"),
                    new FilingTrackerDTO.StepDTO("Grant", asset.getGrantDate() != null, asset.getGrantDate() != null ? asset.getGrantDate() : "Pending")
            );

            int progress =
                    asset.getGrantDate() != null ? 100 :
                            asset.getPublicationDate() != null ? 75 :
                                    asset.getFilingDate() != null ? 50 : 25;

            String status =
                    progress == 100 ? "Completed" :
                            progress >= 50 ? "In Progress" : "Pending";

            list.add(
                    new FilingTrackerDTO(
                            asset.getId(),
                            asset.getTitle(),
                            asset.getType(),
                            progress,
                            status,
                            asset.getFilingDate(),
                            asset.getExpiryDate(),
                            asset.getDescription(),
                            steps
                    )
            );
        }

        return list;
    }
}
