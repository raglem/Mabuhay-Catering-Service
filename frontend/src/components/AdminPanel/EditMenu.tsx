import { useEffect, useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import type { MenuCategory, MenuItem, MenuItemSimple } from "../../types/Menu"
import api from "../../api"
import MenuItemEditCard from "../Menu/MenuItemEditCard"
import EditMenuItem from "./EditMenuItem"
import { FaCirclePlus } from "react-icons/fa6";
import AddMenuItem from "./AddMenuItem"


export default function EditMenu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)

    const [addingMenuItem, setAddingMenuItem] = useState<boolean>(false)
    const [addingMenuCategoryId, setAddingMenuCategoryId] = useState<number | null>(null)
    const addingMenuCategoryName = menu.find(category => category.id === addingMenuCategoryId)?.name || ""

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

    const openAddingMenuItem = (id: number) => {
        setAddingMenuItem(true)
        setAddingMenuCategoryId(id)
    }

    const closeAddingMenuItem = (addedMenuItem: MenuItem | null) => {
        if(addedMenuItem){
            // If a new menu item was added, update the menu state to include it
            setMenu(prevMenu => prevMenu.map(category => {
                if(category.id === addedMenuItem.menuCategory.id){
                    return {
                        ...category,
                        menuItems: [...category.menuItems, {
                            id: addedMenuItem.id,
                            name: addedMenuItem.name,
                            half_tray_price: addedMenuItem.half_tray_price,
                            full_tray_price: addedMenuItem.full_tray_price,
                            image: addedMenuItem.image,
                            menuCategory: addedMenuItem.menuCategory.id
                        }].sort((a, b) => a.name.localeCompare(b.name))
                    }
                }
                return category
            }))
        }
        setAddingMenuItem(false)
        setAddingMenuCategoryId(null)
    }

    const openEditingMenuItem = (id: number) => {
        setEditingMenu(true)
        setEditingMenuItemID(id)
    }

    const closeEditingMenuItem = (action: 'update' | 'delete' | 'cancel', updatedItem: MenuItemSimple | null) => {
        if(action === 'cancel' || updatedItem === null){
            setEditingMenu(false)
            setEditingMenuItemID(null)
            return
        }
        else if(action === 'update'){
            setMenu(prevMenu => prevMenu.map(category => {
                if(category.id === updatedItem.menuCategory){
                    return {
                        ...category,
                        menuItems: category.menuItems.map(item => item.id === updatedItem.id ? {
                            id: updatedItem.id,
                            name: updatedItem.name,
                            half_tray_price: updatedItem.half_tray_price,
                            full_tray_price: updatedItem.full_tray_price,
                            image: updatedItem.image,
                            menuCategory: updatedItem.menuCategory
                        } : item).sort((a, b) => a.name.localeCompare(b.name))
                    }
                }
                else{
                    return category
                }
            }))
        }
        else if(action === 'delete'){
            setMenu(prevMenu => prevMenu.map(category => {
                if(category.id === updatedItem.menuCategory){
                    return {
                        ...category,
                        menuItems: category.menuItems.filter(item => item.id !== updatedItem.id)
                    }
                }
                else{
                    return category
                }
            }))
        }
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
                        <header className="flex justify-between items-center gap-x-2 w-full p-2 bg-primary text-white rounded-md">
                            <h2 className="text-2xl">{category.name}</h2>
                            <FaCirclePlus 
                                className="transition-transform text-3xl aspect-square hover:scale-125 cursor-pointer"
                                onClick={() => openAddingMenuItem(category.id)}
                            />
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

            {/* for overlay of adding menu item */}
            { (editingMenu && editingMenuItem) && <div className="overlay">
                <EditMenuItem menuItem={editingMenuItem} close={closeEditingMenuItem}/>
            </div>}

            {/* for overlay of editing menu item */}
            { (addingMenuItem && addingMenuCategoryId) && <div className="overlay">
                <AddMenuItem menuCategoryId={addingMenuCategoryId} menuCategoryName={addingMenuCategoryName} close={closeAddingMenuItem}/>
            </div>}
        </>
    )
}