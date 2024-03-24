package com.example.WealthWave.authentication.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSessionDto {

    @JsonProperty("email")
    private String email;
    @JsonProperty("name")
    private String name;
    @JsonProperty("sessionToken")
    private String sessionToken;

    @JsonProperty("id")
    private String id;

    public UserSessionDto(String email, String name, String id, String sessionToken) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.sessionToken = sessionToken;

    }

    public UserSessionDto(String email, String name) {
        this.email = email;
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSessionToken() {
        return sessionToken;
    }
    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }
}

