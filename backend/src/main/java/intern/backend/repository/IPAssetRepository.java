package intern.backend.repository;

import intern.backend.entity.IPAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IPAssetRepository extends JpaRepository<IPAsset, Long> {

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


}
