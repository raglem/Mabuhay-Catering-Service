import { useEffect, useMemo, useRef, useState } from "react"
import type { Order } from "../types/Order"
import api from "../api"
import LoadingSpinner from "./LoadingSpinner"
import OrderItemsCard from "./OrderItemsCard"

import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

export default function Orders(){
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const [sortOrder, setSortOrder] = useState<"deliveryTime" | "orderedAt">("deliveryTime")
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending")

    const sortedOrders: Order[] = useMemo(() => {
        return [...orders].sort((a, b) => {
            const aDate =
              sortOrder === "deliveryTime"
                ? new Date(a.delivery_time).getTime()
                : new Date(a.created_at).getTime();
        
            const bDate =
              sortOrder === "deliveryTime"
                ? new Date(b.delivery_time).getTime()
                : new Date(b.created_at).getTime();
        
            // Sort ascending or descending
            if (sortDirection === "ascending") {
              return aDate - bDate;
            } else {
              return bDate - aDate;
            }
        })
    }, [sortOrder, sortDirection, orders])

    const [selectedOrderItems, setSelectedOrdersItems] = useState<number | null>(null)
    const orderCardRef = useRef<HTMLDivElement>(null);

    // Fetch orders
    useEffect(() => {
        async function fetchOrders(){
            setLoading(true)
            try{
                const res = await api.get('/order/')
                const { data } = res
                setOrders(data)
            }
            catch(err){
                // TODO: Notify user an error has occurred
                setError(true)
            }
            finally{
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    // Handle clicks to deselect an OrderItemsCard
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (orderCardRef.current && !orderCardRef.current.contains(event.target as Node)) {
                setSelectedOrdersItems(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    if(error){
        return (
            <table className="card flex flex-col w-full">
                An error occurred
            </table>
        )
    }

    if(loading){
        return (
            <table className="card flex flex-col justify-center items-center w-full">
                <LoadingSpinner />
            </table>
        )
    }

    return (
        <table className="card min-w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-primary text-white">
                <tr
                    className="grid grid-cols-6 w-full"
                >
                    <th className="flex items-center gap-x-2 p-4 text-left cursor-pointer" onClick = {() => setSortOrder("deliveryTime")}>
                        <span className="whitespace-nowrap">Delivery Date</span>
                        {sortOrder == "deliveryTime" && <span className="cursor-pointer">
                            {
                                sortDirection === 'ascending' ? 
                                    <FaCaretUp onClick={() => setSortDirection("descending")} /> :
                                    <FaCaretDown onClick={() => setSortDirection("ascending")} />
                            }
                        </span>}
                    </th>
                    <th className="p-4 text-left">Delivery Time</th>
                    <th className="flex items-center gap-x-2 p-4 text-left cursor-pointer" onClick = {() => setSortOrder("orderedAt")}>
                        <span className="whitespace-nowrap">Ordered At</span>
                        {sortOrder == "orderedAt" && <span className="cursor-pointer">
                            {
                                sortDirection === 'ascending' ? 
                                    <FaCaretUp onClick={() => setSortDirection("descending")} /> :
                                    <FaCaretDown onClick={() => setSortDirection("ascending")} />
                            }
                        </span>}
                    </th>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left w-[10%]">Items</th>
                    <th className="p-4 text-left w-[10%]">Total</th>
                </tr>
            </thead>
            <tbody>
                { sortedOrders.map(order => {
                    const deliveryTime = new Date(order.delivery_time);
                    const orderedAt = new Date(order.created_at);

                    return (
                        <tr
                            className="
                                grid grid-cols-6 w-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 hover:text-black cursor-pointer
                                border-b border-primary
                            "
                        >
                            <td className="p-4">{ deliveryTime.toLocaleDateString('en-US') } </td>
                            <td className="p-4">
                                { deliveryTime.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </td>
                            <td className="p-4">
                                { orderedAt.toLocaleDateString('en-US') }
                            </td>
                            <td className="p-4">{ order.customer_name }</td>
                            <td className="relative p-4 w-[10%] cursor-pointer hover:underline" onClick={() => setSelectedOrdersItems(order.id)}>
                                { order.orderItems.length }
                                { order.id === selectedOrderItems && order.orderItems.length > 0 && 
                                    <div className="absolute top-0 left-[100%]" ref={orderCardRef}>
                                        <OrderItemsCard items={order.orderItems} />
                                    </div>
                                }
                            </td>
                            <td className="p-4 font-semibold w-[10%]">${ order.price.toFixed(2) }</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}