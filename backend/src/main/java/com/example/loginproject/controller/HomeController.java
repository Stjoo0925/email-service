package com.example.loginproject.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "홈", description = "기본 API 엔드포인트")
public class HomeController {
    @Operation(summary = "홈", description = "서비스의 기본 엔드포인트입니다.")
    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the Email Service Backend!");
    }

    @Operation(summary = "헬스 체크", description = "서비스의 상태를 확인합니다.")
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Service is up and running!");
    }
}
