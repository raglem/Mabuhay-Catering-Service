package com.backend.menu.dtos;

import com.backend.menu.MenuCategory;

public class MenuCategoryCreateDTO {
    private String name;
    private Integer order;

    public MenuCategoryCreateDTO() {}

    public MenuCategoryCreateDTO(MenuCategory menuCategory) {
        this.name = menuCategory.getName();
        this.order = menuCategory.getOrder();
    }

    public String getName() {
        return name;
    }

    public Integer getOrder() {
        return order;
    }
}
