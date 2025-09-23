package com.backend.menu.dtos;

import com.backend.menu.MenuCategory;
import com.backend.menu.MenuItem;

import java.util.List;

public class MenuCategoryDetailDTO {
    private Integer id;
    private String name;
    private Integer order;
    private List<MenuItem> menuItems;

    public MenuCategoryDetailDTO() {}

    public MenuCategoryDetailDTO(MenuCategory menuCategory) {
        this.id = menuCategory.getId();
        this.name = menuCategory.getName();
        this.order = menuCategory.getOrder();
        this.menuItems = menuCategory.getMenuItems();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }
}
