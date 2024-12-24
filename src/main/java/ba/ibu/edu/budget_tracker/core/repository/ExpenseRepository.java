package ba.ibu.edu.budget_tracker.core.repository;

import ba.ibu.edu.budget_tracker.core.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUserId(Long userId);
}
