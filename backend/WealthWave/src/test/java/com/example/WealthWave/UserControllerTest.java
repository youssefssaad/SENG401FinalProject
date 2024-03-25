package com.example.WealthWave.authentication.controller;

import com.example.WealthWave.authentication.config.JwtTokenProvider;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        User user = new User();
        user.setUsername("test");
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));

        // Act
        List<User> users = userController.getAllUsers();

        // Assert
        assertEquals(1, users.size());
        assertEquals("test", users.get(0).getUsername());
    }

    @Test
    public void testUserLogin() {
        // Arrange
        User user = new User();
        user.setUsername("test");
        user.setPassword("password");
        Map<String, String> body = new HashMap<>();
        body.put("username", "test");
        body.put("password", "password");
        when(userRepository.findByUsername("test")).thenReturn(user);
        when(jwtTokenProvider.createToken(any())).thenReturn("token");

        // Act
        ResponseEntity<?> response = userController.UserLogin(body);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Map);
        assertEquals("token", ((Map) response.getBody()).get("token"));
    }

    @Test
    public void testCreateUsers() {
        // Arrange
        User user = new User();
        user.setUsername("test");
        user.setPassword("password");
        Map<String, String> body = new HashMap<>();
        body.put("username", "test");
        body.put("password", "password");
        when(userRepository.findByUsername("test")).thenReturn(null);
        when(userRepository.save(any())).thenReturn(user);

        // Act
        ResponseEntity<String> response = userController.createUsers(body);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User Created!", response.getBody());
    }
}