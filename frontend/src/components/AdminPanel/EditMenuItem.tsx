import { useState } from "react";
import type { MenuItemSimple } from "../../types/Menu";
import { FaUpload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

export default function EditMenuItem (
    { menuItem, close }: 
    { menuItem: MenuItemSimple, close: () => void}
){
    const [visibility, setVisibility] = useState<"Public" | "Private">("Public")
    const [name, setName] = useState<string>(menuItem.name)
    const [halfTrayPrice, setHalfTrayPrice] = useState<number>(menuItem.half_tray_price)
    const [fullTrayPrice, setFullTrayPrice] = useState<number>(menuItem.full_tray_price)

    const handleUpdate = () => {
        // TODO: Handle update logic
        close()
    }

    // TODO: Handle image upload

    return (
        <div className="card flex flex-col bg-white rounded-lg shadow-md max-w-fit mx-auto">
            <header className="flex items-center gap-x-2 w-full p-4 border-b-1 border-primary">
                { visibility === "Public" && <FaEye className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Private")} /> }
                { visibility === "Private" && <FaEyeSlash className="text-2xl text-black hover:text-primary cursor-pointer" onClick={() => setVisibility("Public")}/> }
                <h2 className="text-2xl">{menuItem.name}</h2>
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
                <section className="flex-1 flex flex-col gap-y-4 items-center">
                    <img 
                        src={menuItem.image}
                        alt={menuItem.name}
                        className="object-contain max-h-40 rounded-md"
                    />
                    <FaUpload className="text-2xl text-primary cursor-pointer" />
                </section>
                
            </div>
            <div className="flex justify-end p-4 gap-x-2 border-t border-t-primary">
                <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={handleUpdate}>
                    Save
                </button>
                <button className="bg-white border-1 border-primary text-black px-4 py-2 rounded-md cursor-pointer hover:opacity-80" onClick={close}>
                    Cancel
                </button>
            </div>
        </div>

    )
}