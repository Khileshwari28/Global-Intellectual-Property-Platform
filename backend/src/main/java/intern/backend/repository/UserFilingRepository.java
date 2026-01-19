package intern.backend.repository;

import intern.backend.entity.UserFiling;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFilingRepository extends JpaRepository<UserFiling, Long> {
    // USER
    List<UserFiling> findByUserIdOrderByCreatedAtDesc(Integer userId);

    // ADMIN
    List<UserFiling> findAllByOrderByCreatedAtDesc();
}
