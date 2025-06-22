package com.example.loginproject.service;

import com.example.loginproject.dto.LoginRequestDto;
import com.example.loginproject.dto.SignupRequestDto;
import com.example.loginproject.dto.FindIdRequestDto;
import com.example.loginproject.dto.ResetPasswordRequestDto;
import com.example.loginproject.entity.User;
import com.example.loginproject.entity.PasswordResetToken;
import com.example.loginproject.repository.UserRepository;
import com.example.loginproject.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.loginproject.security.JwtTokenProvider;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
import java.util.UUID;
import com.example.loginproject.exception.BusinessException;
import com.example.loginproject.exception.ErrorCode;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User signup(SignupRequestDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new BusinessException(ErrorCode.DUPLICATE_EMAIL);
        }
        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .emailVerified(false)
                .role(User.UserRole.ROLE_USER)
                .build();
        return userRepository.save(user);
    }

    public String login(LoginRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }
        return jwtTokenProvider.createToken(user.getEmail());
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public void findId(FindIdRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        
        if (!user.getName().equals(dto.getName())) {
            throw new RuntimeException("이름이 일치하지 않습니다.");
        }

        try {
            emailService.sendIdFindEmail(user.getEmail(), user.getEmail());
        } catch (Exception e) {
            throw new RuntimeException("이메일 발송에 실패했습니다.");
        }
    }

    @Transactional
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        // 기존 토큰 삭제
        passwordResetTokenRepository.deleteByEmail(email);

        // 새 토큰 생성
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(email, token);
        passwordResetTokenRepository.save(resetToken);

        try {
            emailService.sendPasswordResetEmail(email, token);
        } catch (Exception e) {
            throw new RuntimeException("이메일 발송에 실패했습니다.");
        }
    }

    @Transactional
    public void resetPassword(ResetPasswordRequestDto dto) {
        PasswordResetToken token = passwordResetTokenRepository
                .findByEmailAndTokenAndUsedFalse(dto.getEmail(), dto.getToken())
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_OTP));

        if (!token.isValid()) {
            throw new RuntimeException("만료된 토큰입니다.");
        }

        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);

        token.setUsed(true);
        passwordResetTokenRepository.save(token);
    }
}
