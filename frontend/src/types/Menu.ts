export type MenuItem = {
    id: number;
    name: string;
    half_tray_price: number;
    full_tray_price: number;
    image: string;
    menuCategory: MenuCategory;
}
export type MenuItemSimple = {
    id: number;
    name: string;
    half_tray_price: number;
    full_tray_price: number;
    image: string;
    menuCategory: number;
}
export type MenuCategory = {
    id: number;
    name: string;
    items: MenuItemSimple[];
}
export type MenuCategorySimple = {
    id: number;
    name: string;
}