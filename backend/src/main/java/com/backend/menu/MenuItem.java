package com.backend.menu;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Double half_tray_price;
    private Double full_tray_price;
    private String image;

    @ManyToOne
    @JoinColumn(name = "menu_category_id", nullable = false)
    @JsonBackReference
    private MenuCategory menuCategory;

    public MenuItem() {}

    public MenuItem(
            Integer id, String name,
            Double half_tray_price, Double full_tray_price,
            String image, MenuCategory menuCategory
    ) {
        this.id = id;
        this.name = name;
        this.half_tray_price = half_tray_price;
        this.full_tray_price = full_tray_price;
        this.image = image;
        this.menuCategory = menuCategory;
    }

    public Integer getId() { return id; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getHalf_tray_price() {
        return half_tray_price;
    }

    public void setHalf_tray_price(Double half_tray_price) {
        this.half_tray_price = half_tray_price;
    }

    public Double getFull_tray_price() {
        return full_tray_price;
    }

    public void setFull_tray_price(Double full_tray_price) {
        this.full_tray_price = full_tray_price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public MenuCategory getMenuCategory() { return menuCategory; }

    public void setMenuCategory(MenuCategory menuCategory) { this.menuCategory = menuCategory; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MenuItem menuItem)) return false;
        return Objects.equals(id, menuItem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
