package com.example.WealthWave.authentication.controller;

import com.example.WealthWave.authentication.dtos.User;
import com.example.WealthWave.authentication.dtos.UserSessionDto;
import com.example.WealthWave.authentication.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.bind.annotation.*;
import com.example.WealthWave.authentication.dtos.TokenDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.Date;

@RestController
@RestControllerAdvice
public class AuthController {
    private final UserRepository userRepository;
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @PostMapping("/api/auth/verify-token")
    public ResponseEntity<?> googleAuthentication(@RequestBody TokenDto tokenDto) {
        JsonFactory jsonFactory = new GsonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
        try {
            GoogleIdToken idToken = verifier.verify(tokenDto.getToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                User user = userRepository.findByEmail(email);
                if (user == null) {
                    // Create a new user if they don't exist
                    user = new User();
                    user.setEmail(email);
                    user.setUsername(name);
                } else {
                    // Update existing user info if needed
                    user.setUsername(name);
                }
                userRepository.save(user);
                String userSessionToken = generateUserSessionToken(user);

                //Returning this to the front end (as json for now, will fix after frontend is working)
                return ResponseEntity.ok(new UserSessionDto(email, name, userSessionToken));

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google ID token.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to verify Google ID token." + e.getMessage());
        }

    }

    //After user is authenticated, we need to main their authenticated state for further requests.
    //A JWT session token will help us with this
    //Keep private as it will only be used in this class
    private String generateUserSessionToken(User user) {
        long expirationTime = System.currentTimeMillis() + 3600000; // 1 hour expiration
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setExpiration(new Date(expirationTime))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey) // Sign the JWT with your secret key
                .compact();
    }
}