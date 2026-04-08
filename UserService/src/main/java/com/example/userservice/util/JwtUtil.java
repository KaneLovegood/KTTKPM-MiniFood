package com.example.userservice.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Chuỗi bí mật dùng để ký token (Tuyệt đối không để lộ trong thực tế)
    // Phải dài ít nhất 256-bit (khoảng 32 ký tự)
    private final String SECRET_KEY = "DayLaMotChuoiBiMatRatDaiVaKhoDoanChoDuAnMiniFood123456!!!";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Thời gian sống của Token: 1 ngày (tính bằng milliseconds)
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)                 // Thông tin chính: username
                .claim("role", role)                  // Thêm thông tin phân quyền
                .setIssuedAt(new Date())              // Ngày tạo
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Ngày hết hạn
                .signWith(key, SignatureAlgorithm.HS256) // Ký bằng thuật toán HS256
                .compact();                           // Đóng gói thành chuỗi
    }
}
