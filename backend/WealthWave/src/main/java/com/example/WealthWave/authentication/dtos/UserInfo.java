package com.example.WealthWave.authentication.dtos;
public record UserInfo(
        String sub,
        String name,
        String lastName,
        String email,
        boolean email_verified
) { }