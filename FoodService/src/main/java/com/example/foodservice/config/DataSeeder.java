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

        // 🍚 Cơm
        repo.save(new Food(null, "Cơm gà xối mỡ", 35000.0, "Giòn, đậm vị"));
        repo.save(new Food(null, "Cơm sườn nướng", 40000.0, "Thơm, mềm"));
        repo.save(new Food(null, "Cơm bò lúc lắc", 50000.0, "Bò mềm, ngon"));

        // 🍜 Món nước
        repo.save(new Food(null, "Phở bò", 45000.0, "Nước dùng đậm đà"));
        repo.save(new Food(null, "Bún bò Huế", 50000.0, "Cay nhẹ"));
        repo.save(new Food(null, "Hủ tiếu Nam Vang", 42000.0, "Thanh ngọt"));

        // 🥖 Ăn nhanh
        repo.save(new Food(null, "Bánh mì thịt", 20000.0, "Tiện lợi"));
        repo.save(new Food(null, "Hamburger bò", 45000.0, "Fast food"));
        repo.save(new Food(null, "Hotdog", 25000.0, "Ăn vặt"));

        // 🍗 Đồ chiên
        repo.save(new Food(null, "Gà rán", 30000.0, "Giòn rụm"));
        repo.save(new Food(null, "Khoai tây chiên", 20000.0, "Giòn"));
        repo.save(new Food(null, "Cánh gà chiên nước mắm", 35000.0, "Đậm đà"));

        // 🥤 Nước uống
        repo.save(new Food(null, "Trà sữa trân châu", 30000.0, "Ngọt"));
        repo.save(new Food(null, "Trà đào", 28000.0, "Mát"));
        repo.save(new Food(null, "Cà phê sữa", 25000.0, "Đậm"));

        // 🍰 Tráng miệng
        repo.save(new Food(null, "Bánh flan", 15000.0, "Ngọt nhẹ"));
        repo.save(new Food(null, "Chè thái", 25000.0, "Nhiều topping"));
        repo.save(new Food(null, "Kem vani", 20000.0, "Mát lạnh"));

        System.out.println("🔥 Seeded sample food data successfully!");
    }
}