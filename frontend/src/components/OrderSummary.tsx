import { useCartStore } from "../stores/useCartStore"
import type { OrderItemCreate } from "../types/Order"
import { BsSquareHalf } from "react-icons/bs";
import { BsSquareFill } from "react-icons/bs";

export default function OrderSummary(){
    const { cartItems } = useCartStore()
    const orderedCartItems = cartItems.sort((a: OrderItemCreate, b: OrderItemCreate) => {
        return a.menuItemSummary.name.localeCompare(b.menuItemSummary.name)
    })

    const calculatePrice = (item: OrderItemCreate): number => {
        let total = 0
        total += (item.half_tray_quantity * item.menuItemSummary.half_tray_price)
        total += (item.full_tray_quantity * item.menuItemSummary.full_tray_price)
        return total
    }

    return (
        <div className="card flex flex-col max-h-[320px] overflow-auto shadow-lg">
            <header className="w-full p-2 bg-primary">
                <h3 className="text-xl text-white">Your Order</h3>
            </header>
            <ol className="flex flex-col w-full gap-y-2 p-2 overflow-x-auto">
                { orderedCartItems.map((item: OrderItemCreate) => (
                    <li className="flex flex-row items-center gap-x-6 md:gap-x-8 not-last-of-type:border-b-1 border-b-primary hover:bg-gray" key={item.menuItem}>
                        <span className="w-[25%]">{ item.menuItemSummary.name }</span>
                        <div className="flex flex-row gap-x-4 w-[50%]">
                            <span className="flex flex-row items-center gap-x-1 w-[20%]">
                                <BsSquareHalf />
                                { item.half_tray_quantity }
                            </span> 
                            <span className="flex flex-row items-center gap-x-1 w-[20%]">
                                <BsSquareFill />
                                { item.full_tray_quantity }
                            </span>
                            <span className="font-bold">
                                ${ calculatePrice(item).toFixed(2) }
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}