package com.example.WealthWave;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;

public class JwtTokenProviderTest {

    @InjectMocks
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateToken() {
        // Arrange
        String username = "test";

        // Act
        String token = jwtTokenProvider.createToken(username);

        // Assert
        assertNotNull(token);
    }

    @Test
    public void testValidateToken() {
        // Arrange
        String username = "test";
        String token = jwtTokenProvider.createToken(username);

        // Act
        boolean isValid = jwtTokenProvider.validateToken(token);

        // Assert
        assertTrue(isValid);
    }

    @Test
    public void testGetUsername() {
        // Arrange
        String username = "test";
        String token = jwtTokenProvider.createToken(username);

        // Act
        String result = jwtTokenProvider.getUsername(token);

        // Assert
        assertEquals(username, result);
    }

    @Test
    public void testGetAuthentication() {
        // Arrange
        String username = "test";
        String token = jwtTokenProvider.createToken(username);

        // Act
        Authentication auth = jwtTokenProvider.getAuthentication(token);

        // Assert
        assertEquals(username, auth.getName());
    }
}