package com.example.foodservice.repository;

import com.example.foodservice.entity.Food;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class FoodRepository {

    private final Map<Long, Food> db = new HashMap<>();
    private Long idCounter = 1L;

    public List<Food> findAll() {
        return new ArrayList<>(db.values());
    }

    public Food save(Food food) {
        if (food.getId() == null) {
            food.setId(idCounter++);
        }
        db.put(food.getId(), food);
        return food;
    }

    public Optional<Food> findById(Long id) {
        return Optional.ofNullable(db.get(id));
    }

    public void delete(Long id) {
        db.remove(id);
    }
}
