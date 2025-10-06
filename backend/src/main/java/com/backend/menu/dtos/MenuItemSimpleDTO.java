package com.backend.menu.dtos;

import com.backend.menu.MenuItem;

public class MenuItemSimpleDTO {
    private Integer id;
    private String name;
    private Double half_tray_price;
    private Double full_tray_price;

    public MenuItemSimpleDTO(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.name = menuItem.getName();
        this.half_tray_price = menuItem.getHalf_tray_price();
        this.full_tray_price = menuItem.getFull_tray_price();
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
}
