package com.example.WealthWave;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TokenDtoTest {

    private TokenDto tokenDto;

    @BeforeEach
    public void init() {
        tokenDto = new TokenDto();
    }

    @Test
    public void testGetToken() {
        
        String expectedToken = "testToken";
        tokenDto.setToken(expectedToken);

        
        String actualToken = tokenDto.getToken();

        
        assertEquals(expectedToken, actualToken);
    }

    @Test
    public void testSetToken() {
        
        String expectedToken = "testToken";

        
        tokenDto.setToken(expectedToken);
        String actualToken = tokenDto.getToken();

        assertEquals(expectedToken, actualToken);
    }
}