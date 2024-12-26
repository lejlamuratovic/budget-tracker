package ba.ibu.edu.budget_tracker.core.service;

import ba.ibu.edu.budget_tracker.core.model.Category;
import ba.ibu.edu.budget_tracker.core.repository.CategoryRepository;
import ba.ibu.edu.budget_tracker.rest.dto.CategoryDto;
import ba.ibu.edu.budget_tracker.rest.dto.CategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> new CategoryDto(category.getId(), category.getName()))
                .collect(Collectors.toList());
    }

    public Optional<CategoryRequest> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(category -> new CategoryRequest(category.getName()));
    }

    public Category getCategoryEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));
    }

    public CategoryRequest createCategory(CategoryRequest request) {
        Category category = new Category(request.getName());
        Category savedCategory = categoryRepository.save(category);
        return new CategoryRequest(savedCategory.getName());
    }

    public CategoryRequest updateCategory(Long id, CategoryRequest request) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(request.getName());
                    Category updatedCategory = categoryRepository.save(category);
                    return new CategoryRequest(updatedCategory.getName());
                })
                .orElseThrow(() -> new IllegalArgumentException("Category not found with id: " + id));
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalArgumentException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
