package com.example.WealthWave.authentication.repository;

import com.example.WealthWave.authentication.dtos.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
@Repository
@Component
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
