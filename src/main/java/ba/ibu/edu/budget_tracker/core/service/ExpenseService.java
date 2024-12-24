package ba.ibu.edu.budget_tracker.core.service;

import ba.ibu.edu.budget_tracker.core.model.Budget;
import ba.ibu.edu.budget_tracker.core.model.Category;
import ba.ibu.edu.budget_tracker.core.model.Expense;
import ba.ibu.edu.budget_tracker.core.model.User;
import ba.ibu.edu.budget_tracker.core.repository.BudgetRepository;
import ba.ibu.edu.budget_tracker.core.repository.CategoryRepository;
import ba.ibu.edu.budget_tracker.core.repository.ExpenseRepository;
import ba.ibu.edu.budget_tracker.core.repository.UserRepository;
import ba.ibu.edu.budget_tracker.rest.dto.ExpenseDto;
import ba.ibu.edu.budget_tracker.rest.dto.ExpenseRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final BudgetService budgetService;

    public ExpenseService(ExpenseRepository expenseRepository, UserService userService,
                          CategoryService categoryService, BudgetService budgetService) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.budgetService = budgetService;
    }

    public List<ExpenseDto> getAllExpenses() {
        return expenseRepository.findAll().stream()
                .map(expense -> new ExpenseDto(
                        expense.getId(),
                        expense.getTitle(),
                        expense.getAmount(),
                        expense.getDate(),
                        expense.getCategory().getId(),
                        expense.getUser().getId()
                ))
                .collect(Collectors.toList());
    }

    public Optional<ExpenseDto> getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .map(expense -> new ExpenseDto(
                        expense.getId(),
                        expense.getTitle(),
                        expense.getAmount(),
                        expense.getDate(),
                        expense.getCategory().getId(),
                        expense.getUser().getId()
                ));
    }

    public ExpenseDto createExpense(ExpenseRequest request) {
        User user = userService.getUserEntityById(request.getUserId());
        Category category = categoryService.getCategoryEntityById(request.getCategoryId());

        Expense expense = new Expense(request.getTitle(), request.getAmount(), request.getDate(), category, user);
        Expense savedExpense = expenseRepository.save(expense);

        return new ExpenseDto(
                savedExpense.getId(),
                savedExpense.getTitle(),
                savedExpense.getAmount(),
                savedExpense.getDate(),
                savedExpense.getCategory().getId(),
                savedExpense.getUser().getId()
        );
    }

    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new IllegalArgumentException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }
}
