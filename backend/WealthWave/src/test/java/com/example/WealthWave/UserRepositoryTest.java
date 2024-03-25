package com.example.WealthWave;

import com.example.WealthWave.authentication.dtos.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByEmail() {
      
        User user = new User("testUsername", "testEmail@test.com", "testPassword");
        userRepository.save(user);

        
        User foundUser = userRepository.findByEmail("testEmail@test.com");

        
        assertNotNull(foundUser);
        assertEquals("testUsername", foundUser.getUsername());
    }

    @Test
    public void testFindByUsername() {
        
        User user = new User("testUsername", "testEmail@test.com", "testPassword");
        userRepository.save(user);

        
        User foundUser = userRepository.findByUsername("testUsername");

       
        assertNotNull(foundUser);
        assertEquals("testEmail@test.com", foundUser.getEmail());
    }
}