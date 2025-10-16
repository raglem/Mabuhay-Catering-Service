import type { MenuItemSimple, MenuItemSummary } from "./Menu";

export type OrderItemCreate = {
    menuItem: number;
    menuItemSummary: MenuItemSummary;
    half_tray_quantity: number;
    full_tray_quantity: number;
}
export type OrderCreate = {
    orderItems: OrderItemCreate[];
    customer_name: string;
    customer_phone_number: string;
    customer_email: string;
    delivery_time: Date;
    price: number;
}
export type OrderItem = {
    id: number;
    menuItem: MenuItemSimple;
    half_tray_quantity: number;
    full_tray_quantity: number;
}
export type Order = {
    id: number;
    orderItems: OrderItem[];
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    delivery_time: string;
    price: number;
    created_at: string;
}