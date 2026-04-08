package com.example.foodservice.controller;

import com.example.foodservice.entity.Food;
import com.example.foodservice.service.FoodService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin("*") // cho frontend gọi
public class FoodController {

    private final FoodService service;

    public FoodController(FoodService service) {
        this.service = service;
    }

    @GetMapping
    public List<Food> getAll() {
        return service.getAllFoods();
    }

    @PostMapping
    public Food create(@RequestBody Food food) {
        return service.createFood(food);
    }

    @PutMapping("/{id}")
    public Food update(@PathVariable Long id, @RequestBody Food food) {
        return service.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteFood(id);
    }
}
