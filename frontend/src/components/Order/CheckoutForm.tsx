import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import api from "../api";
import LoadingSpinner from "./LoadingSpinner";

type OrderItemCreate = {
    menuItem: number;
    half_tray_quantity: number;
    full_tray_quantity: number;
}
type OrderCreateType = {
    orderItems: OrderItemCreate[];
    price: number;
    customer_name: string;
    customer_phone_number: string;
    customer_email: string;
    delivery_time: string;
}

export default function CheckoutForm(){
    const stripe = useStripe();
    const elements = useElements();

    const { cartItems, clearCart } = useCartStore();
    const orderItems: OrderItemCreate[] = cartItems.map(item => ({
        menuItem: item.menuItem,
        half_tray_quantity: item.half_tray_quantity,
        full_tray_quantity: item.full_tray_quantity,
    }))

    // Customer details
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>("")
    const [customerEmail, setCustomerEmail] = useState<string>("")
    const [deliveryDate, setDeliveryDate] = useState<string>("")
    const deliveryDateISO = useMemo(() => {
        if (!deliveryDate) return null;
        return new Date(deliveryDate).toISOString();
      }, [deliveryDate]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if(!validateOrderFields){
            return
        }

        if(deliveryDateISO === null){
            return
        }

        const requestBody: OrderCreateType = {
            orderItems,
            customer_name: customerName,
            customer_phone_number: customerPhoneNumber,
            customer_email: customerEmail,
            delivery_time: deliveryDateISO,
            price: cartItems.reduce((total, item) => 
                total + (item.half_tray_quantity * item.menuItemSummary.half_tray_price) + 
                (item.full_tray_quantity * item.menuItemSummary.full_tray_price), 0)
        }
        console.log({requestBody})

        setLoading(true)
        try{
            const response = await api.post("/order/", requestBody)
            clearCart()
            console.log(response)
        }
        catch(err){
            // TODO: handle error
            console.error(err)
        }
        finally{
            setLoading(false)
        }

    }

    const validateOrderFields = () => {
        // TODO: display error messages
        if(!customerName || !customerPhoneNumber || !customerEmail || !deliveryDate){
            setMessage("Please fill out all fields.")
            return false
        }
        // Validate phone number (US format)
        const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
        if(!phoneRegex.test(customerPhoneNumber)){
            setMessage("Please enter a valid phone number.")
            return false
        }
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(customerEmail)){
            setMessage("Please enter a valid email address.")
            return false
        }
        // Validate delivery date (must be in the future)
        const deliveryDateTime = new Date(deliveryDate)
        const now = new Date()
        if(!deliveryDateISO || deliveryDateTime <= now){
            setMessage("Please select a valid delivery date and time.")
            return false
        }
        // Validate cart is not empty
        if(cartItems.length === 0){
            setMessage("Your cart is empty.")
            return false
        }
        return true
    }

    return (
        <form onSubmit={handleSubmit} className="card flex flex-col p-4 gap-y-4 w-full border-1 border-primary">
            <div className="flex flex-col gap-y-3">
                <h1 className="text-xl font-bold">Customer Info</h1>
                <div>
                    <label htmlFor="customer-name">Name</label>
                    <input 
                        type="text" id="customer-name" 
                        placeholder="Name" className="w-full p-2 border rounded-md" 
                        value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="customer-phone-number">Phone Number</label>
                    <input 
                        type="tel" id="customer-phone-number" 
                        placeholder="Phone Number" className="w-full p-2 border rounded-md" 
                        value={customerPhoneNumber} onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                        pattern="^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="customer-email">Email</label>
                    <input 
                        type="email" id="customer-email" 
                        placeholder="Email" className="w-full p-2 border rounded-md" 
                        value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                    />
                    <i className="text-xs text-gray">Include your email to receive a copy of your order receipt</i>
                </div>
                <div>
                    <label htmlFor="delivery-date">Delivery Date</label>
                    <input 
                        type="datetime-local" id="delivery-date" 
                        placeholder="Name" className="w-full p-2 border rounded-md" 
                        value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)}
                        required 
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-xl font-bold">Payment</h1>
                <CardElement className="w-full p-2 border rounded-md" />
            </div>
            { loading && <div className="flex w-full justify-center items-center">
                <LoadingSpinner />
            </div>}
            <div className="flex flex-row justify-end">
                <button 
                    type="submit" 
                    className="bg-primary text-white px-6 py-2 cursor-pointer rounded-md disabled:opacity-50"
                    disabled={loading || !stripe || !elements}
                >
                    { loading ? "Processing..." : "Place Order" }
                </button>
            </div>
        </form>
    )
}