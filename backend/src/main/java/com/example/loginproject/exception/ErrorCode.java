package com.example.loginproject.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    // 인증 관련 에러
    INVALID_CREDENTIALS("AUTH-001", "이메일 또는 비밀번호가 올바르지 않습니다", HttpStatus.UNAUTHORIZED),
    EMAIL_NOT_VERIFIED("AUTH-002", "이메일 인증이 필요합니다", HttpStatus.FORBIDDEN),
    INVALID_TOKEN("AUTH-003", "유효하지 않은 토큰입니다", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN("AUTH-004", "만료된 토큰입니다", HttpStatus.UNAUTHORIZED),
    
    // 사용자 관련 에러
    USER_NOT_FOUND("USER-001", "사용자를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    DUPLICATE_EMAIL("USER-002", "이미 사용 중인 이메일입니다", HttpStatus.CONFLICT),
    INVALID_PASSWORD("USER-003", "비밀번호가 올바르지 않습니다", HttpStatus.BAD_REQUEST),
    
    // OTP 관련 에러
    INVALID_OTP("OTP-001", "유효하지 않은 인증번호입니다", HttpStatus.BAD_REQUEST),
    EXPIRED_OTP("OTP-002", "만료된 인증번호입니다", HttpStatus.BAD_REQUEST),
    OTP_NOT_FOUND("OTP-003", "인증번호를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    
    // 비밀번호 재설정 관련 에러
    INVALID_RESET_TOKEN("RESET-001", "유효하지 않은 재설정 토큰입니다", HttpStatus.BAD_REQUEST),
    EXPIRED_RESET_TOKEN("RESET-002", "만료된 재설정 토큰입니다", HttpStatus.BAD_REQUEST),
    
    // 서버 에러
    INTERNAL_SERVER_ERROR("SERVER-001", "서버 내부 오류가 발생했습니다", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus status;

    ErrorCode(String code, String message, HttpStatus status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }
}
