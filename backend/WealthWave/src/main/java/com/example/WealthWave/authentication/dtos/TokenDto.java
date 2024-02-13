package com.example.WealthWave.authentication.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TokenDto {
    @JsonProperty("tokenId")
    private String tokenId;
    public TokenDto() {
    }
    public TokenDto(String tokenId) {
        this.tokenId = tokenId;
    }
    public String getToken() {
        return tokenId;
    }
    public void setToken(String tokenId) {
        this.tokenId = tokenId;
    }
}
