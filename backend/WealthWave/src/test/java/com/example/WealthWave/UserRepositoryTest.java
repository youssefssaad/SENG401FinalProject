package com.example.WealthWave;

import com.example.WealthWave.authentication.dtos.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import com.example.WealthWave.authentication.repository.UserRepository;
import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByEmail() {
        // Arrange
        User user = new User("testUsername", "testEmail@test.com", "testPassword");
        userRepository.save(user);

        // Act
        User foundUser = userRepository.findByEmail("testEmail@test.com");

        // Assert
        assertNotNull(foundUser);
        assertEquals("testUsername", foundUser.getUsername());
    }

    @Test
    public void testFindByUsername() {
        // Arrange
        User user = new User("testUsername", "testEmail@test.com", "testPassword");
        userRepository.save(user);

        // Act
        User foundUser = userRepository.findByUsername("testUsername");

        // Assert
        assertNotNull(foundUser);
        assertEquals("testEmail@test.com", foundUser.getEmail());
    }
}