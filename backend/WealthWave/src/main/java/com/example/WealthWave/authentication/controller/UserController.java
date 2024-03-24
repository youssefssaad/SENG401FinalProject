package com.example.WealthWave.authentication.controller;

import com.example.WealthWave.authentication.config.JwtTokenProvider;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.Console;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RestControllerAdvice
public class UserController {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> UserLogin(@RequestBody Map<String, String> body){

        String username = "";
        String password = "";

        //Grab user login credentials from request
        for (var entry : body.entrySet()) {

            if(entry.getKey().equals("username")){
                username = entry.getValue();
            }

            if(entry.getKey().equals("password")){
                password = entry.getValue();
            }
        }
        User user = userRepository.findByUsername(username);

        //Check's if user was found based on username and if the correct corresponding password was given
        if (user == null || !Objects.equals(user.getPassword(), password)){
            return new ResponseEntity<>("Invalid Login Credentials!", HttpStatus.BAD_REQUEST);
        }
        else{
            String token = jwtTokenProvider.createToken(user.getId().toString());

            Map<String, String> tokenResponse = new HashMap<>();
            tokenResponse.put("token", token);
            tokenResponse.put("userId", user.getId());
            tokenResponse.put("id", user.getId().toString());
            tokenResponse.put("name", user.getUsername());

            return ResponseEntity.ok(tokenResponse);
        }
    }

    @PostMapping("/users/create")
    public ResponseEntity<String> createUsers(@RequestBody Map<String, String> body){

        //Creates a user and initializes its values, also checks if the given username is unique
        User newUser = new User();
        for (var entry : body.entrySet()) {

            if(entry.getKey().equals("username"))
            {
                if(userRepository.findByUsername(entry.getValue()) != null){
                    return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);
                }
                newUser.setUsername(entry.getValue());
            }
            if(entry.getKey().equals("password")){
                newUser.setPassword(entry.getValue());
            }
            if(entry.getKey().equals("email")){
                newUser.setEmail(entry.getValue());
            }
        }
        //Tries to save user to DB
        try{
            userRepository.save(newUser);
            return new ResponseEntity<>("User Created!", HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>("Invalid Sign-up Credentials!", HttpStatus.BAD_REQUEST);
        }
    }
}