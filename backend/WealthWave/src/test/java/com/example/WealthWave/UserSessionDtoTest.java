package com.example.WealthWave;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserSessionDtoTest {

    private UserSessionDto userSessionDto;

    @BeforeEach
    public void init() {
        userSessionDto = new UserSessionDto();
    }

    @Test
    public void testEmail() {
        // Arrange
        String expectedEmail = "testEmail";

        // Act
        userSessionDto.setEmail(expectedEmail);
        String actualEmail = userSessionDto.getEmail();

        // Assert
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    public void testName() {
        // Arrange
        String expectedName = "testName";

        // Act
        userSessionDto.setName(expectedName);
        String actualName = userSessionDto.getName();

        // Assert
        assertEquals(expectedName, actualName);
    }

    @Test
    public void testId() {
        // Arrange
        String expectedId = "testId";

        // Act
        userSessionDto.setId(expectedId);
        String actualId = userSessionDto.getId();

        // Assert
        assertEquals(expectedId, actualId);
    }

    @Test
    public void testSessionToken() {
        // Arrange
        String expectedSessionToken = "testSessionToken";

        // Act
        userSessionDto.setSessionToken(expectedSessionToken);
        String actualSessionToken = userSessionDto.getSessionToken();

        // Assert
        assertEquals(expectedSessionToken, actualSessionToken);
    }
}