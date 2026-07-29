package intern.backend.repository;

import intern.backend.entity.TrackedAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrackedAssetRepository extends JpaRepository<TrackedAsset, Long> {

    // all assets THIS user tracked
    List<TrackedAsset> findByUserIdOrderByTrackedAtDesc(Integer userId);

    // check if already tracked (avoid duplicates)
    Optional<TrackedAsset> findByUserIdAndAssetId(Integer userId, Long assetId);
}