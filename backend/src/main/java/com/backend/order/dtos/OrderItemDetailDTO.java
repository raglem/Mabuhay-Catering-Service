package com.backend.order.dtos;

import com.backend.menu.MenuItem;
import com.backend.menu.dtos.MenuItemSimpleDTO;
import com.backend.order.OrderItem;

public class OrderItemDetailDTO {
    private Integer id;
    private MenuItemSimpleDTO menuItem;
    private Double price;
    private Integer half_tray_quantity;
    private Integer full_tray_quantity;

    public OrderItemDetailDTO() {}

    public OrderItemDetailDTO(OrderItem orderItem){
        this.id = orderItem.getId();
        this.menuItem = new MenuItemSimpleDTO(orderItem.getMenuItem());
        this.price = orderItem.getPrice();
        this.half_tray_quantity = orderItem.getHalf_tray_quantity();
        this.full_tray_quantity = orderItem.getFull_tray_quantity();
    }

    public Integer getId() {
        return id;
    }

    public MenuItemSimpleDTO getMenuItem() {
        return menuItem;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getHalf_tray_quantity() {
        return half_tray_quantity;
    }

    public Integer getFull_tray_quantity() {
        return full_tray_quantity;
    }
}
