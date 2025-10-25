import { useCartStore } from "../../stores/useCartStore"
import type { OrderItemCreate } from "../../types/Order"
import { BsSquareHalf } from "react-icons/bs";
import { BsSquareFill } from "react-icons/bs";
import { IoBagRemoveOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function CheckoutSummary(){
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

    const totalPrice: number = orderedCartItems.reduce((acc: number, item: OrderItemCreate) => {
        return acc + calculatePrice(item)
    }, 0)

    return (
        <div className="card flex flex-col min-h-[min(320px,80vh)] w-full overflow-auto">
            <header className="w-full p-2 bg-primary">
                <h3 className="text-xl text-white">Your Order</h3>
            </header>
            <ol className="flex flex-1 flex-col w-full gap-y-2 p-2 overflow-x-auto">
                { orderedCartItems.map((item: OrderItemCreate) => (
                    <li className="flex justify-between items-center gap-x-6 md:gap-x-8 border-b-1 border-b-primary hover:bg-gray" key={item.menuItem}>
                        <span className="flex flex-1">{ item.menuItemSummary.name }</span>
                        <div className="flex flex-row gap-x-4 w-fit">
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
                { orderedCartItems.length === 0 && 
                    <div className="flex flex-col justify-center items-center gap-y-2 h-full w-full p-4 text-gray">
                        <Link to="/order">
                            <IoBagRemoveOutline className="text-5xl hover:text-primary cursor-pointer"/>
                        </Link>
                        Your cart is empty.
                    </div>
                }
                </ol>
            <div className="flex flex-row justify-end items-center w-full p-2 border-t-1 border-t-primary text-xl font-extrabold">
                Total: ${totalPrice.toFixed(2)}
            </div>
        </div>
    )
}