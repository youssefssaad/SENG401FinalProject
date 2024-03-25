package com.example.WealthWave.authentication.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testSecurityConfig() throws Exception {
        // Test an endpoint that should be accessible without authentication
        mockMvc.perform(get("/public/test"))
                .andExpect(status().isOk());

        // Test an endpoint that should require authentication
        mockMvc.perform(get("/api/protected/test"))
                .andExpect(status().isUnauthorized());
    }
}