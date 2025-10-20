package com.backend.menu;

import com.backend.menu.dtos.MenuItemCreateDTO;
import com.backend.menu.dtos.MenuItemDetailDTO;
import com.backend.menu.dtos.MenuItemNestedDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.Map;

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
    public ResponseEntity<String> deleteMenuItem(@PathVariable Integer id){
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok("Menu item deletion successful");
    }

    @PostMapping("/{id}/image/")
    public ResponseEntity<?> uploadImageForMenuItem(
            @PathVariable Integer id,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            String imageUrl = menuItemService.updateImageForMenuItem(id, image);
            return ResponseEntity.ok(Map.of(
                    "message", "Image upload successful",
                    "imageUrl", imageUrl));

        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
        catch (RuntimeException | IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}/image/")
    public ResponseEntity<?> deleteImageForMenuItem(@PathVariable Integer id){
        try {
            menuItemService.deleteImageForMenuItem(id);
            return ResponseEntity.ok(Map.of(
                    "message", "Image deletion successful"
            ));
        }
        catch (S3Exception e){
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
