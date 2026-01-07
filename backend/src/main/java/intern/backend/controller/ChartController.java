package intern.backend.controller;

import intern.backend.dto.IPStatusDTO;
import intern.backend.dto.IPTrendDTO;
import intern.backend.dto.IPTypeDTO;
import intern.backend.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/charts")
public class ChartController {

    @Autowired
    private ChartService chartService;


    @GetMapping("/ip-type-trend")
    public List<IPTypeDTO> getIPTypeTrend() {
        return chartService.getIPTypeTrend();
    }

    @GetMapping("/ip-status-distribution")
    public List<IPStatusDTO> getStatusDistribution() {
        return chartService.getIPStatusDistribution();
    }

    @GetMapping("/ip-filings-trend/{year}")
    public List<IPTrendDTO> getFilingsTrendByYear(@PathVariable int year) {
        return chartService.getFilingsTrendByYear(year);
    }

    @GetMapping("/ip-filings-years")
    public List<Integer> getAvailableYears() {
        return chartService.getAvailableYears();
    }

}


