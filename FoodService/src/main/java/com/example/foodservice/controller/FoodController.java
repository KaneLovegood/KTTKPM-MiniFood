package com.example.foodservice.controller;

import com.example.foodservice.entity.Food;
import com.example.foodservice.service.FoodService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
@CrossOrigin("*")
public class FoodController {

    private static final Logger log = LoggerFactory.getLogger(FoodController.class);

    private final FoodService service;

    public FoodController(FoodService service) {
        this.service = service;
    }

    @GetMapping
    public List<Food> getAll() {
        log.info("[API] GET /foods");
        return service.getAllFoods();
    }

    @GetMapping("/{id}")
    public Food getById(@PathVariable Long id) {
        log.info("[API] GET /foods/{}", id);
        return service.getFoodById(id);
    }

    @PostMapping
    public Food create(@RequestBody Food food) {
        log.info("[API] POST /foods");
        return service.createFood(food);
    }

    @PutMapping("/{id}")
    public Food update(@PathVariable Long id, @RequestBody Food food) {
        log.info("[API] PUT /foods/{}", id);
        return service.updateFood(id, food);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        log.info("[API] DELETE /foods/{}", id);
        service.deleteFood(id);
        return "Deleted successfully";
    }
}
