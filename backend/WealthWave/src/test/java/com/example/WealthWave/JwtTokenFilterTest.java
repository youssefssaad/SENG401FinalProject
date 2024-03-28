package com.example.WealthWave;
import com.example.WealthWave.authentication.config.JwtTokenFilter;
import com.example.WealthWave.authentication.config.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.*;

public class JwtTokenFilterTest {

    @InjectMocks
    private JwtTokenFilter jwtTokenFilter;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Mock
    private Authentication authentication;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testDoFilterInternal() throws Exception {
        // Arrange
        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(jwtTokenProvider.validateToken("token")).thenReturn(true);
        when(jwtTokenProvider.getAuthentication("token")).thenReturn(authentication);

        // Act
        jwtTokenFilter.doFilterPublic(request, response, filterChain);

        // Assert
        verify(jwtTokenProvider).validateToken("token");
        verify(jwtTokenProvider).getAuthentication("token");
        verify(filterChain).doFilter(request, response);
        assertEquals(authentication, SecurityContextHolder.getContext().getAuthentication());
    }
}