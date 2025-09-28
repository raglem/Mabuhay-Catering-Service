package com.backend.order;

import com.backend.order.dtos.OrderCreateDTO;
import com.backend.order.dtos.OrderDetailDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order/")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDetailDTO>> getAllOrders(){
        List<OrderDetailDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<OrderDetailDTO> createOrder(@RequestBody OrderCreateDTO orderCreateDTO){
        OrderDetailDTO order = orderService.createOrder(orderCreateDTO);
        return ResponseEntity.ok(order);
    }
}
