package intern.backend.controller;

import intern.backend.dto.*;
import intern.backend.service.IPService;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ip")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://global-ip-portal.netlify.app"
})
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


    //========Tracked Patents =====
    @PostMapping("/track/{id}")
    public void trackIP(@PathVariable Long id) {
        ipService.trackIP(id);
    }

    // user clicks "track" on a search result
    @PostMapping("/tracked/{assetId}")
    public void trackAsset(@PathVariable Long assetId, @RequestParam Integer userId) {
        ipService.trackAssetForUser(userId, assetId);
    }

    // bottom section: only what this user tracked
    @GetMapping("/tracked/{userId}")
    public List<LegalStatusDTO> getTracked(@PathVariable Integer userId) {
        return ipService.getTrackedAssetsForUser(userId);
    }




}