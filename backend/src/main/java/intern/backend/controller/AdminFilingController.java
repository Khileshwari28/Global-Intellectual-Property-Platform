package intern.backend.controller;
import intern.backend.entity.UserFiling;
import intern.backend.service.UserFilingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/filings")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://global-ip-portal.netlify.app"
})
public class AdminFilingController {

    private final UserFilingService service;

    public AdminFilingController(UserFilingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Map<String, Object>> getAllFilings() {
        return service.getAllFilingsForAdmin();
    }

    @PutMapping("/{id}/status")
    public void updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        service.updateStatus(id, status);
    }
}


