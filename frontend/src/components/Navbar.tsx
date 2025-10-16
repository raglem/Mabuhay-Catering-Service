import { Link, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useUserStore } from "../stores/useUserStore";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";

import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";

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
        <nav className="flex justify-between items-center w[100%] gap-x-8 bg-primary text-2xl text-white">
            <div className="flex items-center">
                <Link to="/">
                    <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                        <MdOutlineRestaurantMenu />
                        Menu
                    </button>
                </Link>
                <Link to="/order">
                    <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                        <MdOutlineShoppingBag />
                        Order
                    </button>
                </Link>
                { isAuthenticated && <Link to="/admin">
                    <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                        <FaClipboardUser />
                        Admin
                    </button>
                </Link>
                }
            </div>
            <div className="flex items-center">
                <Link to="/checkout">
                    <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                        <IoCart />
                        Checkout
                    </button>
                </Link>
                { isAuthenticated && <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                    <IoIosLogOut className="text-3xl cursor-pointer" onClick={handleLogout} />
                </button>}
            </div>
        </nav>
    )
}