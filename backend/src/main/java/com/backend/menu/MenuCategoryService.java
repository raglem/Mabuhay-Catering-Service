package com.backend.menu;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuCategoryService {
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuCategoryService(MenuCategoryRepository menuCategoryRepository){
        this.menuCategoryRepository = menuCategoryRepository;
    }

    public List<MenuCategory> getAll(){
        return menuCategoryRepository.findAll();
    }

    public MenuCategory insertMenuCategory(MenuCategory menuCategory){
        return menuCategoryRepository.save(menuCategory);
    }
}
