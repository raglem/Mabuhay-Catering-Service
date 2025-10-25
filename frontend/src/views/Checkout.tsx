import CheckoutSummary from "../components/Order/CheckoutSummary";
import OrderInstructions from "../components/Order/OrderInstructions";

export default function Checkout(){
    return (
        <div className="page flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col gap-y-8 justify-center items-center w-full max-w-[768px] px-2">
                <CheckoutSummary />
                <OrderInstructions />
            </div>
        </div>
    )
}