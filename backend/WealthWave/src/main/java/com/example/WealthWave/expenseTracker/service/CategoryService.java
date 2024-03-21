package com.example.WealthWave.expenseTracker.service;

import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.repository.CategoryRepository;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private static final Logger logger = (Logger) LoggerFactory.getLogger(CategoryService.class);


    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    public Category updateCategory(String id, Category updatedCategory) throws CategoryNotFoundException{
        Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Category with id " + id + " not found"));
        category.setName(updatedCategory.getName());
        return categoryRepository.save(category);
    }

    public ResponseEntity<Void> deleteCategory(String id) throws ExpenseNotFoundException{
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Exception was not found"));
        categoryRepository.deleteById(id);
        return null;
    }

    public void deleteCategoryByName(String name) {
        if (name == null || name.isEmpty()) {
            logger.error("Category name cannot be null or empty");
            throw new IllegalArgumentException("Category name cannot be null or empty");
        }

        Optional<Category> category = Optional.ofNullable(categoryRepository.findByName(name));

        if (!category.isPresent()) {
            logger.error("Category with name '{}' not found", name);
            throw new CategoryNotFoundException("Category with name '" + name + "' not found");
        }

        categoryRepository.deleteByName(name);
        logger.info("Category with name '{}' deleted successfully");
    }

}
