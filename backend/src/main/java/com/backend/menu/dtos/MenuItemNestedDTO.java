package com.backend.menu.dtos;

import com.backend.menu.MenuItem;
import com.backend.menu.MenuItemVisibility;

public class MenuItemNestedDTO {
    private Integer id;
    private String name;
    private MenuItemVisibility visibility;
    private Double half_tray_price;
    private Double full_tray_price;
    private String image;
    private Integer menuCategory;

    public MenuItemNestedDTO() {}

    public MenuItemNestedDTO(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.name = menuItem.getName();
        this.visibility = menuItem.getVisibility();
        this.half_tray_price = menuItem.getHalf_tray_price();
        this.full_tray_price = menuItem.getFull_tray_price();
        this.image = menuItem.getImage();
        this.menuCategory = menuItem.getMenuCategory().getId();
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public MenuItemVisibility getVisibility() {
        return visibility;
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

    public Integer getMenuCategory() {
        return menuCategory;
    }
}
