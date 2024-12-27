package ba.ibu.edu.budget_tracker.core.repository;
import ba.ibu.edu.budget_tracker.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
