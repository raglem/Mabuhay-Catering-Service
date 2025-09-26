import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm(){
    const stripe = useStripe();
    const elements = useElements();

    // Customer details
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState<string>("")
    const [customerEmail, setCustomerEmail] = useState<string>("")
    const [deliveryDate, setDeliveryDate] = useState<string>("")

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
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
                    <label htmlFor="customer-email">Email (Optional)</label>
                    <input 
                        type="email" id="customer-email" 
                        placeholder="Email" className="w-full p-2 border rounded-md" 
                        value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}
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
            <div className="flex flex-row justify-end">
                <button 
                    type="submit" 
                    className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
                    disabled={loading || !stripe || !elements}
                >
                    { loading ? "Processing..." : "Place Order" }
                </button>
            </div>
        </form>
    )
}