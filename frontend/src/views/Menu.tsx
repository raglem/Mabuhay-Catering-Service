import { useEffect, useState } from "react"
import MenuItemCard from "../components/Menu/MenuItemCard"
import type { MenuCategory } from "../types/Menu"
import api from "../api"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Menu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)

    // Fetch menu
    useEffect(() => {
        const fetchMenu = async () => {
            setLoadingMenu(true)
            try {
                const response = await api.get('/menu/')
                const data = response.data as MenuCategory[]
                const sortedData = data.map(category => ({
                    ...category,
                    menuItems: category.menuItems.sort((a, b) => a.name.localeCompare(b.name)).filter(item => item.visibility === "Public")
                }))
                setMenu(sortedData)
            } catch (error) {
                // TODO: Show user error message
                console.error("Error fetching menu:", error)
            } finally {
                setLoadingMenu(false)
            }
        }
        fetchMenu()
    }, [])

    if (loadingMenu) {
        return (
            <div className="page">
                <div className="loading-wrapper">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

    return (
        <div className="page flex flex-col">
            { menu.map(category => (
                <div className="flex flex-col" key={category.id}>
                    <header className="w-full text-black border-b-1 border-black">
                        <h2 className="text-3xl">{category.name}</h2>
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