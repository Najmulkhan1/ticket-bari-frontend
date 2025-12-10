import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router' // Added useNavigate
import { LuLogOut, LuUser } from "react-icons/lu"; // Added Icons
import logo from "../../assets/logo2.png"
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const {user, logOut} = useAuth()

    
    
    // const user = null; // Use this to see logged-out view

    const handleLogout = () => {
        logOut()
        console.log("User logged out");
        // logOut(); 
        navigate('/');
    };
    // =========================================================

    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    const authPaths = ['/login', '/register']
    const isAuthPage = authPaths.includes(location.pathname)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const warperBase = 'left-0 right-0 z-50 flex justify-center items-center px-4'
    const wrapperPosition = isAuthPage ? 'relative ' : 'fixed top-0 '
    const wrapperClass = `${wrapperPosition} ${warperBase} py-4`

    return (
        <div className={wrapperClass}>
            <div className={`relative navbar transition-all duration-300 ease-in-out rounded-2xl border border-white/20 px-4 
                ${scrolled 
                    ? "bg-base-100/90 shadow-lg backdrop-blur-md w-full max-w-7xl" 
                    : "bg-base-100/50 backdrop-blur-sm w-full max-w-7xl shadow-sm"
                }
            `}>
                
                {/* 1. Navbar Start - Logo */}
                <div className="navbar-start w-full lg:w-1/2 flex justify-between lg:justify-start items-center">
                    <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0">
                        <img className='w-28 sm:w-32 object-contain' src={logo} alt="Logo" />
                    </Link>

                    {/* Mobile Toggle Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        {/* Mobile User Avatar Preview (Optional - visible even when menu closed) */}
                        {user && (
                            <div className="avatar w-8 h-8 lg:hidden">
                                <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="avatar" />
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="btn btn-ghost btn-circle text-primary transition-transform duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* 2. Navbar Center - Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links.map((link, index) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <li key={index}>
                                    <Link 
                                        to={link.href} 
                                        className={`font-medium transition-colors hover:bg-transparent relative group
                                            ${isActive ? "text-primary font-bold" : "text-base-content/70 hover:text-primary"}
                                        `}
                                    >
                                            {link.name}
                                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                                                ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                            `}></span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* 3. Navbar End - Desktop Buttons OR User Profile */}
                <div className="navbar-end hidden lg:flex">
                    {user ? (
                        // LOGGED IN VIEW
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2 hover:ring-secondary transition-all">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User" 
                                        src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
                                <li className="menu-title px-4 py-2">
                                    <span className="text-primary font-bold">{user.displayName || "User"}</span>
                                    <span className="text-xs opacity-50 font-normal lowercase">{user.email}</span>
                                </li>
                                <div className="divider my-0"></div>
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge badge-sm badge-primary">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-error font-medium hover:bg-error/10">
                                        <LuLogOut size={16} />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        // LOGGED OUT VIEW
                        <>
                            <Link to={'/login'} className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
                                Login
                            </Link>
                            <Link to={'/register'} className="btn btn-ghost border border-primary rounded-full px-6 ms-2 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* ==============================
                    MOBILE MENU OVERLAY
                   ============================== */}
                <div className={`absolute top-full left-0 w-full mt-2 lg:hidden overflow-hidden transition-all duration-500 ease-in-out origin-top
                    ${isMobileMenuOpen ? "max-h-[500px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}
                `}>
                    <div className="bg-base-100/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-4 flex flex-col gap-2 mx-0">
                        
                        {/* Mobile User Profile Header */}
                        {user && (
                            <div className="flex items-center gap-4 p-3 bg-base-200/50 rounded-xl mb-2">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-2">
                                        <img src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user" />
                                    </div>
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-lg truncate">{user.displayName || "User"}</span>
                                    <span className="text-xs text-base-content/60 truncate">{user.email}</span>
                                </div>
                            </div>
                        )}

                        {/* Mobile Links */}
                        {links.map((link, index) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link 
                                    key={index}
                                    to={link.href} 
                                    className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-between
                                        ${isActive 
                                            ? "bg-primary/10 text-primary font-bold" 
                                            : "hover:bg-base-200 text-base-content/80 hover:pl-5"
                                        }
                                    `}
                                >
                                    {link.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            )
                        })}
                        
                        <div className="divider my-1"></div>
                        
                        {/* Mobile Auth/Logout Actions */}
                        {user ? (
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-error btn-outline btn-sm rounded-lg w-full flex items-center gap-2"
                            >
                                <LuLogOut />
                                Logout
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/login" className="btn btn-primary btn-sm rounded-lg w-full">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-outline btn-primary btn-sm rounded-lg w-full">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar