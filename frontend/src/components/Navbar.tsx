import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";

export default function Navbar(){
    return (
        <nav className="flex justify-between items-center w-full py-4 px-8 gap-x-8 bg-primary border-1 rounded-full text-2xl shadow-xl">
            <div className="flex items-center gap-x-8">
                <Link to="/" className="cursor-pointer hover:opacity-80" >Menu</Link>
                <Link to="/order" className="cursor-pointer hover:opacity-80">Order</Link>
            </div>
            <div className="flex items-center gap-x-4">
                <Link to="/checkout" className="cursor-pointer hover:opacity-80" >
                    <IoCart className="text-3xl" />
                </Link>
            </div>
        </nav>
    )
}