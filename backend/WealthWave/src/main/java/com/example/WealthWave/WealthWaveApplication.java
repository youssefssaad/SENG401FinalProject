package com.example.WealthWave;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class WealthWaveApplication {
	public static void main(String[] args) {
		SpringApplication.run(WealthWaveApplication.class, args);
	}
}