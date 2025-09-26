import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";

export default function Checkout(){
    return (
        <div className="page flex flex-row justify-stretch gap-x-8">
            <div className="flex justify-center items-center w-[50%] px-2">
                <CheckoutSummary />
            </div>
            <div className="flex justify-center items-center w-[50%] px-2">
                <CheckoutForm />
            </div>
        </div>
    )
}