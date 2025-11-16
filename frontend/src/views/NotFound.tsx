import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

export default function NotFound(){
    return (
        <div className="flex flex-col justify-center items-center gap-y-2">
            <div className="flex items-center w-full justify-center">
                <div className="flex-1 border-t-2 border-secondary mr-2" />
                <RiErrorWarningFill className="text-primary text-[5rem]" />
                <div className="flex-1 border-t-2 border-secondary ml-2" />
            </div>
            <div className="flex flex-col gap-y-12 items-center w-full">
                <p className="text-darkgray text-3xl text-center"> Page Not Found </p>
                <button className="py-2 px-4 bg-primary text-white rounded-md cursor-pointer transition-transform hover:scale-105">
                    <Link to="/" className="flex items-center gap-x-2">
                        <FaHome className="text-2xl" />
                        Back to Homepage
                    </Link>
                </button>
            </div>
      </div>
    )
}
