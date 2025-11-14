import { BsSquareFill, BsSquareHalf } from "react-icons/bs";
import type { MenuCategory, MenuItemSimple } from "../../types/Menu";

export default function MenuTable({ menu }: { menu: MenuCategory[] }){
    return (
        <section className="columns-1 lg:columns-2 xl:columns-3 gap-6 w-full">
            { menu.map((category: MenuCategory) => (
                <div className="break-inside-avoid mb-6 flex flex-col" key={category.id}>
                    <header className="text-3xl">
                        { category.name }
                    </header>
                    <div className="flex flex-col border-1 border-primary">
                        { category.menuItems.map((item: MenuItemSimple) => (
                            <div 
                                key={item.id} 
                                className="flex justify-between items-center p-4 border-b-1 border-b-primary last:border-b-0"
                            >
                                <span className="font-medium">{ item.name }</span>
                                <div className="flex flex-col xs:flex-row gap-4 justify-end">
                                    <span className="flex flex-row items-center gap-x-1 w-[90px]">
                                        <BsSquareHalf />
                                        { item.half_tray_price > 0 ? `$${item.half_tray_price.toFixed(2)}` : 'N/A' }
                                    </span> 
                                    <span className="flex flex-row items-center gap-x-1 w-[90px]">
                                        <BsSquareFill className={ item.full_tray_price === 0 ? 'line-through' : '' } />
                                        { item.full_tray_price > 0 ? `$${item.full_tray_price.toFixed(2)}` : 'N/A' }
                                    </span> 
                                </div>
                            </div>
                        )) }
                    </div>
                </div>
            ))}
        </section>
    )
}