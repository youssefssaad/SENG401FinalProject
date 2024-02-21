package com.example.WealthWave.expenseTracker.service;

import com.example.WealthWave.expenseTracker.exceptions.CategoryNotFoundException;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

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

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

}
