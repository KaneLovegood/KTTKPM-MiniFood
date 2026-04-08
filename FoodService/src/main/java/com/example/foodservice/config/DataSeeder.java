package com.example.foodservice.config;


import com.example.foodservice.entity.Food;
import com.example.foodservice.repository.FoodRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    private final FoodRepository repo;

    public DataSeeder(FoodRepository repo) {
        this.repo = repo;
    }

    @PostConstruct
    public void init() {
        repo.save(new Food(null, "Cơm gà", 30000.0, "Ngon"));
        repo.save(new Food(null, "Phở bò", 40000.0, "Đậm vị"));
        repo.save(new Food(null, "Bún chả", 35000.0, "Hà Nội"));
    }
}