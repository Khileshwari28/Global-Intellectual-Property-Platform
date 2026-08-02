package intern.backend.controller;

import intern.backend.dto.IPResultDTO;
import intern.backend.service.IPMapService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/map")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://global-ip-portal.netlify.app"
})
public class IPMapController {

    private final IPMapService service;

    public IPMapController(IPMapService service) {
        this.service = service;
    }


    @GetMapping("/assets")
    public List<IPResultDTO> getAssetsByCountry(
            @RequestParam String country
    ) {
        return service.getAssetsByCountry(country);
    }
}
