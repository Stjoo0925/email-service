package com.example.loginproject.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "아이디 찾기 요청 DTO")
public class FindIdRequestDto {
    @Schema(description = "사용자 이름", example = "홍길동")
    private String name;

    @Schema(description = "사용자 이메일", example = "user@example.com")
    private String email;
} 