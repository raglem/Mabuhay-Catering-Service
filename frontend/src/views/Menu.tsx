import { useEffect, useState } from "react"
import { useMenuStore } from "../stores/useMenuStore"
import MenuTable from "../components/Menu/MenuTable"
import MenuItemCard from "../components/Menu/MenuItemCard"
import type { MenuCategory } from "../types/Menu"
import api from "../api"
import LoadingSpinner from "../components/LoadingSpinner"
import { toast } from "react-toastify"
import Error from "../components/Error"
import { MdMenu, MdOutlineGridView } from "react-icons/md";

export default function Menu(){
    const [menu, setMenu] = useState<MenuCategory[]>([])
    const [viewingMode, setViewingMode] = useState<"Card" | "Table">("Table")
    const [loadingMenu, setLoadingMenu] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const { getMenu } = useMenuStore()

    // Fetch menu
    useEffect(() => {
        const fetchMenu = async () => {
            setLoadingMenu(true)
            try {
                const response = await getMenu()
                const data = response
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
        <div className="page flex flex-col gap-y-4">
            <nav className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <span className="text-2xl font-bold text-primary"> *Please note: tax is not included in the listed prices. </span>
                <div className="flex flex-row rounded-full overflow-hidden border-1 border-primary bg-white text-primary">
                    <button 
                        className={`flex justify-center items-center py-2 px-4 gap-x-2 ${viewingMode == 'Table' ? 'bg-primary text-white': 'bg-white'}`} 
                        onClick={ () => setViewingMode('Table') } 
                    >
                        <MdMenu className='text-3xl p-1 hover:cursor-pointer' />
                    </button>
                    <button 
                        className={`flex justify-center items-center py-2 px-4 gap-x-2 ${viewingMode == 'Card' ? 'bg-primary text-white': 'bg-white'}`} 
                        onClick={ () => setViewingMode('Card') } 
                    >
                        <MdOutlineGridView className='text-3xl p-1 hover:cursor-pointer' />
                    </button>
                </div>
            </nav>
            { viewingMode == 'Table' && <MenuTable menu={menu}/> }
            { viewingMode == 'Card' && menu.map(category => (
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