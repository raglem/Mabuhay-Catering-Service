import { Link, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useUserStore } from "../stores/useUserStore";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";

export default function Navbar(){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const { token, clearUser, isLoggedIn } = useUserStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearUser()
        navigate("/login")
    }

    // Only call isLoggedIn when the token changes (the user logs in or logs out)
    useEffect(() => {
        setIsAuthenticated(isLoggedIn())
    }, [token])

    return (
        <nav className="flex justify-between items-center w-[50%] min-w-[300px] max-w-[640px] py-1 px-4 gap-x-8 bg-primary rounded-full text-md text-white shadow-xl">
            <div className="flex items-center gap-x-8">
                <Link to="/" className="cursor-pointer hover:opacity-80" >Menu</Link>
                <Link to="/order" className="cursor-pointer hover:opacity-80">Order</Link>
            </div>
            <div className="flex items-center gap-x-4">
                <Link to="/checkout" className="cursor-pointer hover:opacity-80" >
                    <IoCart className="text-3xl" />
                </Link>
                { isAuthenticated && <IoIosLogOut className="text-3xl cursor-pointer hover:opacity-80" onClick={handleLogout} />}
            </div>
        </nav>
    )
}