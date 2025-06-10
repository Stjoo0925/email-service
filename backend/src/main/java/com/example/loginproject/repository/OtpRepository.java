package com.example.loginproject.repository;

import com.example.loginproject.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmailAndCodeAndUsedFalse(String email, String code);
    void deleteByEmail(String email);
} 