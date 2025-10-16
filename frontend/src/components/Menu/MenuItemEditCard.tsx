import { FaRegEdit } from "react-icons/fa"
import type { MenuItemSimple } from "../../types/Menu"
export default function MenuItemEditCard({ menuItem, toggleEdit }: { menuItem: MenuItemSimple, toggleEdit: (id: number) => void }){
    return (
        <div 
            className="flex flex-row items-stretch border-1 border-primary-dark rounded-md shadow-lg min-h-[150px]"
        >
            <div 
                className="flex flex-1 flex-col justify-center gap-y-2 p-4 min-h-full hover:text-primary cursor-pointer" 
                onClick={() => toggleEdit(menuItem.id)}
            >
                <header className="flex gap-x-2 items-center">
                    <FaRegEdit className="text-2xl" />
                    <h2 className="text-xl text-black font-bold">{ menuItem.name }</h2>
                </header>
                <div className="flex flex-col text-black">
                    <h4 className="text-md">Half Tray: ${ menuItem.half_tray_price.toFixed(2) }</h4>
                    <h4 className="text-md">Full Tray: ${ menuItem.full_tray_price.toFixed(2) }</h4>
                </div>
            </div>
            <img src={menuItem.image} alt={menuItem.name} className="object-cover min-h-full max-w-[40%] rounded-md" />
        </div>
    )
}