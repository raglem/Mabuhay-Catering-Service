package com.backend.order.dtos;

import com.backend.menu.MenuItem;
import com.backend.order.OrderItem;
import com.backend.menu.MenuItemRepository;

public class OrderItemCreateDTO {
    private Integer menuItem;;
    private Integer half_tray_quantity;
    private Integer full_tray_quantity;

    public OrderItemCreateDTO() {}

    public OrderItemCreateDTO(OrderItem orderItem, MenuItemRepository menuItemRepository){
        this.menuItem = orderItem.getId();
        this.half_tray_quantity = orderItem.getHalf_tray_quantity();
        this.full_tray_quantity = orderItem.getFull_tray_quantity();
    }

    public Integer getMenuItem() {
        return menuItem;
    }

    public Integer getHalf_tray_quantity() {
        return half_tray_quantity;
    }

    public Integer getFull_tray_quantity() {
        return full_tray_quantity;
    }
}
