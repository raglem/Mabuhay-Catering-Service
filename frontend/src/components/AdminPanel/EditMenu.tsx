import { useEffect, useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import type { MenuCategory } from "../../types/Menu"
import api from "../../api"


export default function EditMenu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)
    const [editingMenu, setEditingMenu] = useState<boolean>(false)
    const [editingMenuItemId, setEditingMenuItemID] = useState<number | null>(null)

    // Fetch menu
    useEffect(() => {
        const fetchMenu = async () => {
            setLoadingMenu(true)
            try {
                const response = await api.get('/menu/')
                const data = response.data as MenuCategory[]
                setMenu(data)
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
                    <header className="w-full p-2 bg-primary text-white rounded-md">
                        <h2 className="text-2xl">{category.name}</h2>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    { category.menuItems.map(item => (
                        <div key={item.id}>
                            
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}