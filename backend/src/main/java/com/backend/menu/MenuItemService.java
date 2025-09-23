package com.backend.menu;

import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuItemService(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
    }

    public MenuItemDetailDTO getMenuItemById(Integer menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "MenuItem not found with id " + menuItemId
                ));
        return new MenuItemDetailDTO(menuItem);
    }

    public MenuItemDetailDTO insertMenuItem(MenuItemCreateDTO dto) {
        MenuCategory menuCategory = menuCategoryRepository.findById(dto.getMenuCategory())
                .orElseThrow(() -> new IllegalArgumentException("Invalid menu category id: " + dto.getMenuCategory()));

        MenuItem menuItem = new MenuItem();
        menuItem.setName(dto.getName());
        menuItem.setHalf_tray_price(dto.getHalf_tray_price());
        menuItem.setFull_tray_price(dto.getFull_tray_price());
        menuItem.setImage(dto.getImage());
        menuItem.setMenuCategory(menuCategory);

        MenuItem saved = menuItemRepository.save(menuItem);
        return new MenuItemDetailDTO(saved);
    }
    public void deleteMenuItem(Integer id){ menuItemRepository.deleteById(id); }
}