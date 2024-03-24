package com.example.WealthWave.expenseTracker.repository;

import com.example.WealthWave.expenseTracker.model.Budget;
import com.example.WealthWave.expenseTracker.model.Expense;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Component
public interface BudgetRepository extends MongoRepository<Budget, String>{

    Budget findByUserId(String userId);
}