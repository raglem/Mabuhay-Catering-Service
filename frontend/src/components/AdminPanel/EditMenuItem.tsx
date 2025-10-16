import { useState } from "react";
import type { MenuItem, MenuItemSimple } from "../../types/Menu";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import api from "../../api";
import LoadingSpinner from "../LoadingSpinner";

export default function EditMenuItem (
    { menuItem, close }: 
    { menuItem: MenuItemSimple, close: (action: 'update' | 'delete' | 'cancel', menuItem: MenuItem | null) => void}
){
    const [name, setName] = useState<string>(menuItem.name)
    const [visibility, setVisibility] = useState<"Public" | "Private">(menuItem.visibility)
    const [halfTrayPrice, setHalfTrayPrice] = useState<number>(menuItem.half_tray_price)
    const [fullTrayPrice, setFullTrayPrice] = useState<number>(menuItem.full_tray_price)

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const handleUpdate = async () => {
        const requestBody = {
            id: menuItem.id,
            name,
            visibility,
            half_tray_price: halfTrayPrice,
            full_tray_price: fullTrayPrice,
            image: menuItem.image, // TODO: Handle image upload
            menuCategory: menuItem.menuCategory
        }

        setLoadingUpdate(true)
        try{
            const res = await api.put(`/menu-item/`, requestBody)

            const updatedMenuItem: MenuItem = {
                id: res.data.id,
                name: res.data.name,
                visibility: res.data.visibility,
                half_tray_price: res.data.half_tray_price,
                full_tray_price: res.data.full_tray_price,
                image: res.data.image,
                menuCategory: res.data.menuCategory
            }

            close('update', updatedMenuItem)

            // TODO: Notify user update was successful
        }
        catch(err){
            console.error(err)
            // TODO: Show user error message
        }
        finally{
            setLoadingUpdate(false)
        }
    }

    // TODO: Handle image upload

    const handleDelete = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete the menu item "${menuItem.name}"? This action cannot be undone.`)
        if(!confirmed)  return

        setLoadingDelete(true)
        try{
            const res = await api.delete(`/menu-item/${menuItem.id}/`)
            // TODO: Notify user deletion was successful
            close('delete', null)
        }
        catch(err){
            // TODO: Show user error message
        }
        finally{
            setLoadingDelete(false)
        }
    }

    return (
        <div className="card flex flex-col bg-white rounded-lg shadow-md max-w-fit mx-auto">
            <header className="flex justify-between items-center gap-x-2 w-full p-4 border-b-1 border-primary">
                <div className="flex items-center gap-x-2">
                    { visibility === "Public" && <FaEye className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Private")} /> }
                    { visibility === "Private" && <FaEyeSlash className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Public")}/> }
                    <h2 className={`text-2xl transition-transform duration-300 ${visibility === "Public" ? "scale-100" : "scale-110"}`}>{menuItem.name}</h2>
                </div>
                <div className="flex items-center gap-x-2">
                    { loadingDelete && <LoadingSpinner />}
                    <FaTrashAlt className="text-2xl transition-transform duration-300 hover:text-3xl hover:text-red-500 cursor-pointer" onClick={handleDelete}/>
                </div>
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
                <section className="flex-1 flex flex-col gap-y-4 justify-center items-center aspect-square min-w-[200px]">
                    <img 
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="object-contain max-h-40 rounded-md"
                    />
                    <FaUpload className="text-2xl text-primary cursor-pointer" />
                </section>
                
            </div>
            <footer className="flex flex-row-reverse justify-between items-center p-4 gap-x-2 border-t border-t-primary">
                <div className="flex gap-x-2 items-center">
                    <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={handleUpdate}>
                        Save
                    </button>
                    <button className="bg-white border-1 border-primary text-black px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={() => close('cancel', null)}>
                        Cancel
                    </button>
                </div>
                { loadingUpdate && <LoadingSpinner />}
            </footer>
        </div>

    )
}