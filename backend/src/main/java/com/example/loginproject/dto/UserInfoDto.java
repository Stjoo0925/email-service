package com.example.loginproject.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class UserInfoDto {
    private Long id;
    private String email;
    private String name;
    private boolean emailVerified;
    private LocalDateTime createdAt;
} 