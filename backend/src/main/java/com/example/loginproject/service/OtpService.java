package com.example.loginproject.service;

import com.example.loginproject.entity.Otp;
import com.example.loginproject.entity.Otp.OtpType;
import com.example.loginproject.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;

    @Transactional
    public void generateAndSendOtp(String email) throws Exception {
        // 기존 OTP 삭제
        otpRepository.deleteByEmail(email);

        // 새로운 OTP 생성
        String otpCode = generateOtp();
        Otp otp = new Otp(email, otpCode, OtpType.EMAIL_VERIFICATION);
        otpRepository.save(otp);

        // 이메일 발송
        emailService.sendOtpEmail(email, otpCode);
    }

    @Transactional
    public boolean verifyOtp(String email, String code) {
        return otpRepository.findByEmailAndCodeAndUsedFalse(email, code)
                .map(otp -> {
                    if (otp.isValid()) {
                        otp.setUsed(true);
                        otpRepository.save(otp);
                        return true;
                    }
                    return false;
                })
                .orElse(false);
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
} 