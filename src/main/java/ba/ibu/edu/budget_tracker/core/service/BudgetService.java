package ba.ibu.edu.budget_tracker.core.service;

import ba.ibu.edu.budget_tracker.core.model.Budget;
import ba.ibu.edu.budget_tracker.core.model.User;
import ba.ibu.edu.budget_tracker.core.repository.BudgetRepository;
import ba.ibu.edu.budget_tracker.core.repository.UserRepository;
import ba.ibu.edu.budget_tracker.rest.dto.BudgetDto;
import ba.ibu.edu.budget_tracker.rest.dto.BudgetRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final UserService userService;

    public BudgetService(BudgetRepository budgetRepository, UserService userService) {
        this.budgetRepository = budgetRepository;
        this.userService = userService;
    }

    public List<BudgetDto> getAllBudgets() {
        return budgetRepository.findAll().stream()
                .map(budget -> new BudgetDto(budget.getId(), budget.getAmount(), budget.getMonth(), budget.getUser().getId()))
                .collect(Collectors.toList());
    }

    public List<BudgetDto> getBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserId(userId).stream()
                .map(budget -> new BudgetDto(budget.getId(), budget.getAmount(), budget.getMonth(), budget.getUser().getId()))
                .collect(Collectors.toList());
    }

    public Budget getBudgetEntityById(Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Budget not found with id: " + id));
    }

    public BudgetDto createBudget(BudgetRequest request) {
        User user = userService.getUserEntityById(request.getUserId());
        Budget budget = new Budget(request.getAmount(), request.getMonth(), user);
        Budget savedBudget = budgetRepository.save(budget);
        return new BudgetDto(savedBudget.getId(), savedBudget.getAmount(), savedBudget.getMonth(), savedBudget.getUser().getId());
    }

    public BudgetDto updateBudget(Long id, BudgetRequest request) {
        return budgetRepository.findById(id)
                .map(budget -> {
                    User user = userService.getUserEntityById(request.getUserId());
                    budget.setAmount(request.getAmount());
                    budget.setMonth(request.getMonth());
                    budget.setUser(user);
                    Budget updatedBudget = budgetRepository.save(budget);
                    return new BudgetDto(updatedBudget.getId(), updatedBudget.getAmount(), updatedBudget.getMonth(), updatedBudget.getUser().getId());
                })
                .orElseThrow(() -> new IllegalArgumentException("Budget not found with id: " + id));
    }

    public void deleteBudget(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new IllegalArgumentException("Budget not found with id: " + id);
        }
        budgetRepository.deleteById(id);
    }
}
