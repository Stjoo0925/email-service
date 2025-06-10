package com.example.loginproject.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "비밀번호 재설정 요청 DTO")
public class ResetPasswordRequestDto {
    @Schema(description = "사용자 이메일", example = "user@example.com")
    private String email;

    @Schema(description = "비밀번호 재설정 토큰", example = "123e4567-e89b-12d3-a456-426614174000")
    private String token;

    @Schema(description = "새 비밀번호", example = "newPassword123!")
    private String newPassword;
} 