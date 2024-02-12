package com.example.WealthWave.authentication.dtos;
public record UserInfo(
        String firstName,
        String lastName,
        String email,
        boolean email_verified
) { }