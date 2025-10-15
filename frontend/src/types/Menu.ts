export type MenuItemVisibility = 'Public' | 'Private'
export type MenuItem = {
    id: number;
    name: string;
    visibility: MenuItemVisibility;
    half_tray_price: number;
    full_tray_price: number;
    image: string;
    menuCategory: MenuCategory;
}
export type MenuItemSimple = {
    id: number;
    name: string;
    visibility: MenuItemVisibility;
    half_tray_price: number;
    full_tray_price: number;
    image: string;
    menuCategory: number

}
export type MenuItemSummary = {
    name: string;
    half_tray_price: number;
    full_tray_price: number;
}
export type MenuCategory = {
    id: number;
    name: string;
    menuItems: MenuItemSimple[];
}
export type MenuCategorySimple = {
    id: number;
    name: string;
}