package com.example.WealthWave;

import com.example.WealthWave.authentication.config.SecurityConfig;
//import com.example.WealthWave.authentication.controller.AuthController;
import com.example.WealthWave.authentication.controller.UserController;
import com.example.WealthWave.authentication.dtos.TokenDto;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.dtos.UserSessionDto;
import com.example.WealthWave.authentication.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.ExceptionHandler;

@SpringBootApplication
@EnableMongoRepositories
//@ComponentScan(basePackageClasses = AuthController.class)
@ComponentScan(basePackageClasses = UserController.class)
@ComponentScan(basePackageClasses = SecurityConfig.class)
@ComponentScan(basePackageClasses = TokenDto.class)
@ComponentScan(basePackageClasses = UserRepository.class)
@ComponentScan(basePackageClasses = User.class)
@ComponentScan(basePackageClasses = UserSessionDto.class)
public class WealthWaveApplication {
	public static void main(String[] args) {
		SpringApplication.run(WealthWaveApplication.class, args);
	}

}
