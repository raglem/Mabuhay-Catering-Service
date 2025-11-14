import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";

import { MdMenu, MdOutlineShoppingBag, MdOutlineRestaurantMenu } from "react-icons/md";
import { FaClipboardUser, FaPhone } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export default function Navbar(){
    const [showMobileDropdown, setShowMobileDropdown] = useState<boolean>(false)
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

    // Close mobile dropdown when clicking outside dropdown
    useEffect(() => {
        const handleMobileDropdownClose = (e: MouseEvent) => {
            const dropdown = document.getElementById("mobile-dropdown-menu")
            if (dropdown && !dropdown.contains(e.target as Node)) {
                setShowMobileDropdown(false);
            }
        }
        window.addEventListener("click", handleMobileDropdownClose)
        return () => window.removeEventListener("click", handleMobileDropdownClose)
    })

    return (
        <>
            <nav className="hidden md:flex justify-between items-center w[100%] gap-x-8 bg-primary text-2xl text-white">
                <div className="flex items-center">
                    <Link to="/">
                        <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                            <FaHome />
                            Home
                        </button>
                    </Link>
                    <Link to="/menu">
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
                    <Link to="/call">
                        <button className="flex items-center p-4 px-6 gap-x-3 hover:cursor-pointer hover:bg-white hover:text-primary">
                            <FaPhone />
                            Call
                        </button>
                    </Link>
                    { isAuthenticated && <button className="flex items-center p-4 gap-x-2 hover:cursor-pointer hover:bg-white hover:text-primary">
                        <IoIosLogOut className="text-3xl cursor-pointer" onClick={handleLogout} />
                    </button>}
                </div>
            </nav>
            <nav className="relative flex md:hidden justify-between items-center w[100%] bg-primary text-2xl text-white">
                <h1 className="text-3xl p-4 text-white">
                    Mabuhay Kitchenette
                </h1>
                <button 
                    className="p-4 text-4xl cursor-pointer" 
                    onClick={(e) => {
                        e.stopPropagation() // prevent global click listener from firing (which would close the menu immediately)
                        setShowMobileDropdown(prev => !prev)
                    }}
                >
                    <MdMenu />
                </button>
                { showMobileDropdown && <div 
                    id="mobile-dropdown-menu"
                    className="absolute top-[100%] left-0 right-0 flex flex-col items-stretch z-10 bg-white"
                >
                    <Link to="/">
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-b-0 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <FaHome />
                            Home
                        </button>
                    </Link>
                    <Link to="/menu">
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-b-0 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <MdOutlineRestaurantMenu />
                            Menu
                        </button>
                    </Link>
                    <Link to="/order">
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-b-0 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <MdOutlineShoppingBag />
                            Order
                        </button>
                    </Link>
                    { isAuthenticated && <Link to="/admin">
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-b-0 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <FaClipboardUser />
                            Admin
                        </button>
                    </Link>
                    }
                    <Link to="/call">
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <FaPhone />
                            Call
                        </button>
                    </Link>
                    { isAuthenticated && 
                        <button className="flex flex-row w-full gap-x-2 items-center p-4 border-1 border-b-0 border-primary text-primary cursor-pointer hover:bg-gray-100">
                            <IoIosLogOut className="text-3xl cursor-pointer" onClick={handleLogout} />
                        </button>
                    }
                </div>}
            </nav>
        </>
    )
}