import { useEffect, useRef, useState } from "react";
import type { MenuItemSimple } from "../../types/Menu";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useCartStore } from "../../stores/useCartStore";
import Decrement from "../Decrement";
import Increment from "../Increment";

export default function MenuItemOrderCard({ menuItem }: { menuItem: MenuItemSimple}){
    const [halfQuantity, setHalfQuantity] = useState<number>(0)
    const [fullQuantity, setFullQuantity] = useState<number>(0)
    const inCart = halfQuantity > 0 || fullQuantity > 0
    const trayBtnGroupRef = useRef<HTMLDivElement | null>(null)
    const { cartItems } = useCartStore()

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
    }, [halfQuantity, fullQuantity])

    // On initial render, update the quantities if the item is already in the cart
    useEffect(() => {
        const cartItem = cartItems.find(item => item.menuItem === menuItem.id)
        if(cartItem){
            setHalfQuantity(cartItem.half_tray_quantity)
            setFullQuantity(cartItem.full_tray_quantity)
        }
    }, [])

    // If the item is not yet in the cart, clicking anywhere on the card will add one half tray order
    const addItemByClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Node | null;
      
        // Exclude clicks on the quantity buttons
        if (!inCart && trayBtnGroupRef.current && !trayBtnGroupRef.current.contains(target)) {
          setHalfQuantity(1);
        }
      };
      
    
    return (
        <div className={`relative flex flex-row items-stretch border-1 border-primary rounded-md shadow-lg min-h-[150px] h-full ${!inCart && 'cursor-pointer'}`} onClick={(e) => addItemByClick(e)}>
            { inCart && <div className="absolute top-0 right-0">
                    <IoIosCheckmarkCircle className="text-primary text-3xl" />
                </div>
            }
            <div className="flex flex-1 flex-col justify-center gap-y-3 py-8 p-4 min-h-full">
                <h2 className="text-xl font-bold">{ menuItem.name }</h2>
                <div className="flex flex-col">
                    <h4 className="text-md">Half Tray: ${ menuItem.half_tray_price.toFixed(2) }</h4>
                    <h4 className="text-md">Full Tray: ${ menuItem.full_tray_price.toFixed(2) }</h4>
                </div>
                <div className="flex flex-col gap-y-2 w-fit" ref={trayBtnGroupRef}>
                    <div className="flex justify-between items-center py-1 px-3 w-full gap-x-4 bg-primary text-white rounded-md">
                        Half
                        <div className="flex justify-evenly items-center gap-x-2">
                            <button onClick={() => setHalfQuantity(Math.max(0, halfQuantity - 1))}>
                                <Decrement />
                            </button>
                            <span className="flex justify-center items-center border-1 aspect-square h-8">{ halfQuantity }</span>
                            <button onClick={() => setHalfQuantity(halfQuantity + 1)}>
                                <Increment />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-1 px-3 w-full gap-x-4 bg-primary text-white rounded-md">
                        Full
                        <div className="flex justify-evenly items-center gap-x-2">
                            <button onClick={() => setFullQuantity(Math.max(0, fullQuantity - 1))}>
                                <Decrement />
                            </button>
                            <span className="flex justify-center items-center border-1 aspect-square h-8">{ fullQuantity }</span>
                            <button onClick={() => setFullQuantity(fullQuantity + 1)}>
                                <Increment />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { menuItem.image.length > 0 && <img src={menuItem.image} alt={menuItem.name} className="object-cover min-h-full max-w-[40%] rounded-r-md" /> }
        </div>
    )
}