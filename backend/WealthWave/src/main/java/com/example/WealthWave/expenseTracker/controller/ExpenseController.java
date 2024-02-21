package com.example.WealthWave.expenseTracker.controller;

import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RestControllerAdvice
@CrossOrigin
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/add/{categoryId}")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, @PathVariable String categoryId) {
        try {
            Expense savedExpense = expenseService.addExpense(expense, categoryId);
            return ResponseEntity.ok(savedExpense);
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(expenseService.getExpenseById(id));
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@PathVariable String categoryId) {
        try {
            return ResponseEntity.ok( expenseService.getExpensesByCategory(categoryId));
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.ok().build(); // Simplified to return just the status code
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable String id, @RequestBody Expense expense) {
        try {
            return ResponseEntity.ok(expenseService.updateExistingExpense(id, expense));
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
