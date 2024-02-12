package com.example.WealthWave.authentication.controller;

import com.example.WealthWave.authentication.dtos.MessageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class PublicController {
    @GetMapping("/public/messages")
    public ResponseEntity<MessageDto> publicMessages() {
        return ResponseEntity.ok(new MessageDto("public content"));
    }
}