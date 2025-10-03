package com.backend.order;

import com.backend.mail.EmailHelper;
import com.backend.mail.EmailService;
import com.backend.menu.MenuItem;
import com.backend.menu.MenuItemRepository;
import com.backend.order.dtos.OrderCreateDTO;
import com.backend.order.dtos.OrderDetailDTO;
import com.backend.order.dtos.OrderItemCreateDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final EmailService emailService;

    public OrderService(
            OrderRepository orderRepository, OrderItemRepository orderItemRepository,
            MenuItemRepository menuItemRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.emailService = emailService;
    }

    public List<OrderDetailDTO> getAllOrders(){
        List<Order> orders = orderRepository.findAll();
        List<OrderDetailDTO> orderDetailDTOS = new ArrayList<>();

        for (Order order : orders) {
            orderDetailDTOS.add(new OrderDetailDTO(order));
        }

        return orderDetailDTOS;
    }

    @Transactional
    public OrderDetailDTO createOrder(OrderCreateDTO orderDTO){
        Order order = new Order();

        // Set order fields
        order.setPrice(orderDTO.getPrice());
        order.setCustomer_name(orderDTO.getCustomer_name());
        order.setCustomer_phone_number(orderDTO.getCustomer_phone_number());
        order.setCustomer_email(orderDTO.getCustomer_email());
        order.setDelivery_time(orderDTO.getDelivery_time());

        order = orderRepository.save(order);

        if(orderDTO.getOrderItems() == null){
            throw new IllegalArgumentException("Order Items cannot be null. " +
                    "An order must have at least one order item");
        }

        // Nested creation of order items
        for(OrderItemCreateDTO orderItemDTO: orderDTO.getOrderItems()){
            OrderItem orderItem = new OrderItem();

            // Set fields of newly created orderItem
            MenuItem menuItem = menuItemRepository.findById(orderItemDTO.getMenuItem())
                    .orElseThrow(()-> new RuntimeException("menuItem not found"));
            orderItem.setMenuItem(menuItem);
            orderItem.setOrder(order);
            orderItem.setPrice(getOrderItemPrice(orderItemDTO));
            orderItem.setHalf_tray_quantity(orderItemDTO.getHalf_tray_quantity());
            orderItem.setFull_tray_quantity(orderItemDTO.getFull_tray_quantity());

            // Save the orderItem and update the item on the order side to ensure relationship is synced
            orderItemRepository.save(orderItem);
            order.getOrderItems().add(orderItem);
        }

        // Generate the email with a receipt to the customer
        EmailHelper emailHelper = new EmailHelper();
        String htmlContent = emailHelper.generateReceiptHtml(order);
        emailService.sendOrderReceipt(
                order.getCustomer_email(),
                "Mabuhay Catering Order - " + order.getCreated_at(),
                htmlContent
        );


        return new OrderDetailDTO(order);
    }

    private Double getOrderItemPrice(OrderItemCreateDTO dto){
        Integer menuItemId = dto.getMenuItem();
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("MenuItem not found with id " + menuItemId));

        Double menu_item_half_price = menuItem.getHalf_tray_price();
        Double menu_item_full_price = menuItem.getFull_tray_price();

        return (dto.getHalf_tray_quantity() * menu_item_half_price) + (dto.getFull_tray_quantity() * menu_item_full_price);
    }
}
