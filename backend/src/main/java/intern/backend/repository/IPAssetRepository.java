package intern.backend.repository;

import intern.backend.dto.IPStatusDTO;
import intern.backend.dto.IPTrendDTO;
import intern.backend.dto.IPTypeDTO;
import intern.backend.entity.IPAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IPAssetRepository extends JpaRepository<IPAsset, Long> {

    // ================= BASIC QUERIES =================

    boolean existsByTitleIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
            String title, String country, String searchKeyword
    );

    List<IPAsset> findByTypeIgnoreCaseAndSearchKeywordIgnoreCase(
            String type, String searchKeyword
    );

    List<IPAsset> findByTypeIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
            String type, String country, String searchKeyword
    );

    List<IPAsset> findByCountryIgnoreCase(String country);

    // ================= MAP QUERY =================

    @Query("""
        SELECT ip FROM IPAsset ip
        WHERE
            UPPER(TRIM(ip.country)) = UPPER(TRIM(:country))
            OR (UPPER(:country) = 'IN' AND UPPER(ip.country) = 'INDIA')
            OR (UPPER(:country) = 'US' AND UPPER(ip.country) = 'UNITED STATES')
    """)
    List<IPAsset> findByCountryForMap(@Param("country") String country);

    /// ================= CHART QUERIES =================

    // ✅ Available years
    @Query("""
        SELECT DISTINCT EXTRACT(YEAR FROM ip.filingDate)
        FROM IPAsset ip
        WHERE ip.filingDate IS NOT NULL
        ORDER BY EXTRACT(YEAR FROM ip.filingDate) DESC
    """)
    List<Integer> findDistinctYears();

    // ✅ Monthly filings for selected year
    @Query("""
        SELECT new intern.backend.dto.IPTrendDTO(
            CAST(EXTRACT(MONTH FROM ip.filingDate) AS integer),
            COUNT(ip)
        )
        FROM IPAsset ip
        WHERE EXTRACT(YEAR FROM ip.filingDate) = :year
        GROUP BY EXTRACT(MONTH FROM ip.filingDate)
        ORDER BY EXTRACT(MONTH FROM ip.filingDate)
    """)
    List<IPTrendDTO> findMonthlyFilingsByYear(@Param("year") int year);

    // ✅ Patent vs Trademark
    @Query("""
        SELECT new intern.backend.dto.IPTypeDTO(
            ip.type,
            COUNT(ip)
        )
        FROM IPAsset ip
        GROUP BY ip.type
    """)
    List<IPTypeDTO> findIPTypeTrend();

    // ✅ Status distribution
    @Query("""
        SELECT new intern.backend.dto.IPStatusDTO(
            ip.status,
            COUNT(ip)
        )
        FROM IPAsset ip
        GROUP BY ip.status
    """)
    List<IPStatusDTO> findStatusDistribution();


    // ================= KPI =================

    long countByStatusIgnoreCase(String status);

    @Query("SELECT COUNT(DISTINCT ip.country) FROM IPAsset ip")
    long countDistinctCountries();

    // ✅ Only tracked IPs
    List<IPAsset> findByIsTrackedTrue();

    @Modifying
    @Transactional
    @Query("UPDATE IPAsset ip SET ip.isTracked = true WHERE ip.id = :id")
    int markAsTracked(@Param("id") Long id);



}
