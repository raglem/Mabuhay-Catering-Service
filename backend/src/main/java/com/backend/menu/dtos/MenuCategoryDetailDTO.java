package com.backend.menu.dtos;

import com.backend.menu.MenuCategory;
import com.backend.menu.MenuItem;

import java.util.ArrayList;
import java.util.List;

public class MenuCategoryDetailDTO {
    private Integer id;
    private String name;
    private Integer order;
    private List<MenuItemNestedDTO> menuItems;

    public MenuCategoryDetailDTO() {}

    public MenuCategoryDetailDTO(MenuCategory menuCategory) {
        this.id = menuCategory.getId();
        this.name = menuCategory.getName();
        this.order = menuCategory.getOrder();

        List<MenuItem> menuItems = menuCategory.getMenuItems();
        List<MenuItemNestedDTO> dtos = new ArrayList<>();
        for(MenuItem menuItem : menuItems) {
            dtos.add(new MenuItemNestedDTO(menuItem));
        }
        this.menuItems = dtos;
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

    public List<MenuItemNestedDTO> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItemNestedDTO> menuItems) {
        this.menuItems = menuItems;
    }
}
