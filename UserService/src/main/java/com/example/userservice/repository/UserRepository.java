package com.example.userservice.repository;

import com.example.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    // Spring Data JPA tự động sinh ra câu SQL dựa vào tên hàm
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
