package com.example.WealthWave;

import com.example.WealthWave.authentication.config.JwtTokenFilter;
import com.example.WealthWave.authentication.config.JwtTokenProvider;
import com.example.WealthWave.authentication.config.SecurityConfig;
import com.example.WealthWave.authentication.controller.AuthController;
import com.example.WealthWave.authentication.controller.UserController;
import com.example.WealthWave.authentication.dtos.TokenDto;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.dtos.UserSessionDto;
import com.example.WealthWave.authentication.repository.UserRepository;
import com.example.WealthWave.expenseTracker.controller.BudgetController;
import com.example.WealthWave.expenseTracker.controller.CategoryController;
import com.example.WealthWave.expenseTracker.controller.ExpenseController;
import com.example.WealthWave.expenseTracker.controller.BudgetController;
import com.example.WealthWave.expenseTracker.exceptions.ExpenseNotFoundException;
import com.example.WealthWave.expenseTracker.model.Budget;
import com.example.WealthWave.expenseTracker.model.Category;
import com.example.WealthWave.expenseTracker.model.Expense;
import com.example.WealthWave.expenseTracker.repository.BudgetRepository;
import com.example.WealthWave.expenseTracker.repository.CategoryRepository;
import com.example.WealthWave.expenseTracker.repository.ExpenseRepository;
import com.example.WealthWave.expenseTracker.service.CategoryService;
import com.example.WealthWave.expenseTracker.service.ExpenseService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.ExceptionHandler;

@SpringBootApplication
@EnableMongoRepositories
@ComponentScan(basePackageClasses = BudgetController.class)
@ComponentScan(basePackageClasses = Budget.class)
@ComponentScan(basePackageClasses = BudgetRepository.class)
@ComponentScan(basePackageClasses = AuthController.class)
@ComponentScan(basePackageClasses = UserController.class)
@ComponentScan(basePackageClasses = SecurityConfig.class)
@ComponentScan(basePackageClasses = TokenDto.class)
@ComponentScan(basePackageClasses = UserRepository.class)
@ComponentScan(basePackageClasses = User.class)
@ComponentScan(basePackageClasses = UserSessionDto.class)
@ComponentScan(basePackageClasses = ExpenseController.class)
@ComponentScan(basePackageClasses = ExpenseService.class)
@ComponentScan(basePackageClasses = Expense.class)
@ComponentScan(basePackageClasses = ExpenseNotFoundException.class)
@ComponentScan(basePackageClasses = ExpenseRepository.class)
@ComponentScan(basePackageClasses = CategoryRepository.class)
@ComponentScan(basePackageClasses = CategoryController.class)
@ComponentScan(basePackageClasses = Category.class)
@ComponentScan(basePackageClasses = CategoryService.class)
@ComponentScan(basePackageClasses = JwtTokenFilter.class)
@ComponentScan(basePackageClasses = JwtTokenProvider.class)

public class WealthWaveApplication {
	public static void main(String[] args) {
		SpringApplication.run(WealthWaveApplication.class, args);
	}

}
