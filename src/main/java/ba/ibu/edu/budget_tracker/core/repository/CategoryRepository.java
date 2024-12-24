package ba.ibu.edu.budget_tracker.core.repository;

import ba.ibu.edu.budget_tracker.core.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
}
