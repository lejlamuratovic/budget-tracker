package ba.edu.ibu.budgettracker.core.repository;

import ba.edu.ibu.budgettracker.core.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(Long userId);

    Optional<Budget> findByUserIdAndMonthAndYear(Long userId, Integer month, Integer year);
}
