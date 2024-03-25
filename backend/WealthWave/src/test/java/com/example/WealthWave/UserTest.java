package com.example.WealthWave;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserTest {

    private User user;

    @BeforeEach
    public void init() {
        user = new User();
    }

    @Test
    public void testId() {
        // Arrange
        String expectedId = "testId";

        // Act
        user.setId(expectedId);
        String actualId = user.getId();

        // Assert
        assertEquals(expectedId, actualId);
    }

    @Test
    public void testUsername() {
       
        String expectedUsername = "testUsername";

        
        user.setUsername(expectedUsername);
        String actualUsername = user.getUsername();

        assertEquals(expectedUsername, actualUsername);
    }

    @Test
    public void testEmail() {
      
        String expectedEmail = "testEmail";

       
        user.setEmail(expectedEmail);
        String actualEmail = user.getEmail();

        
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void testPassword() {
        
        String expectedPassword = "testPassword";

        
        user.setPassword(expectedPassword);
        String actualPassword = user.getPassword();

        
        assertEquals(expectedPassword, actualPassword);
    }
}