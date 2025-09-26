import MenuItemCard from "../components/MenuItemCard"
import type { MenuCategory } from "../types/Menu"

export default function Menu(){
    const menu: MenuCategory[] = [
        {
            id: 1,
            name: "Beef",
            menuItems: [
                {
                    id: 1,
                    name: "Beef with Broccoli",
                    half_tray_price: 40,
                    full_tray_price: 75,
                    image: "https://fastly.picsum.photos/id/977/200/300.jpg?hmac=YYtcm39X8v9y0KYAb_9s-ufIz_R0Kgbt_EP0F8-jkFU",
                    menuCategory: 1
                },
                {
                    id: 2,
                    name: "Mongolian Beef",
                    half_tray_price: 45,
                    full_tray_price: 85,
                    image: "https://fastly.picsum.photos/id/977/200/300.jpg?hmac=YYtcm39X8v9y0KYAb_9s-ufIz_R0Kgbt_EP0F8-jkFU",
                    menuCategory: 1
                }
            ]
        }
    ]
    return (
        <div className="page">
            { menu.map(category => (
                <div className="flex flex-col" key={category.id}>
                    <header className="w-full p-2 bg-primary text-black border-1 border-black rounded-md">
                        <h2 className="text-2xl">{category.name}</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    { category.menuItems.map(item => (
                        <div key={item.id}>
                            <MenuItemCard menuItem={item} />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}