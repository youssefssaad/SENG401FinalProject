package com.example.WealthWave.expenseTracker.repository;

import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findByName(String name);
    List<Expense> findCategoryById(String categoryId);
    void deleteByName(String name);
}
