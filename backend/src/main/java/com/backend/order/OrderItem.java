package com.backend.order;

import com.backend.menu.MenuItem;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonBackReference
    private Order order;

    private Double price;
    private Integer half_tray_quantity;
    private Integer full_tray_quantity;

    public OrderItem() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getHalf_tray_quantity() {
        return half_tray_quantity;
    }

    public void setHalf_tray_quantity(Integer half_tray_quantity) {
        this.half_tray_quantity = half_tray_quantity;
    }

    public Integer getFull_tray_quantity() {
        return full_tray_quantity;
    }

    public void setFull_tray_quantity(Integer full_tray_quantity) {
        this.full_tray_quantity = full_tray_quantity;
    }
}
