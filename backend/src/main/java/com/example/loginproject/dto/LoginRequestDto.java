package com.example.loginproject.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "로그인 요청 DTO")
public class LoginRequestDto {
    @Schema(description = "사용자 이메일", example = "user@example.com")
    private String email;

    @Schema(description = "사용자 비밀번호", example = "password123!")
    private String password;
}
