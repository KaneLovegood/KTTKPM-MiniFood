package com.example.foodservice.service;

import com.example.foodservice.entity.Food;
import com.example.foodservice.repository.FoodRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class FoodService {

    private static final Logger log = LoggerFactory.getLogger(FoodService.class);

    private final FoodRepository repo;

    public FoodService(FoodRepository repo) {
        this.repo = repo;
    }

    public List<Food> getAllFoods() {
        log.info("[GET ALL] Fetching all foods");
        return repo.findAll();
    }

    public Food getFoodById(Long id) {
        log.info("[GET] Fetching food with id={}", id);

        return repo.findById(id)
                .orElseThrow(() -> {
                    log.error("[GET] Food not found with id={}", id);
                    return new RuntimeException("Food not found");
                });
    }

    public Food createFood(Food food) {
        log.info("[CREATE] Creating food: {}", food.getName());

        Food saved = repo.save(food);

        log.info("[CREATE] Created food with id={}", saved.getId());
        return saved;
    }

    public Food updateFood(Long id, Food food) {
        log.info("[UPDATE] Updating food id={}", id);

        Food existing = repo.findById(id)
                .orElseThrow(() -> {
                    log.error("[UPDATE] Food not found id={}", id);
                    return new RuntimeException("Food not found");
                });

        existing.setName(food.getName());
        existing.setPrice(food.getPrice());
        existing.setDescription(food.getDescription());

        Food updated = repo.save(existing);

        log.info("[UPDATE] Updated food id={}", id);
        return updated;
    }

    public void deleteFood(Long id) {
        log.info("[DELETE] Deleting food id={}", id);

        repo.delete(id);

        log.info("[DELETE] Deleted food id={}", id);
    }
}