package com.backend.menu;

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
    public List<MenuCategory> getMenuCategories() {
        return menuCategoryService.getAll();
    }

    @PostMapping
    public MenuCategory addMenuCategory(@RequestBody MenuCategory menuCategory){
        return menuCategoryService.insertMenuCategory(menuCategory);
    }
}
