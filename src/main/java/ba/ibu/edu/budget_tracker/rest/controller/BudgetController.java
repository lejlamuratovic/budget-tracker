package ba.ibu.edu.budget_tracker.rest.controller;

import ba.ibu.edu.budget_tracker.core.service.BudgetService;
import ba.ibu.edu.budget_tracker.rest.dto.BudgetDto;
import ba.ibu.edu.budget_tracker.rest.dto.BudgetRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final BudgetService budgetService;

    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping
    public ResponseEntity<List<BudgetDto>> getAllBudgets() {
        List<BudgetDto> budgets = budgetService.getAllBudgets();
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDto>> getBudgetsByUserId(@PathVariable Long userId) {
        List<BudgetDto> budgets = budgetService.getBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }

    @PostMapping
    public ResponseEntity<BudgetDto> createBudget(@RequestBody BudgetRequest request) {
        BudgetDto createdBudget = budgetService.createBudget(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBudget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetDto> updateBudget(@PathVariable Long id, @RequestBody BudgetRequest request) {
        try {
            BudgetDto updatedBudget = budgetService.updateBudget(id, request);
            return ResponseEntity.ok(updatedBudget);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        try {
            budgetService.deleteBudget(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
