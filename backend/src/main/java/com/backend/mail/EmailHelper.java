package com.backend.mail;

import com.backend.order.Order;
import com.backend.order.OrderItem;

public class EmailHelper {
    public String generateReceiptHtml(Order order) {
        StringBuilder sb = new StringBuilder();
        sb.append("<h1>Thank you for your order!</h1>");
        sb.append("<p>Order ID: ").append(order.getId()).append("</p>");
        sb.append("<p>Customer: ").append(order.getCustomer_name()).append("</p>");
        sb.append("<p>Email: ").append(order.getCustomer_email()).append("</p>");
        sb.append("<ul>");
        for (OrderItem item : order.getOrderItems()) {
            sb.append("<li>")
                    .append(item.getMenuItem().getName())
                    .append(" - Half trays: ").append(item.getHalf_tray_quantity())
                    .append(", Full trays: ").append(item.getFull_tray_quantity())
                    .append(", Price: $").append(item.getPrice())
                    .append("</li>");
        }
        sb.append("</ul>");
        sb.append("<p>Total: $").append(order.getPrice()).append("</p>");
        return sb.toString();
    }

}
