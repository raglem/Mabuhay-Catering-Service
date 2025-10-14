import { useEffect, useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import type { MenuCategory, MenuItemSimple } from "../../types/Menu"
import api from "../../api"
import MenuItemEditCard from "../Menu/MenuItemEditCard"
import EditMenuItem from "./EditMenuItem"


export default function EditMenu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)

    const [editingMenu, setEditingMenu] = useState<boolean>(false)
    const [editingMenuItemId, setEditingMenuItemID] = useState<number | null>(null)
    const editingMenuItem: MenuItemSimple | null = menu.flatMap(category => category.menuItems).find(item => item.id === editingMenuItemId) || null

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

    const openEditingMenuItem = (id: number) => {
        setEditingMenu(true)
        setEditingMenuItemID(id)
    }

    const closeEditingMenuItem = () => {
        setEditingMenu(false)
        setEditingMenuItemID(null)
    }

    if (loadingMenu) {
        return (
            <div className="flex justify-center items-center">
                <div className="loading-wrapper">
                    <LoadingSpinner />
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col">
                { menu.map(category => (
                    <div className="flex flex-col" key={category.id}>
                        <header className="flex gap-x-2 w-full p-2 bg-primary text-white rounded-md">
                            <h2 className="text-2xl">{category.name}</h2>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                        { category.menuItems.map(item => (
                            <div key={item.id}>
                                <MenuItemEditCard menuItem={item} toggleEdit={openEditingMenuItem} />
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* for overlay of editing menu item */}
            { (editingMenu && editingMenuItem) && <div className="overlay">
                <EditMenuItem menuItem={editingMenuItem} close={closeEditingMenuItem}/>
            </div>}
        </>
    )
}