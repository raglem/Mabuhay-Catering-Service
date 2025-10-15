import { useState } from "react"
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa"
import api from "../../api"
import type { MenuItem, MenuItemSimple } from "../../types/Menu"
import LoadingSpinner from "../LoadingSpinner"



export default function AddMenuItem({ menuCategoryId, menuCategoryName, close }: {
    menuCategoryId: number,
    menuCategoryName: string,
    close: (addedMenuItem: MenuItem | null) => void
}){
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [visibility, setVisibility] = useState<"Public" | "Private">("Public")
    const [halfTrayPrice, setHalfTrayPrice] = useState<number>(0)
    const [fullTrayPrice, setFullTrayPrice] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const handleAdd = async () => {
        // TODO: Handle update logic

        const requestBody = {
            name,
            visibility,
            half_tray_price: halfTrayPrice,
            full_tray_price: fullTrayPrice,
            image: "https://images.unsplash.com/photo-1756142754703-1c24f2d1fe9a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
            menuCategory: menuCategoryId
        }

        setLoading(true)
        try{
            const res = await api.post('/menu-item/', requestBody)
            const data = res.data as MenuItem

            const addedMenuItem = {
                id: data.id,
                name: data.name,
                visibility: data.visibility,
                half_tray_price: data.half_tray_price,
                full_tray_price: data.full_tray_price,
                image: data.image,
                menuCategory: data.menuCategory
            }

            close(addedMenuItem)
            // TODO: Notify user menu item addition succeeded
        }
        catch(err){
            // TODO: Show user error message
        }
        finally{
            setLoading(false)
        }

        close(null)
    }

    // TODO: Handle image upload

    return (
        <div className="card flex flex-col bg-white rounded-lg shadow-md max-w-fit mx-auto">
            <header className="flex items-center gap-x-2 w-full p-4 border-b-1 border-primary">
                { visibility === "Public" && <FaEye className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Private")} /> }
                { visibility === "Private" && <FaEyeSlash className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Public")}/> }
                <h2 className="text-2xl">New { menuCategoryName } Item</h2>
            </header>
            <div className="flex flex-row items-start gap-4 p-4">
                <section className="flex flex-col gap-y-2 min-w-[256px]">
                    <div className="flex flex-col">
                        <label htmlFor="menu-item-name">Name</label>
                        <input 
                            type="text" id="menu-item-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-1 outline-none border border-primary rounded-md w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="half-tray-price">Half Tray Price</label>
                        <input 
                            type="number" id="half-tray-price"
                            value={halfTrayPrice}
                            onChange={(e) => setHalfTrayPrice(Number(e.target.value))}
                            className="p-1 outline-none border border-primary rounded-md w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="full-tray-price">Full Tray Price</label>
                        <input 
                            type="number" id="full-tray-price"
                            value={fullTrayPrice}
                            onChange={(e) => setFullTrayPrice(Number(e.target.value))}
                            className="p-1 outline-none border border-primary rounded-md w-full"
                        />
                    </div>
                </section>
                <section className="flex-1 flex flex-col gap-y-4 justify-center items-center aspect-square h-[200px]">
                    {image && 
                        <img 
                            src={image}
                            alt={name}
                            className="object-contain max-h-40 rounded-md"
                        />}
                    <FaUpload className="text-2xl text-primary cursor-pointer" />
                </section>
                
            </div>
            <footer className="flex p-4 justify-between gap-x-2 border-t border-t-primary">
                { loading && <LoadingSpinner /> }
                <div className="flex items-center gap-x-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={handleAdd}>
                        Save
                    </button>
                    <button className="bg-white border-1 border-primary text-black px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={() => close(null)}>
                        Cancel
                    </button>
                </div>
            </footer>
        </div>

    )
}