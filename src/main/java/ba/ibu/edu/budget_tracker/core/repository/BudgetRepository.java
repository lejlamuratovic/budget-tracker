package ba.ibu.edu.budget_tracker.core.repository;

import ba.ibu.edu.budget_tracker.core.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(Long userId);
}
