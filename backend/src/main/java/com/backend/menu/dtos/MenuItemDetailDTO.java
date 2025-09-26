package com.backend.menu.dtos;

import com.backend.menu.MenuCategory;
import com.backend.menu.MenuItem;

public class MenuItemDetailDTO {
    private Integer id;
    private String name;
    private Double half_tray_price;
    private Double full_tray_price;
    private String image;
    private MenuCategorySimpleDTO menuCategory;

    public MenuItemDetailDTO(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.name = menuItem.getName();
        this.half_tray_price = menuItem.getFull_tray_price();
        this.full_tray_price = menuItem.getFull_tray_price();
        this.image = menuItem.getImage();
        this.menuCategory = new MenuCategorySimpleDTO(menuItem.getMenuCategory());
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getHalf_tray_price() {
        return half_tray_price;
    }

    public Double getFull_tray_price() {
        return full_tray_price;
    }

    public String getImage() {
        return image;
    }

    public MenuCategorySimpleDTO getMenuCategory() {
        return menuCategory;
    }
}
