package intern.backend.repository;

import intern.backend.entity.IPAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPAssetRepository extends JpaRepository<IPAsset, Long> {

    // ================= EXISTING METHODS (UNCHANGED) =================

    boolean existsByTitleIgnoreCase(String title);

    // Find by type (Patent / Trademark)
    List<IPAsset> findByTypeIgnoreCase(String type);

    // Find by type + country
    List<IPAsset> findByTypeIgnoreCaseAndCountryIgnoreCase(String type, String country);

    // Keyword search in title
    List<IPAsset> findByTitleContainingIgnoreCase(String keyword);

    List<IPAsset> findByTypeIgnoreCaseAndSearchKeywordIgnoreCase(
            String type,
            String searchKeyword
    );

    List<IPAsset> findByTypeIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
            String type,
            String country,
            String searchKeyword
    );

    boolean existsByTitleIgnoreCaseAndCountryIgnoreCaseAndSearchKeywordIgnoreCase(
            String title,
            String country,
            String searchKeyword
    );

    List<IPAsset> findByCountryIgnoreCase(String country);

    // ================= NEW METHOD (FOR MAP ONLY) =================

    /**
     * Used ONLY for map-based country selection.
     * Supports ISO codes (IN, US) and full names (India, United States).
     * Does NOT affect existing search functionality.
     */
    @Query("""
        SELECT ip FROM IPAsset ip
        WHERE
            UPPER(TRIM(ip.country)) = UPPER(TRIM(:country))
            OR (UPPER(:country) = 'IN' AND UPPER(TRIM(ip.country)) = 'INDIA')
            OR (UPPER(:country) = 'US' AND UPPER(TRIM(ip.country)) = 'UNITED STATES')
    """)
    List<IPAsset> findByCountryForMap(@Param("country") String country);
}
