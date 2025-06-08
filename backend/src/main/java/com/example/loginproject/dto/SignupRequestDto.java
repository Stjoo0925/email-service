package com.example.loginproject.dto;

import lombok.Data;

@Data
public class SignupRequestDto {
    private String email;
    private String password;
    private String name;
}
