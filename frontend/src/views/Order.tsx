import { useEffect, useState } from "react"
import api from "../api"
import MenuItemOrderCard from "../components/Menu/MenuItemOrderCard"
import type { MenuCategory } from "../types/Menu"
import LoadingSpinner from "../components/LoadingSpinner"
import { useCartStore } from "../stores/useCartStore"
import { BsCartCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import Error from "../components/Error"
import OrderSummary from "../components/Order/OrderSummary"
import { toast } from "react-toastify"

export default function Menu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const { cartItems } = useCartStore()
    const showCheckoutButton = cartItems.length > 0

    // Fetch menu
    useEffect(() => {
        const fetchMenu = async () => {
            setLoadingMenu(true)
            try {
                const response = await api.get('/menu/')
                const data = response.data as MenuCategory[]
                const sortedData = data.map(category => ({
                    ...category,
                    menuItems: category.menuItems
                        .filter(item => item.visibility === "Public")
                        .sort((a, b) => a.name.localeCompare(b.name))
                }))
                setMenu(sortedData)
            } catch (error) {
                toast.error('Something went wrong fetching the menu')
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

    if (error){
        return (
            <div className="page">
                <div className="loading-wrapper">
                    <Error message="The menu could not be loaded" />
                </div>
            </div>
        )
    }

    return (
        <div className="relative page flex flex-col">
            { menu.map(category => (
                <div className="flex flex-col" key={category.id}>
                    <header className="w-full text-black border-b-1 border-b-primary">
                        <h1 className="text-3xl">{category.name}</h1>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    { category.menuItems.map(item => (
                        <div key={item.id}>
                            <MenuItemOrderCard menuItem={item} />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            { showCheckoutButton && <div className="flex flex-col items-end gap-y-2 absolute bottom-4 right-4">
                <OrderSummary />
                <Link to="/call">
                    <button className="flex p-4 bg-primary text-white text-3xl rounded-full transform transition-transform duration-300 hover:scale-120 cursor-pointer">
                        <BsCartCheckFill />
                    </button>
                </Link>
                </div>
            }
        </div>
    )
}