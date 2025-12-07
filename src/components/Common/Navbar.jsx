import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router' 
import logo from "../../assets/logo2.png"

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    
    // 2. Get the current location object
    const location = useLocation();

    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
            <div className={`navbar transition-all duration-300 ease-in-out rounded-2xl border border-white/20
                ${scrolled ? "bg-base-100/80 shadow-lg backdrop-blur-md w-full max-w-7xl" : "bg-base-100/50 backdrop-blur-sm w-full max-w-6xl shadow-sm"}
            `}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links.map((link, index) => {
                                // Logic for Mobile Menu Active State
                                const isActive = location.pathname === link.href;
                                return (
                                    <li key={index}>
                                        <a 
                                            href={link.href}
                                            className={isActive ? "text-primary font-bold" : ""}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl hover:bg-transparent">
                        <img className='w-32 object-contain' src={logo} alt="Logo" />
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links.map((link, index) => {
                            // 3. Check if this link is active
                            const isActive = location.pathname === link.href;

                            return (
                                <li key={index}>
                                    <a 
                                        href={link.href} 
                                        className={`font-medium transition-colors hover:bg-transparent relative group
                                            ${isActive ? "text-primary font-bold" : "text-base-content/70 hover:text-primary"}
                                        `}
                                    >
                                        {link.name}
                                        
                                        {/* 4. Active Indicator Logic */}
                                        {/* If active, width is full. If not, width is 0 but grows on hover */}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                        `}></span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="navbar-end">
                    <a className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar