package com.example.loginproject.controller;

import com.example.loginproject.dto.LoginRequestDto;
import com.example.loginproject.dto.SignupRequestDto;
import com.example.loginproject.dto.FindIdRequestDto;
import com.example.loginproject.dto.ResetPasswordRequestDto;
import com.example.loginproject.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "인증", description = "회원가입, 로그인, 아이디/비밀번호 찾기 API")
public class AuthController {
    private final UserService userService;

    @Operation(summary = "회원가입", description = "이메일, 비밀번호, 이름을 입력하여 회원가입을 진행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto dto) {
        com.example.loginproject.entity.User user = userService.signup(dto);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "로그인", description = "이메일과 비밀번호로 로그인하여 JWT 토큰을 발급받습니다.")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {
        String token = userService.login(dto);
        return ResponseEntity.ok(java.util.Map.of("token", token));
    }

    @Operation(summary = "아이디 찾기", description = "이름과 이메일을 입력하여 등록된 이메일(아이디)을 확인합니다.")
    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody FindIdRequestDto dto) {
        userService.findId(dto);
        return ResponseEntity.ok("아이디 찾기 이메일이 발송되었습니다.");
    }

    @Operation(summary = "비밀번호 재설정 요청", description = "이메일을 입력하여 비밀번호 재설정 링크를 발송합니다.")
    @PostMapping("/reset-password/request")
    public ResponseEntity<?> requestPasswordReset(@RequestParam String email) {
        userService.requestPasswordReset(email);
        return ResponseEntity.ok("비밀번호 재설정 이메일이 발송되었습니다.");
    }

    @Operation(summary = "비밀번호 재설정", description = "이메일, 토큰, 새 비밀번호를 입력하여 비밀번호를 재설정합니다.")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequestDto dto) {
        userService.resetPassword(dto);
        return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
    }

    @Operation(summary = "내 정보", description = "현재 로그인한 사용자의 정보를 조회합니다.")
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        String email = userDetails.getUsername();
        com.example.loginproject.entity.User user = userService.getUserByEmail(email);
        com.example.loginproject.dto.UserInfoDto dto = com.example.loginproject.dto.UserInfoDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .emailVerified(user.isEmailVerified())
                .createdAt(user.getCreatedAt())
                .build();
        return ResponseEntity.ok(dto);
    }

    // 이메일 인증, 비밀번호 찾기 등은 추후 구현
}
