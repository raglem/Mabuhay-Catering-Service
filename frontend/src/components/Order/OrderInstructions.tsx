import { FaPhone } from "react-icons/fa6";

export default function OrderInstructions(){
    const phoneNumber = "(562) - 924 - 4600"

    return (
        <div className="flex flex-row items-center w-full gap-4 border-1 border-primary rounded-md p-4">
            <div className="flex flex-row items-center gap-x-2 p-2 bg-primary text-white rounded-full">
                <span className="rounded-full bg-white p-2">
                    <FaPhone className="text-primary" />
                </span>
                <span className="whitespace-nowrap">
                    Call { phoneNumber}
                </span>
            </div>
            <p>
                Please call to place your order or if you have any questions regarding your order.
            </p>
        </div>
    )
}