package com.example.WealthWave;

import com.example.WealthWave.authentication.dtos.TokenDto;
import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.dtos.UserSessionDto;
import com.example.WealthWave.authentication.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GoogleIdTokenVerifier googleIdTokenVerifier;

    @Mock
    private GoogleIdToken googleIdToken;

    @Mock
    private GoogleIdToken.Payload payload;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGoogleAuthentication() throws Exception {
        
        TokenDto tokenDto = new TokenDto();
        tokenDto.setToken("token");

        User user = new User();
        user.setEmail("test@example.com");
        user.setUsername("test");

        when(googleIdTokenVerifier.verify(anyString())).thenReturn(googleIdToken);
        when(googleIdToken.getPayload()).thenReturn(payload);
        when(payload.getEmail()).thenReturn("test@example.com");
        when(payload.get("name")).thenReturn("test");
        when(userRepository.findByEmail(anyString())).thenReturn(user);

       
        ResponseEntity<?> response = authController.googleAuthentication(tokenDto);

        assertEquals(200, response.getStatusCodeValue());
        UserSessionDto userSessionDto = (UserSessionDto) response.getBody();
        assertEquals("test@example.com", userSessionDto.getEmail());
        assertEquals("test", userSessionDto.getName());
    }
}