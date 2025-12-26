package intern.backend.service;

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

        System.out.println(">>> IP SEARCH STARTED");

        // ===============================
        // 1️⃣ CALL SERPAPI
        // ===============================
        String url = apiUrl
                + "?engine=google_patents"
                + "&q=" + request.getKeyword()
                + "&api_key=" + apiKey;

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> organicResults =
                response != null
                        ? (List<Map<String, Object>>) response.get("organic_results")
                        : null;

        if (organicResults != null && !organicResults.isEmpty()) {

            System.out.println(">>> API returned data");

            for (Map<String, Object> item : organicResults) {

                String title = (String) item.get("title");
                String snippet = (String) item.get("snippet");

                // 🔹 Extract owner (assignee)
                // 🔹 Extract owner / assignee (multiple fallbacks)
                String owner = null;

// Primary: assignees
                List<Map<String, Object>> assignees =
                        (List<Map<String, Object>>) item.get("assignees");
                if (assignees != null && !assignees.isEmpty()) {
                    owner = (String) assignees.get(0).get("name");
                }

// Fallback 1: applicant
                if (owner == null) {
                    owner = (String) item.get("applicant");
                }

// Fallback 2: first inventor
                if (owner == null) {
                    List<Map<String, Object>> inventors =
                            (List<Map<String, Object>>) item.get("inventors");
                    if (inventors != null && !inventors.isEmpty()) {
                        owner = (String) inventors.get(0).get("name");
                    }
                }

// Final fallback
                if (owner == null) {
                    owner = "Not Available";
                }


                // 🔹 Extract country from publication_number (e.g., US123456A → US)
                String country = null;
                String publicationNumber = (String) item.get("publication_number");
                if (publicationNumber != null && publicationNumber.length() >= 2) {
                    country = publicationNumber.substring(0, 2);
                }

                // 🔹 Prevent duplicates (title + country + keyword)
                if (repository
                        .existsByTitleIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
                                title,
                                country,
                                request.getKeyword()
                        )) {
                    continue;
                }

                IPAsset asset = new IPAsset();
                asset.setTitle(title);
                asset.setType(request.getType());
                asset.setCountry(country);          // ✅ REAL country
                asset.setOwner(owner);              // ✅ REAL owner
                asset.setStatus("Fetched");
                asset.setIssuingAuthority("Google Patents");
                asset.setDescription(snippet);
                asset.setSearchKeyword(request.getKeyword());

                repository.save(asset);
            }
        }

        // ===============================
        // 2️⃣ FETCH FROM DATABASE
        // ===============================
        System.out.println(">>> FETCHING FROM DATABASE");

        List<IPAsset> dbResults;

        boolean hasCountry =
                request.getCountry() != null &&
                        !request.getCountry().isEmpty() &&
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
        dto.setCountry(asset.getCountry());   // ✅ FIXED
        dto.setOwner(asset.getOwner());       // ✅ FIXED
        dto.setStatus(asset.getStatus());
        dto.setIssuingAuthority(asset.getIssuingAuthority());
        dto.setDescription(asset.getDescription());

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
}
