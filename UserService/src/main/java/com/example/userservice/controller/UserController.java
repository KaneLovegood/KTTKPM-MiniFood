package com.example.userservice.controller;

import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Tiêm công cụ mã hóa

    @Autowired
    private JwtUtil jwtUtil; // Tiêm công cụ tạo Token

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username đã tồn tại!");
        }

        user.setRole("USER");
        // MÃ HÓA mật khẩu trước khi lưu xuống DB
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> userOpt = userRepository.findByUsername(loginUser.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // SO SÁNH mật khẩu người dùng gửi lên với mật khẩu đã mã hóa trong DB
            if (passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {

                // Đăng nhập thành công -> Sinh Token
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

                // Trả về Token dưới dạng JSON
                return ResponseEntity.ok(Collections.singletonMap("token", token));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu!");
    }
}