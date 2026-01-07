package intern.backend.service;

import intern.backend.dto.IPStatusDTO;
import intern.backend.dto.IPTrendDTO;
import intern.backend.dto.IPTypeDTO;
import intern.backend.repository.IPAssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartService {

    @Autowired
    private IPAssetRepository ipAssetRepository;


    public List<IPTypeDTO> getIPTypeTrend() {
        return ipAssetRepository.findIPTypeTrend();
    }

    public List<IPStatusDTO> getIPStatusDistribution() {
        return ipAssetRepository.findStatusDistribution();
    }

    public List<IPTrendDTO> getFilingsTrendByYear(int year) {
        return ipAssetRepository.findMonthlyFilingsByYear(year);
    }

    public List<Integer> getAvailableYears() {
        return ipAssetRepository.findDistinctYears();
    }


}
