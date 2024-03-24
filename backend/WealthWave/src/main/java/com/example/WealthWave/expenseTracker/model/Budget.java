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


@Document(collection = "budget")
public class Budget {

    @Setter
    @Getter
    @Id
    private String id;
    private int budget;
    @DBRef
    private User user;

    public Budget() {
    }
    public Budget(String id, int budget, User user) {
        this.id = id;
        this.budget = budget;
        this.user = user;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}
}
