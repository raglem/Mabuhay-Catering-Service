import { useEffect, useState } from "react"
import MenuItemCard from "../components/Menu/MenuItemCard"
import type { MenuCategory } from "../types/Menu"
import api from "../api"
import LoadingSpinner from "../components/LoadingSpinner"
import { toast } from "react-toastify"
import Error from "../components/Error"

export default function Menu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

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
                toast.error('Something went wrong fetching the menu')
                setError(true)
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

    if (error){
        return (
            <div className="page">
                <div className="loading-wrapper">
                    <Error message="Order items could not be loaded" />
                </div>
            </div>
        )
    }

    return (
        <div className="page flex flex-col">
            { menu.map(category => (
                <div className="flex flex-col" key={category.id}>
                    <header className="w-full text-black border-b-1 border-b-primary">
                        <h1 className="text-3xl">{category.name}</h1>
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