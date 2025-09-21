package com.backend.menu;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {
    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> getAll() { return menuItemRepository.findAll(); }
    public MenuItem insertMenuItem(MenuItem menu_item) { return menuItemRepository.save(menu_item); }
    public void updateMenuItem(MenuItem menu_item) { menuItemRepository.save(menu_item); }
    public void deleteMenuItem(Integer id){ menuItemRepository.deleteById(id); }
}