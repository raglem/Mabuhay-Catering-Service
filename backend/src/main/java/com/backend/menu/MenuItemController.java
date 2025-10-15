package com.backend.menu;

import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import com.backend.menu.dtos.MenuItemNestedDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping
    public ResponseEntity<MenuItemDetailDTO> updateMenuItem(@RequestBody MenuItemNestedDTO menuItem){
        MenuItemDetailDTO updatedMenuItem = menuItemService.updateMenuItem(menuItem);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/{id}/")
    public String deleteMenuItem(@PathVariable Integer id){
        menuItemService.deleteMenuItem(id);
        return "Menu item deletion successful";
    }
}
