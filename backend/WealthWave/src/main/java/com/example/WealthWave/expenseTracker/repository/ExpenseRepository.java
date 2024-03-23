package com.example.WealthWave.expenseTracker.repository;

import com.example.WealthWave.expenseTracker.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Component
public interface ExpenseRepository extends MongoRepository<Expense, String>{
    Optional<Expense> findById(String id);
    Optional<Expense> findFirstByCategoryId(String categoryId);
    List<Expense> findByUserId(String userId);

}