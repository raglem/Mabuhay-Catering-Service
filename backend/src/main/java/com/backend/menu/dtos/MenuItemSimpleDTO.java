package com.backend.menu.dtos;

public class MenuItemSimpleDTO {
    private Integer id;
    private String name;
    private Double half_tray_price;
    private Double full_tray_price;
    private String image;
    private Integer menuCategory;

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

    public Integer getMenuCategory() {
        return menuCategory;
    }
}
