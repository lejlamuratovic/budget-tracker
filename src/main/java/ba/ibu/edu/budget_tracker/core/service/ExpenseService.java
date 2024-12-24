package ba.ibu.edu.budget_tracker.core.service;

import ba.ibu.edu.budget_tracker.core.model.Budget;
import ba.ibu.edu.budget_tracker.core.model.Category;
import ba.ibu.edu.budget_tracker.core.model.Expense;
import ba.ibu.edu.budget_tracker.core.model.User;
import ba.ibu.edu.budget_tracker.core.repository.BudgetRepository;
import ba.ibu.edu.budget_tracker.core.repository.ExpenseRepository;
import ba.ibu.edu.budget_tracker.rest.dto.ExpenseDto;
import ba.ibu.edu.budget_tracker.rest.dto.ExpenseRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Calendar;
import java.util.Date;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final BudgetService budgetService;
    private final BudgetRepository budgetRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserService userService,
                          CategoryService categoryService, BudgetService budgetService,
                          BudgetRepository budgetRepository) {
        this.expenseRepository = expenseRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.budgetService = budgetService;
        this.budgetRepository = budgetRepository;
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

    @Transactional
    public ExpenseDto createExpense(ExpenseRequest request) {
        User user = userService.getUserEntityById(request.getUserId());
        Category category = categoryService.getCategoryEntityById(request.getCategoryId());

        // Extract month and year from the date
        Integer month = extractMonth(request.getDate());
        Integer year = extractYear(request.getDate());

        // Find the associated budget
        Budget budget = budgetService.getBudgetByUserAndMonthAndYear(request.getUserId(), month, year);

        if (budget == null) {
            throw new IllegalArgumentException("No budget found for the specified user, month, and year.");
        }

        // Adjust remaining amount in the budget (can go negative)
        budget.setRemaining(budget.getRemaining() - request.getAmount());
        budgetRepository.save(budget);

        // Create and save the expense
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

    @Transactional
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Expense not found with id: " + id));

        // Extract month and year from the expense's date
        Integer month = extractMonth(expense.getDate());
        Integer year = extractYear(expense.getDate());

        // Find the associated budget
        Budget budget = budgetService.getBudgetByUserAndMonthAndYear(expense.getUser().getId(), month, year);

        if (budget == null) {
            throw new IllegalArgumentException("No budget found for the specified user, month, and year.");
        }

        // Adjust remaining amount in the budget
        budget.setRemaining(budget.getRemaining() + expense.getAmount());
        budgetRepository.save(budget);

        // Delete the expense
        expenseRepository.deleteById(id);
    }

    @Transactional
    public ExpenseDto updateExpense(Long id, ExpenseRequest request) {
        return expenseRepository.findById(id)
                .map(expense -> {
                    // Extract the original month and year from the existing expense's date
                    Integer originalMonth = extractMonth(expense.getDate());
                    Integer originalYear = extractYear(expense.getDate());

                    // Find the associated budget
                    Budget budget = budgetService.getBudgetByUserAndMonthAndYear(expense.getUser().getId(), originalMonth, originalYear);

                    if (budget == null) {
                        throw new IllegalArgumentException("No budget found for the specified user, month, and year.");
                    }

                    // Adjust the remaining amount
                    budget.setRemaining(budget.getRemaining() + expense.getAmount() - request.getAmount());
                    budgetRepository.save(budget);

                    // Update the expense
                    Category category = categoryService.getCategoryEntityById(request.getCategoryId());
                    expense.setTitle(request.getTitle());
                    expense.setAmount(request.getAmount());
                    expense.setDate(request.getDate());
                    expense.setCategory(category);
                    expenseRepository.save(expense);

                    return new ExpenseDto(
                            expense.getId(),
                            expense.getTitle(),
                            expense.getAmount(),
                            expense.getDate(),
                            expense.getCategory().getId(),
                            expense.getUser().getId()
                    );
                })
                .orElseThrow(() -> new IllegalArgumentException("Expense not found with id: " + id));
    }

    // Helper methods to extract month and year from a Date
    private Integer extractMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH) + 1; // Add 1 because January = 0
    }

    private Integer extractYear(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
}
