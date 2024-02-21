package com.example.WealthWave.expenseTracker.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {
    @Id
    @Getter
    @Setter
    private String id;

    @Setter
    @Getter
    private String name;

    @Getter
    @Setter
    private String description;


}
