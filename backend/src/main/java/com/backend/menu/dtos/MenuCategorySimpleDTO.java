package com.backend.menu.dtos;

import com.backend.menu.MenuCategory;

public class MenuCategorySimpleDTO {
    private Integer id;
    private String name;
    private Integer order;

    public MenuCategorySimpleDTO() {}

    public MenuCategorySimpleDTO(MenuCategory menuCategory) {
        this.id = menuCategory.getId();
        this.name = menuCategory.getName();
        this.order = menuCategory.getOrder();
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
}
