package com.backend.menu;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("menu-item")
public class MenuItemController {
    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public List<MenuItem> getMenuItems() {
        return menuItemService.getAll();
    }

    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem menuItem){
        return menuItemService.insertMenuItem(menuItem);
    }
}
