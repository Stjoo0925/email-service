package com.example.loginproject.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.nio.charset.StandardCharsets;

@Component
public class JwtTokenProvider {
    @Value("${JWT_SECRET:default_secret}")
    private String secretKey;

    public String createToken(String email) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        Key key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24시간
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
