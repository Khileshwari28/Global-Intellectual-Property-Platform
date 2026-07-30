package intern.backend.repository;

import intern.backend.entity.SupportMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportMessageRepository extends JpaRepository<SupportMessage, Long> {

    List<SupportMessage> findByUserIdOrderByCreatedAtDesc(Integer userId);

    List<SupportMessage> findAllByOrderByCreatedAtDesc();

    long countByStatusIgnoreCase(String status);
}