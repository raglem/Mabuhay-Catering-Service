package com.backend.menu;

import com.backend.menu.dtos.MenuCategoryCreateDTO;
import com.backend.menu.dtos.MenuCategoryDetailDTO;
import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("menu")
public class MenuCategoryController {
    private final MenuCategoryService menuCategoryService;

    public MenuCategoryController(MenuCategoryService menuCategoryService) {
        this.menuCategoryService = menuCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<MenuCategoryDetailDTO>> getMenuCategories() {
        List<MenuCategoryDetailDTO> categories = menuCategoryService.getAll();
        return ResponseEntity.ok(categories); // 200 OK
    }

    @PostMapping
    public ResponseEntity<MenuCategoryDetailDTO> addMenuCategory(@RequestBody MenuCategoryCreateDTO menuCategory) {
        MenuCategoryDetailDTO saved = menuCategoryService.insertMenuCategory(menuCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        menuCategoryService.deleteMenuCategory(id);
        return ResponseEntity.noContent().build();
    }
}
