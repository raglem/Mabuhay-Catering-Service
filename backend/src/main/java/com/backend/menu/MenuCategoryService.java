package com.backend.menu;

import com.backend.menu.dtos.MenuCategoryCreateDTO;
import com.backend.menu.dtos.MenuCategoryDetailDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MenuCategoryService {
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuCategoryService(MenuCategoryRepository menuCategoryRepository){
        this.menuCategoryRepository = menuCategoryRepository;
    }

    public List<MenuCategoryDetailDTO> getAll(){
        List<MenuCategory> categories = menuCategoryRepository.findAll();
        categories.sort(Comparator.comparing(MenuCategory::getOrder));
        List<MenuCategoryDetailDTO> categoriesDTO = new ArrayList<>();
        for (MenuCategory menuCategory : categories) {
            MenuCategoryDetailDTO menuCategoryDTO = new MenuCategoryDetailDTO(menuCategory);
            categoriesDTO.add(menuCategoryDTO);
        }
        return categoriesDTO;
    }

    public MenuCategoryDetailDTO insertMenuCategory(MenuCategoryCreateDTO menuCategoryCreateDTO){
        MenuCategory menuCategory = new MenuCategory();

        menuCategory.setName(menuCategoryCreateDTO.getName());
        menuCategory.setOrder(menuCategoryCreateDTO.getOrder());

        MenuCategory saved = menuCategoryRepository.save(menuCategory);
        return new MenuCategoryDetailDTO(saved);
    }

    public void deleteMenuCategory(Integer id){
        menuCategoryRepository.deleteById(id);
    }
}
