package com.example.WealthWave.expenseTracker.model;

import com.example.WealthWave.authentication.dtos.User;
import jakarta.validation.constraints.Past;

import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "expenses")
public class Expense {
    @Setter
    @Getter
    @Id
    private String id;
    private double amount;

    //Creating a reference to the user to track which expense belongs to which user
    @DBRef
    private User user;

    //Creating a reference to the category table. (i.e. similar to establishing a foreign key with a relation DB)
    @DBRef
    private Category category;

    @PastOrPresent(message = "The date cannot be in the future")
    private Date date;

    public Expense() {
    }
    public Expense(String id, double amount, Category category, Date date, User user) {
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id='" + id + '\'' +
                ", amount=" + amount +
                ", category=" + (category != null ? category.toString() : "null") +
                ", date=" + date +
                '}';
    }

}