import type { MenuItemSimple } from "../types/Menu";
export default function MenuItemCard({ menuItem }: { menuItem: MenuItemSimple }){
    return (
        <div className="flex flex-row items-stretch border-1 border-primary-dark rounded-md shadow-lg">
            <div className="flex flex-1 flex-col justify-center gap-y-2 p-2 min-h-full">
                <h2 className="text-xl font-bold">{ menuItem.name }</h2>
                <div className="flex flex-col">
                    <h4 className="text-md">Half Tray: ${ menuItem.half_tray_price.toFixed(2) }</h4>
                    <h4 className="text-md">Full Tray: ${ menuItem.full_tray_price.toFixed(2) }</h4>
                </div>
            </div>
            <img src={menuItem.image} alt={menuItem.name} className="object-cover min-h-full max-w-[30%]" />
        </div>
    )
}