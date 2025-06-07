package com.example.loginproject.controller;

import com.example.loginproject.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        try {
            return jwtTokenProvider.createToken(
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(email, password)
                    ).getName()
            );
        } catch (AuthenticationException e) {
            throw new RuntimeException("로그인 실패");
        }
    }
}
