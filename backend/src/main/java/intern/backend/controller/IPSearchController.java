package intern.backend.controller;

import intern.backend.dto.*;
import intern.backend.service.IPService;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/ip")
@CrossOrigin(origins = "http://localhost:5173")
public class IPSearchController {

    private final IPService ipService;

    public IPSearchController(IPService ipService) {
        this.ipService = ipService;
    }

    // 🔍 SEARCH API (used by IPSearch form)
    @PostMapping("/search")
    public List<IPResultDTO> searchIP(@RequestBody IPSearchRequest request) {
        System.out.println("🔥 CONTROLLER HIT 🔥");
        return ipService.searchIPs(request);
    }

    // 📄 DETAILS API (used when clicking "View Details")
    @GetMapping("/{id}")
    public IPDetailDTO getIPDetails(@PathVariable Long id) {
        return ipService.getIPDetails(id);
    }

    // FILING TRACKER
    @GetMapping("/filings/tracker")
    public List<FilingTrackerDTO> getFilingTracker() {
        return ipService.getFilingTracker();
    }

    //======LEGAL STATUS====
    @GetMapping("/legal-status")
    public List<LegalStatusDTO> getLegalStatus() {
        return ipService.getLegalStatus();
    }

    @GetMapping("/legal-status/summary")
    public LegalStatusSummaryDTO getLegalStatusSummary() {
        return ipService.getLegalStatusSummary();
    }

    @GetMapping("/kpis")
    public KPIDTO getKPIs() {
        return ipService.getKPIData();
    }


}