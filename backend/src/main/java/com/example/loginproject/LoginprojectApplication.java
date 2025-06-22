package com.example.loginproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class LoginprojectApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoginprojectApplication.class, args);
    }
}
