package com.example.loginproject.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;
    
    @Value("${spring.mail.username}")
    private String mailUsername;

    public void sendEmail(String to, String subject, String text) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(mailUsername); // 발신자 이메일
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true); // HTML 형식 지원
        
        emailSender.send(message);
    }

    public void sendTestEmail(String to) throws MessagingException {
        String subject = "테스트 이메일";
        String text = """
            <h1>테스트 이메일입니다</h1>
            <p>이 이메일은 테스트 목적으로 발송되었습니다.</p>
            <p>감사합니다.</p>
            """;
        
        sendEmail(to, subject, text);
    }

    public void sendOtpEmail(String to, String otp) throws MessagingException {
        String content = String.format("""
            안녕하세요.
            
            이메일 인증 코드는 [%s] 입니다.
            
            이 인증 코드는 5분간 유효합니다.
            """, otp);
        sendEmail(to, "이메일 인증 코드", content);
    }

    public void sendPasswordResetEmail(String to, String resetToken) throws MessagingException {
        String content = String.format("""
            안녕하세요.
            
            비밀번호 재설정을 요청하셨습니다.
            아래 링크를 클릭하여 비밀번호를 재설정해주세요:
            
            http://localhost:3000/reset-password?token=%s
            
            이 링크는 30분간 유효합니다.
            """, resetToken);
        sendEmail(to, "비밀번호 재설정", content);
    }

    public void sendIdFindEmail(String to, String userId) throws MessagingException {
        String content = String.format("""
            안녕하세요.
            
            요청하신 아이디는 [%s] 입니다.
            
            보안을 위해 로그인 후 비밀번호를 변경하시는 것을 권장드립니다.
            """, userId);
        sendEmail(to, "아이디 찾기 결과", content);
    }
} 