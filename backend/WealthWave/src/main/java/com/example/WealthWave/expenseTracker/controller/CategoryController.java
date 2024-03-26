package com.example.WealthWave.expenseTracker.controller;

import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        if (category.getName() == null || category.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Category name is required");
        }
        return ResponseEntity.ok(categoryService.addCategory(category));
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id).orElseThrow(() -> new CategoryNotFoundException("The category with id " + id + "was not found "));
    }

    @PutMapping("/update/{id}")
    public Category updateCategory(@PathVariable String id, @RequestBody Category updatedCategory) {
        return categoryService.updateCategory(id, updatedCategory);
    }

    @PutMapping("/updateByName/{name}")
    public Category updateCategoryByName(@PathVariable String name, @RequestBody Category updatedCategory) {
        return categoryService.updateCategoryByName(name, updatedCategory);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok().build();
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/removeByName/{categoryName}")
    public void deleteCategoryByName(@PathVariable String categoryName) {
        categoryService.deleteCategoryByName(categoryName);
    }


}
