package com.example.foodservice.service;

import com.example.foodservice.entity.Food;
import com.example.foodservice.repository.FoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    private final FoodRepository repo;

    public FoodService(FoodRepository repo) {
        this.repo = repo;
    }

    public List<Food> getAllFoods() {
        return repo.findAll();
    }

    public Food createFood(Food food) {
        return repo.save(food);
    }

    public Food updateFood(Long id, Food food) {
        Food existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        existing.setName(food.getName());
        existing.setPrice(food.getPrice());
        existing.setDescription(food.getDescription());

        return repo.save(existing);
    }

    public void deleteFood(Long id) {
        repo.delete(id);
    }
}