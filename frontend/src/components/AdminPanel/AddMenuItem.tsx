import { useRef, useState } from "react"
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa"
import api from "../../api"
import type { MenuItem } from "../../types/Menu"
import LoadingSpinner from "../LoadingSpinner"
import { CiCircleRemove } from "react-icons/ci"
import { toast } from "react-toastify"



export default function AddMenuItem({ menuCategoryId, menuCategoryName, close }: {
    menuCategoryId: number,
    menuCategoryName: string,
    close: (addedMenuItem: MenuItem | null) => void
}){
    const [name, setName] = useState<string>("")
    const [visibility, setVisibility] = useState<"Public" | "Private">("Public")
    const [halfTrayPrice, setHalfTrayPrice] = useState<string>("0")
    const [fullTrayPrice, setFullTrayPrice] = useState<string>("0")

    const imageToUpload = useRef<File | null>(null)
    const [filePreview, setFilePreview] = useState<string | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const handleAdd = async () => {
        const requestBody = {
            name,
            visibility,
            half_tray_price: Number(halfTrayPrice),
            full_tray_price: Number(fullTrayPrice),
            image: "",
            menuCategory: menuCategoryId
        }

        if (isNaN(Number(halfTrayPrice)) || isNaN(Number(fullTrayPrice))) {
            toast.error("Please enter valid numeric values for prices");
            return;
        }

        setLoading(true)
        try{
            // Create the menu item and retrieve the id first
            const menuItemRes = await api.post('/menu-item/', requestBody)
            const data = menuItemRes.data as MenuItem

            // With the menu item id, upload an image
            // Store the imageUrl from the response body
            let imageUrl = ""
            if(imageToUpload.current){
                const formData = new FormData()
                formData.append('image', imageToUpload.current)
        
                const imageUploadRes = await api.post(`/menu-item/${data.id}/image/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                imageUrl = imageUploadRes.data.imageUrl
            }

            const addedMenuItem = {
                id: data.id,
                name: data.name,
                visibility: data.visibility,
                half_tray_price: data.half_tray_price,
                full_tray_price: data.full_tray_price,
                image: imageUrl,
                menuCategory: data.menuCategory
            }

            close(addedMenuItem)
            toast.success(`${name} added successfully to menu`)
        }
        catch(err){
            toast.error(`Something went wrong adding the ${name} menu item`)
        }
        finally{
            setLoading(false)
        }

        close(null)
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
                            type="text" id="half-tray-price"
                            inputMode="decimal" pattern="[0-9]*"
                            value={halfTrayPrice}
                            onChange={(e) => {
                                const newVal = e.target.value;
                                setHalfTrayPrice(newVal);

                                // Automatically update full tray price
                                if (Number(newVal) >= 0){
                                    setFullTrayPrice((Number(newVal) * 2).toString());
                                }
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
                <section className="flex-1 flex flex-col gap-y-4 justify-center items-center aspect-square h-[200px]">
                { filePreview && <div className="flex flex-col gap-y-4 items-center">
                        <img 
                            src={filePreview}
                            alt="Image Upload"
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
            <footer className="flex flex-row-reverse p-4 justify-between gap-x-2 border-t border-t-primary">
                <div className="flex items-center gap-x-2">
                    <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={handleAdd}>
                        Save
                    </button>
                    <button className="bg-white border-1 border-primary text-black px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={() => close(null)}>
                        Cancel
                    </button>
                </div>
                { loading && <LoadingSpinner /> }
            </footer>
        </div>

    )
}