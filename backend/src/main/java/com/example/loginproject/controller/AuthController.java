package com.example.loginproject.controller;

import com.example.loginproject.dto.LoginRequestDto;
import com.example.loginproject.dto.SignupRequestDto;
import com.example.loginproject.entity.User;
import com.example.loginproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto dto) {
        User user = userService.signup(dto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {
        String token = userService.login(dto);
        return ResponseEntity.ok(token);
    }

    // 이메일 인증, 비밀번호 찾기 등은 추후 구현
}
