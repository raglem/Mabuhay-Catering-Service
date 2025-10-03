import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";

export default function Checkout(){
    return (
        <div className="page flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex justify-center items-center w-full md:w-[50%] px-2">
                <CheckoutSummary />
            </div>
            <div className="flex justify-center items-center w-full md:w-[50%] px-2">
                <CheckoutForm />
            </div>
        </div>
    )
}