package ba.ibu.edu.budget_tracker.core.repository;
import ba.ibu.edu.budget_tracker.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
