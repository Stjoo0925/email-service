package com.example.loginproject.controller;

import com.example.loginproject.service.EmailService;
import com.example.loginproject.service.OtpService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@Tag(name = "이메일", description = "이메일 발송 및 OTP 인증 API")
public class EmailController {
    private final EmailService emailService;
    private final OtpService otpService;

    @Operation(summary = "테스트 이메일 발송", description = "지정된 이메일 주소로 테스트 이메일을 발송합니다.")
    @PostMapping("/test")
    public ResponseEntity<String> sendTestEmail(@RequestParam String to) {
        try {
            emailService.sendTestEmail(to);
            return ResponseEntity.ok("이메일이 성공적으로 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.badRequest().body("이메일 발송에 실패했습니다: " + e.getMessage());
        }
    }

    @Operation(summary = "OTP 이메일 발송", description = "지정된 이메일 주소로 OTP 인증 코드를 발송합니다.")
    @PostMapping("/otp")
    public ResponseEntity<String> sendOtpEmail(@RequestParam String to) {
        try {
            otpService.generateAndSendOtp(to);
            return ResponseEntity.ok("OTP 이메일이 성공적으로 발송되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("OTP 이메일 발송 실패: " + e.getMessage());
        }
    }

    @Operation(summary = "OTP 검증", description = "이메일과 OTP 코드를 검증합니다.")
    @PostMapping("/otp/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String code) {
        boolean isValid = otpService.verifyOtp(email, code);
        if (isValid) {
            return ResponseEntity.ok("OTP가 성공적으로 검증되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("유효하지 않은 OTP입니다.");
        }
    }
} 