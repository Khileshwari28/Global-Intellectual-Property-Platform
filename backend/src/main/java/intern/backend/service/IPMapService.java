package intern.backend.service;

import intern.backend.dto.IPResultDTO;
import intern.backend.repository.IPAssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IPMapService {

    private final IPAssetRepository repository;

    public IPMapService(IPAssetRepository repository) {
        this.repository = repository;
    }

    /**
     * Used ONLY for map-based country click.
     * Supports ISO codes (IN, US) and full country names (India, United States).
     * Does NOT affect any other search functionality.
     */
    public List<IPResultDTO> getAssetsByCountry(String country) {
        return repository.findByCountryForMap(country)   // ✅ CHANGE IS HERE
                .stream()
                .map(ip -> new IPResultDTO(
                        ip.getId(),
                        ip.getTitle(),
                        ip.getType(),
                        ip.getOwner(),
                        ip.getCountry(),
                        ip.getStatus()
                ))
                .toList();
    }
}
