package com.backend.menu;

import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("menu-item/")
public class MenuItemController {
    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping("/{id}/")
    public ResponseEntity<MenuItemDetailDTO> getMenuItems(@PathVariable Integer id) {
        MenuItemDetailDTO menuItem = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }

    @PostMapping
    public ResponseEntity<MenuItemDetailDTO> addMenuItem(@RequestBody MenuItemCreateDTO menuItem){
        MenuItemDetailDTO saved = menuItemService.insertMenuItem(menuItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
