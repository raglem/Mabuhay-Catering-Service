import { useEffect, useState } from "react";
import type { MenuItemSimple } from "../types/Menu";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useCartStore } from "../stores/useCartStore";

export default function MenuItemOrderCard({ menuItem }: { menuItem: MenuItemSimple}){
    const [halfQuantity, setHalfQuantity] = useState<number>(0)
    const [fullQuantity, setFullQuantity] = useState<number>(0)
    const inCart = halfQuantity > 0 || fullQuantity > 0

    // Whenever halfQuantity or fullQuantity changes, update the cart store
    const { addToCart, removeFromCart } = useCartStore()
    useEffect(() => {
        // If the menu item is in the cart, update it
        if(inCart){
            addToCart({
                menuItem: menuItem.id,
                menuItemSummary: {
                    name: menuItem.name,
                    half_tray_price: menuItem.half_tray_price,
                    full_tray_price: menuItem.full_tray_price
                },
                half_tray_quantity: halfQuantity,
                full_tray_quantity: fullQuantity,
            })
        }
        // If the menu item is no longer in the cart, remove it
        if(!inCart){
            removeFromCart(menuItem.id)
        }
        // I
    }, [halfQuantity, fullQuantity])
    
    return (
        <div className="relative flex flex-row items-stretch border-1 border-primary-dark rounded-md shadow-lg">
            { inCart && <div className="absolute top-0 right-0">
                    <IoIosCheckmarkCircle className="text-primary text-3xl" />
                </div>
            }
            <div className="flex flex-1 flex-col justify-center gap-y-3 p-2 min-h-full">
                <h2 className="text-xl font-bold">{ menuItem.name }</h2>
                <div className="flex flex-col">
                    <h4 className="text-md">Half Tray: ${ menuItem.half_tray_price.toFixed(2) }</h4>
                    <h4 className="text-md">Full Tray: ${ menuItem.full_tray_price.toFixed(2) }</h4>
                </div>
                <div className="flex flex-col gap-y-2 w-fit">
                    <div className="flex justify-between items-center py-1 px-3 w-full gap-x-4 bg-primary text-white rounded-md">
                        Half
                        <div className="flex justify-evenly items-center gap-x-2">
                            <button className="cursor-pointer hover:opacity-80" onClick={() => setHalfQuantity(Math.max(0, halfQuantity - 1))}>
                                <FaMinus />
                            </button>
                            <span className="flex justify-center items-center border-1 aspect-square h-8">{ halfQuantity }</span>
                            <button className="cursor-pointer hover:opacity-80" onClick={() => setHalfQuantity(halfQuantity + 1)}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-1 px-3 w-full gap-x-4 bg-primary text-white rounded-md">
                        Full
                        <div className="flex justify-evenly items-center gap-x-2">
                            <button className="cursor-pointer hover:opacity-80" onClick={() => setFullQuantity(Math.max(0, fullQuantity - 1))}>
                                <FaMinus />
                            </button>
                            <span className="flex justify-center items-center border-1 aspect-square h-8">{ fullQuantity }</span>
                            <button className="cursor-pointer hover:opacity-80" onClick={() => setFullQuantity(fullQuantity + 1)}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <img src={menuItem.image} alt={menuItem.name} className="object-cover min-h-full max-w-[40%] rounded-r-md" />
        </div>
    )
}