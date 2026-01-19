package intern.backend.controller;

import intern.backend.entity.UserFiling;
import intern.backend.service.UserFilingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-filings")
@CrossOrigin(origins = "http://localhost:5173")
public class UserFilingController {

    private final UserFilingService service;

    public UserFilingController(UserFilingService service) {
        this.service = service;
    }

    // USER: create new filing
    @PostMapping("/create")
    public UserFiling create(@RequestBody UserFiling filing) {
        return service.createFiling(filing);
    }

    // USER: filing tracker
    @GetMapping("/user/{userId}")
    public List<UserFiling> userFilings(@PathVariable Integer userId) {
        return service.getUserFilings(userId);
    }

    // ADMIN: all filings
    @GetMapping("/admin")
    public List<Map<String, Object>> adminFilings() {
        return service.getAllFilingsForAdmin();
    }

    // ADMIN: update status
    @PutMapping("/admin/{id}/status")
    public void updateStatus(@PathVariable Long id,
                             @RequestParam String status) {
        service.updateStatus(id, status);
    }
}
