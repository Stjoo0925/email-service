package com.example.loginproject.service;

import com.example.loginproject.dto.LoginRequestDto;
import com.example.loginproject.dto.SignupRequestDto;
import com.example.loginproject.entity.User;
import com.example.loginproject.jwt.JwtTokenProvider;
import com.example.loginproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User signup(SignupRequestDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }
        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .name(dto.getName())
                .build();
        return userRepository.save(user);
    }

    public String login(LoginRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("가입되지 않은 이메일입니다."));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        return jwtTokenProvider.createToken(user.getEmail());
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    // 회원가입, 비밀번호 찾기 등 추가 메서드 구현 예정
}
