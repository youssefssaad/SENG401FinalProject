package com.example.WealthWave.expenseTracker.service;

import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.repository.CategoryRepository;
import com.example.WealthWave.expenseTracker.repository.ExpenseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    private ExpenseRepository expenseRepository;
    private CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    //checking that a category exists before we add it
    public Expense addExpense(Expense expense, String categoryId) throws CategoryNotFoundException {
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("Category was not found"));
        expense.setCategory(category);
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpenseById(String id) throws ExpenseNotFoundException{
        return expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Expense was not found"));
    }

    //return all expenses by categoryId
    public List<Expense> getExpensesByCategory(String categoryId) throws CategoryNotFoundException {
        Optional<Category> categoryOptional = categoryRepository.findById((categoryId));
        if(!categoryOptional.isPresent()){
            throw new CategoryNotFoundException("Category was not found");
        }

        return categoryRepository.findCategoryById(categoryId);
    }

    public ResponseEntity<Void> deleteExpense(String id) throws ExpenseNotFoundException {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Exception was not found"));
        expenseRepository.delete(expense);
        return null;
    }

    public Expense updateExistingExpense(String id, Expense expenseInformation) {
        Expense updateExpense = expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Exception was not found"));

        updateExpense.setAmount(expenseInformation.getAmount());
        updateExpense.setDate(expenseInformation.getDate());

        // Update category if it's changed
        if (!updateExpense.getCategory().getId().equals(expenseInformation.getCategory().getId())) {
            Optional<Category> category = categoryRepository.findById((expenseInformation.getCategory().getId()));
            if (!category.isPresent()) {
                throw new RuntimeException("Category not found");
            }
            updateExpense.setCategory(category.get());
        }

        return expenseRepository.save(updateExpense);

    }
}


