import { useRef, useState } from "react";
import type { MenuItem, MenuItemSimple } from "../../types/Menu";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import api from "../../api";
import LoadingSpinner from "../LoadingSpinner";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";

export default function EditMenuItem (
    { menuItem, close }: 
    { menuItem: MenuItemSimple, close: (action: 'update' | 'delete' | 'cancel', menuItem: MenuItem | null) => void}
){
    const [name, setName] = useState<string>(menuItem.name)
    const [visibility, setVisibility] = useState<"Public" | "Private">(menuItem.visibility)
    const [halfTrayPrice, setHalfTrayPrice] = useState<string>(menuItem.half_tray_price.toString())
    const [fullTrayPrice, setFullTrayPrice] = useState<string>(menuItem.full_tray_price.toString())

    const imageToUpload = useRef<File | null>(null)
    const [filePreview, setFilePreview] = useState<string | null>(menuItem.image)

    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const handleUpdate = async () => {
        if (isNaN(Number(halfTrayPrice)) || isNaN(Number(fullTrayPrice))) {
            toast.error("Please enter valid numeric values for prices");
            return;
        }

        setLoadingUpdate(true)
        try{
            const res = await Promise.all([sendUpdateRequest(), sendImageRequest()])
            const [updateRes, imageRes] = res

            console.log(res)

            const updatedMenuItem: MenuItem = {
                id: updateRes.data.id,
                name: updateRes.data.name,
                visibility: updateRes.data.visibility,
                half_tray_price: updateRes.data.half_tray_price,
                full_tray_price: updateRes.data.full_tray_price,
                image: imageRes?.data?.imageUrl || "",
                menuCategory: updateRes.data.menuCategory
            }

            close('update', updatedMenuItem)
            toast.success(`Menu item "${updatedMenuItem.name}" updated successfully`)
        }
        catch(err){
            console.error(err)
            toast.error(`Something went wrong updating the menu item "${menuItem.name}"`)
        }
        finally{
            setLoadingUpdate(false)
        }
    }

    const sendUpdateRequest = async () => {
        const requestBody = {
            id: menuItem.id,
            name,
            visibility,
            half_tray_price: Number(halfTrayPrice),
            full_tray_price: Number(fullTrayPrice),
            image: menuItem.image,
            menuCategory: menuItem.menuCategory
        }
        console.log(requestBody)
        
        return await api.put(`/menu-item/`, requestBody)
    }

    const sendImageRequest = async () => {
        if(!imageToUpload.current){
            return await api.delete(`/menu-item/${menuItem.id}/image/`)
        }
        else{
            const formData = new FormData()
            formData.append('image', imageToUpload.current)
    
            return await api.post(`/menu-item/${menuItem.id}/image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return

        const file = e.target.files[0]

        // Only accept images
        if(!file.type.startsWith('image/')){
            return
        }

        imageToUpload.current = file
        setFilePreview(URL.createObjectURL(file))
    }
    
    const handleImageClear = () => {
        imageToUpload.current = null
        setFilePreview(null)
    }

    const handleDelete = async () => {
        const confirmed = window.confirm(`Are you sure you want to delete the menu item "${menuItem.name}"? This action cannot be undone.`)
        if(!confirmed)  return

        setLoadingDelete(true)
        try{
            await api.delete(`/menu-item/${menuItem.id}/`)
            toast.success(`Menu item "${menuItem.name}" deleted successfully`)
            close('delete', null)
        }
        catch(err){
            toast.error(`Something went wrong deleting the menu item "${menuItem.name}"`)
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
            <div className="grid grid-cols-2 gap-4 py-8 px-4">
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
                            id="half-tray-price" type="text"
                            inputMode="decimal" pattern="[0-9]*"
                            value={halfTrayPrice}
                            onChange={(e) => {
                                const newVal = e.target.value;
                                setHalfTrayPrice(newVal);
                            }}
                            className="p-1 outline-none border border-primary rounded-md w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="full-tray-price">Full Tray Price</label>
                        <input
                            type="text" id="full-tray-price"
                            inputMode="decimal" pattern="[0-9]*"
                            value={fullTrayPrice}
                            onChange={(e) => {
                                const newVal = e.target.value;
                                setFullTrayPrice(newVal);
                            }}
                            className="p-1 outline-none border border-primary rounded-md w-full"
                        />
                    </div>
                </section>
                <section className="flex flex-col justify-center items-center">
                    { filePreview && <div className="flex flex-col gap-y-4 items-center">
                        <img 
                            src={filePreview}
                            alt={menuItem.name}
                            className="object-contain max-h-40 w-full rounded-md border-2 border-primary"
                        />
                        <nav className="flex justify-center items-center gap-x-4">
                            { filePreview && <CiCircleRemove className="text-2xl text-primary cursor-pointer" onClick={handleImageClear} /> }
                            <label htmlFor="menu-item-image-upload" className="relative border-0">
                                <FaUpload className="text-2xl text-primary cursor-pointer" />
                                <input 
                                    id="menu-item-image-upload"
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </nav>
                    </div> }
                    { !filePreview && <div className="flex justify-center items-center h-full w-full">
                        <label htmlFor="menu-item-image-upload" className="relative border-0">
                            <FaUpload className="text-5xl text-primary cursor-pointer" />
                            <input 
                                id="menu-item-image-upload"
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div> }
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
