package com.example.WealthWave.expenseTracker.controller;


import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.repository.UserRepository;
import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.model.Budget;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.repository.BudgetRepository;
import com.example.WealthWave.expenseTracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RestControllerAdvice
@CrossOrigin
@RequestMapping("/api/budget")
public class BudgetController {

    private UserRepository userRepository;
    private BudgetRepository budgetRepository;
    public BudgetController(UserRepository userRepository, BudgetRepository budgetRepository) {
        this.userRepository = userRepository;
        this.budgetRepository = budgetRepository;
    }
    @PostMapping
    public ResponseEntity<?> addBudget(@RequestBody String body) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();

            Optional<User> userOptional = userRepository.findById(userId);

            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            User user = userOptional.get();

            // Checking if budget already exists
            Budget budgetOptional = budgetRepository.findByUserId(userId);
            Budget budget = new Budget();

            // If it doesn't exist create a new budget
            // Else update old budget
            if (budgetOptional == null) {
                budget.setUser(user);
                budget.setBudget(Integer.parseInt(body));
            } else{
                budget = budgetOptional;
                budget.setBudget(Integer.parseInt(body));
            }

            budgetRepository.save(budget);
            return ResponseEntity.ok(body);
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Budget> getBudgetByUser(@PathVariable String userId) {

        Budget budget = budgetRepository.findByUserId(userId);
        return ResponseEntity.ok(budget);
    }
}
