package intern.backend.service;

import intern.backend.entity.User;
import intern.backend.entity.UserFiling;
import intern.backend.repository.UserFilingRepository;
import intern.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserFilingService {

    private final UserFilingRepository repo;
    private final UserRepository userRepo; // to fetch username for admin

    public UserFilingService(UserFilingRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    // USER creates new filing
    public UserFiling createFiling(UserFiling filing) {
        filing.setStatus("PENDING");
        filing.setCreatedAt(LocalDateTime.now());
        return repo.save(filing);
    }

    // USER sees his filings
    public List<UserFiling> getUserFilings(Integer userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // ADMIN sees all filings with user name
    public List<Map<String, Object>> getAllFilingsForAdmin() {
        List<UserFiling> filings = repo.findAllByOrderByCreatedAtDesc();
        List<Map<String, Object>> result = new ArrayList<>();

        for (UserFiling f : filings) {
            User u = userRepo.findById(f.getUserId().longValue()).orElse(null);

            Map<String, Object> map = new HashMap<>();
            map.put("id", f.getId());
            map.put("keyword", f.getKeyword());
            map.put("assetType", f.getAssetType());
            map.put("jurisdiction", f.getJurisdiction());
            map.put("frequency", f.getFrequency());
            map.put("description", f.getDescription());
            map.put("status", f.getStatus());
            map.put("createdAt", f.getCreatedAt());

            // Admin extra
            map.put("userId", f.getUserId());
            map.put("userName", u != null ? u.getUsername() : "Unknown");

            result.add(map);
        }

        return result;
    }

    // ADMIN updates status
    public void updateStatus(Long id, String status) {
        UserFiling filing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Filing not found"));
        filing.setStatus(status);
        repo.save(filing);
    }
}
