import type { OrderItem } from "../../types/Order";
import { BsSquareHalf } from "react-icons/bs";
import { BsSquareFill } from "react-icons/bs";

export default function OrderItemsCard({ items }: { items: OrderItem[] } ){
    return (
        <ul className="card p-3">
            { items.map(item => (
                <li className="flex justify-between items-center gap-x-4" key={item.id}>
                    { item.menuItem.name }
                    <div className="flex justify-between items-center gap-x-2">
                        <span className="flex gap-x-1 items-center">
                            <BsSquareHalf />
                            { item.half_tray_quantity }
                        </span>
                        <span className="flex gap-x-1 items-center">
                            <BsSquareFill />
                            { item.full_tray_quantity }
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    )
}