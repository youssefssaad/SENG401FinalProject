package com.example.WealthWave.authentication.dtos;

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
        // Arrange
        String expectedUsername = "testUsername";

        // Act
        user.setUsername(expectedUsername);
        String actualUsername = user.getUsername();

        // Assert
        assertEquals(expectedUsername, actualUsername);
    }

    @Test
    public void testEmail() {
        // Arrange
        String expectedEmail = "testEmail";

        // Act
        user.setEmail(expectedEmail);
        String actualEmail = user.getEmail();

        // Assert
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void testPassword() {
        // Arrange
        String expectedPassword = "testPassword";

        // Act
        user.setPassword(expectedPassword);
        String actualPassword = user.getPassword();

        // Assert
        assertEquals(expectedPassword, actualPassword);
    }
}