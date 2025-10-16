import { useEffect, useMemo, useRef, useState } from "react"
import type { Order } from "../../types/Order"
import api from "../../api"
import LoadingSpinner from "../LoadingSpinner"
import OrderItemsCard from "../OrderItemsCard"

import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";

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

    const [page, setPage] = useState<number>(1)
    const ordersPerPage = 10
    const totalPages = Math.ceil(orders.length / ordersPerPage)
    const paginatedOrders = useMemo(() => {
        const startIndex = (page - 1) * ordersPerPage;
        return sortedOrders.slice(startIndex, startIndex + ordersPerPage);
    }, [page, sortedOrders])

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
            <div className="card flex flex-col w-full">
                An error occurred
            </div>
        )
    }

    if(loading){
        return (
            <div className="card flex flex-col justify-center items-center w-full min-h-[256px] border-1 border-primary">
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <section className="flex flex-col gap-y-4 w-full">
            <div className="card min-w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-primary text-white py-4 px-2">
                    <div className="grid grid-cols-6 gap-x-2 w-full">
                        <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => setSortOrder("deliveryTime")}>
                            <span className="">Delivery Date</span>
                            {sortOrder === "deliveryTime" && <span className="cursor-pointer">
                                {
                                    sortDirection === 'ascending' ? 
                                        <FaCaretUp onClick={() => setSortDirection("descending")} /> :
                                        <FaCaretDown onClick={() => setSortDirection("ascending")} />
                                }
                            </span>}
                        </div>
                        <div className="">Delivery Time</div>
                        <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => setSortOrder("orderedAt")}>
                            <span className="whitespace-nowrap">Ordered At</span>
                            {sortOrder === "orderedAt" && <span className="cursor-pointer">
                                {
                                    sortDirection === 'ascending' ? 
                                        <FaCaretUp onClick={() => setSortDirection("descending")} /> :
                                        <FaCaretDown onClick={() => setSortDirection("ascending")} />
                                }
                            </span>}
                        </div>
                        <div className="truncate">Customer</div>
                        <div className="w-[10%]">Items</div>
                        <div className="w-[10%]">Total</div>
                    </div>
                </div>
                <div>
                    { paginatedOrders.map(order => {
                        const deliveryTime = new Date(order.delivery_time);
                        const orderedAt = new Date(order.created_at);

                        return (
                            <div
                                className="
                                    grid grid-cols-6 w-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 hover:text-black cursor-pointer
                                    border-b border-primary py-4 px-2
                                "
                                key={order.id}
                            >
                                <div className="">{ deliveryTime.toLocaleDateString('en-US') } </div>
                                <div className="">
                                    { deliveryTime.toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </div>
                                <div className="">
                                    { orderedAt.toLocaleDateString('en-US') }
                                </div>
                                <div className="">{ order.customer_name }</div>
                                <div className="relative w-[10%] cursor-pointer hover:underline" onClick={() => setSelectedOrdersItems(order.id)}>
                                    { order.orderItems.length }
                                    { order.id === selectedOrderItems && order.orderItems.length > 0 && 
                                        <div className="absolute top-0 left-[100%]" ref={orderCardRef}>
                                            <OrderItemsCard items={order.orderItems} />
                                        </div>
                                    }
                                </div>
                                <div className="font-semibold w-[10%]">${ order.price.toFixed(2) }</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            { totalPages > 1 && <nav className="flex justify-center items-center gap-x-4 text-2xl">
                <BsFillArrowLeftSquareFill 
                    className="cursor-pointer text-primary hover:scale-125 transition-transform duration-300" 
                    onClick={() => setPage(Math.max(1, page - 1))}
                />
                <span> { page } of { totalPages }</span>
                <BsFillArrowRightSquareFill 
                    className="cursor-pointer text-primary hover:scale-125 transition-transform duration-300" 
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                />
            </nav>}
        </section>
    )
}
