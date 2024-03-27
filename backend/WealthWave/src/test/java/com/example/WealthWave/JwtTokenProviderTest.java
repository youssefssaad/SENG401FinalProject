package com.example.WealthWave;
import com.example.WealthWave.authentication.config.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import java.util.Collections;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;


import static org.junit.jupiter.api.Assertions.*;
import org.springframework.test.util.ReflectionTestUtils;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts; // Import the Jwts class

public class JwtTokenProviderTest {
    @InjectMocks
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecretKey", "ThisIsASecretKeyForJwtToken12345678");
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpirationInMs", 3600000*5); // 1 hour
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
    String returnedUsername = jwtTokenProvider.getUsername(token);

    // Assert
    assertEquals(username, returnedUsername);
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