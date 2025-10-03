package com.backend.order.dtos;

import com.backend.order.Order;
import com.backend.order.OrderItem;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderDetailDTO {
    private Integer id;

    private List<OrderItemSimpleDTO> orderItems;
    private Double price;

    // Customer details
    private String customer_name;
    private String customer_phone_number;
    private String customer_email;

    private ZonedDateTime created_at;

    // Delivery details
    private ZonedDateTime delivery_time;

    public OrderDetailDTO(){}

    public OrderDetailDTO(Order order){
        this.id = order.getId();
        this.orderItems = new ArrayList<>();

        for (OrderItem orderItem : order.getOrderItems()){
            this.orderItems.add(new OrderItemSimpleDTO(orderItem));
        }

        this.price = order.getPrice();
        this.customer_name = order.getCustomer_name();
        this.customer_phone_number = order.getCustomer_phone_number();
        this.customer_email = order.getCustomer_email();
        this.created_at = order.getCreated_at();
        this.delivery_time = order.getDelivery_time();
    }

    public Integer getId() {
        return id;
    }

    public List<OrderItemSimpleDTO> getOrderItems() {
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

    public ZonedDateTime getCreated_at() {
        return created_at;
    }

    public ZonedDateTime getDelivery_time() {
        return delivery_time;
    }
}
