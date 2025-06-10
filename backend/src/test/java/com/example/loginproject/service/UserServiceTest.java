package com.example.loginproject.service;

import com.example.loginproject.dto.LoginRequestDto;
import com.example.loginproject.dto.SignupRequestDto;
import com.example.loginproject.entity.User;
import com.example.loginproject.exception.BusinessException;
import com.example.loginproject.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    private SignupRequestDto signupRequestDto;
    private LoginRequestDto loginRequestDto;
    private User user;

    @BeforeEach
    void setUp() {
        signupRequestDto = new SignupRequestDto();
        signupRequestDto.setEmail("test@example.com");
        signupRequestDto.setPassword("password123!");
        signupRequestDto.setName("Test User");

        loginRequestDto = new LoginRequestDto();
        loginRequestDto.setEmail("test@example.com");
        loginRequestDto.setPassword("password123!");

        user = User.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .name("Test User")
                .build();
    }

    @Test
    void signup_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.signup(signupRequestDto);

        assertNotNull(result);
        assertEquals(user.getEmail(), result.getEmail());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void signup_DuplicateEmail() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(BusinessException.class, () -> userService.signup(signupRequestDto));
    }

    @Test
    void login_Success() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        String token = userService.login(loginRequestDto);

        assertNotNull(token);
    }

    @Test
    void login_UserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(BusinessException.class, () -> userService.login(loginRequestDto));
    }

    @Test
    void login_WrongPassword() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        assertThrows(BusinessException.class, () -> userService.login(loginRequestDto));
    }
}
