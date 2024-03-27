package com.example.WealthWave.expenseTracker.controller;

import com.example.WealthWave.authentication.config.SecurityConfig;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.repository.UserRepository;
import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.service.ExpenseService;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RestControllerAdvice
@CrossOrigin
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private UserRepository userRepository;

    public ExpenseController(ExpenseService expenseService, UserRepository userRepository) {
        this.expenseService = expenseService;
        this.userRepository = userRepository;
    }

    @PostMapping("/add/{categoryId}")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, @PathVariable String categoryId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String userId = authentication.getName();

            Optional<User> userOptional = userRepository.findById(userId);

            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            User user = userOptional.get();

            expense.setUser(user);
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

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.ok().build();
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable String id, @RequestBody Expense expense) {
        try {
            return ResponseEntity.ok(expenseService.updateExistingExpense(id, expense));
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/category/{categoryId}/usage")
    public ResponseEntity<Boolean> checkCategoryUsage(@PathVariable String categoryId) {
        boolean isUsed = expenseService.isCategoryUsed(categoryId);
        return ResponseEntity.ok(isUsed);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUser(@PathVariable String userId) {
        List<Expense> expenses = expenseService.getExpensesForUser(userId);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/export/{userId}")
    public ResponseEntity<InputStreamResource> export(@PathVariable String userId) throws IOException {
        String fileName = "expenses.xlsx";
        ByteArrayInputStream inputStream = expenseService.getUserDataDownloaded(userId);
        InputStreamResource response = new InputStreamResource(inputStream);

        ResponseEntity<InputStreamResource> responseEntity = ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+fileName)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(response);
        return responseEntity;
    }

}
