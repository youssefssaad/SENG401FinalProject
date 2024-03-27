package com.example.WealthWave.authentication.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import java.io.*;
import java.util.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;
    private long jwtExpirationInMs; // used for

    // Create JWT token for regular sign-in (Not google-sign, that one is creating it already in the AuthController)
    public String createToken(String username) {
        Claims claims = Jwts.claims().setSubject(username).build();

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        SecretKey key = Keys.hmacShaKeyFor(jwtSecretKey.getBytes());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            System.out.println("What is the token that is soooooo wrong here? " + token);
            Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Expired or invalid JWT token: " + e.getMessage());
        }
    }

    // Get the username from the token if needed we have it*
    public String getUsername(String token) {
        return Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecretKey.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getBody()
                .getSubject();
    }

    // Getting authentication from the token (not needed but keep)
    public Authentication getAuthentication(String token) {
        String username = getUsername(token);
        return new UsernamePasswordAuthenticationToken(username, "", Collections.emptyList());
    }

}
