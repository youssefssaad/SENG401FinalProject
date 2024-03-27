package com.example.WealthWave;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.example.WealthWave.authentication.dtos.TokenDto;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TokenDtoTest {

    private TokenDto tokenDto;

    @BeforeEach
    public void init() {
        tokenDto = new TokenDto();
    }

    @Test
    public void testGetToken() {
        // Arrange
        String expectedToken = "testToken";
        tokenDto.setToken(expectedToken);

        // Act
        String actualToken = tokenDto.getToken();

        // Assert
        assertEquals(expectedToken, actualToken);
    }

    @Test
    public void testSetToken() {
        // Arrange
        String expectedToken = "testToken";

        // Act
        tokenDto.setToken(expectedToken);
        String actualToken = tokenDto.getToken();

        // Assert
        assertEquals(expectedToken, actualToken);
    }
}