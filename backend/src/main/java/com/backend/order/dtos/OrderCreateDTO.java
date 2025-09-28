package com.backend.order.dtos;

import com.backend.order.OrderItem;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderCreateDTO {
    private List<OrderItemCreateDTO> orderItems;

    private Double price;
    private String customer_name;
    private String customer_phone_number;
    private String customer_email;
    private ZonedDateTime delivery_time;

    public OrderCreateDTO() {}

    public List<OrderItemCreateDTO> getOrderItems() {
        return orderItems;
    }

    public Double getPrice() {
        return price;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public String getCustomer_phone_number() {
        return customer_phone_number;
    }

    public String getCustomer_email() {
        return customer_email;
    }

    public ZonedDateTime getDelivery_time() {
        return delivery_time;
    }
}
