package com.backend.order.dtos;

import com.backend.order.OrderItem;

public class OrderItemSimpleDTO {
    private Integer id;
    private Double price;
    private Integer half_tray_quantity;
    private Integer full_tray_quantity;

    public OrderItemSimpleDTO() {}

    public OrderItemSimpleDTO(OrderItem orderItem){
        this.id = orderItem.getId();
        this.price = orderItem.getPrice();
        this.half_tray_quantity = orderItem.getHalf_tray_quantity();
        this.full_tray_quantity = orderItem.getFull_tray_quantity();
    }

    public Integer getId() {
        return id;
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
