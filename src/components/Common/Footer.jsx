import React from 'react';
import { Link } from 'react-router'; // Ensure this matches your router version
import logo from '../../assets/logo2.png'; 
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaStripe, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 font-sans border-t border-gray-800">
        
        {/* Main Grid Container - Aligned with Navbar/Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                
                {/* COLUMN 1: Brand & Description */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2">
                        {/* Using the same logo as Navbar for consistency */}
                        <img src={logo} alt="TicketBari Logo" className="w-24 object-contain brightness-0 invert" /> 
                        {/* brightness-0 invert makes the logo white if it's black */}
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Book bus, train, launch, and flight tickets easily. Your one-stop solution for hassle-free travel planning across the country.
                    </p>
                </div>

                {/* COLUMN 2: Quick Links */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link>
                        </li>
                        <li>
                            <Link to="/tickets" className="hover:text-primary transition-colors text-sm">All Tickets</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary transition-colors text-sm">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 3: Contact Info */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <FaEnvelope className="mt-1 text-primary" />
                            <span>support@ticketbari.com</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaPhoneAlt className="mt-1 text-primary" />
                            <span>+880 1712 345 678</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaFacebookF className="mt-1 text-primary" />
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                facebook.com/ticketbari
                            </a>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 4: Payment Methods */}
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">We Accept</h3>
                    <p className="text-sm text-gray-400 mb-4">Safe and secure payment gateway.</p>
                    
                    {/* Payment Icons */}
                    <div className="flex flex-wrap gap-3">
                        <div className="bg-white/10 p-2 rounded hover:bg-white/20 transition-colors cursor-pointer" title="Stripe">
                            <FaStripe className="text-4xl text-white" />
                        </div>
                        <div className="bg-white/10 p-2 rounded hover:bg-white/20 transition-colors cursor-pointer" title="Visa">
                            <FaCcVisa className="text-3xl text-white" />
                        </div>
                        <div className="bg-white/10 p-2 rounded hover:bg-white/20 transition-colors cursor-pointer" title="Mastercard">
                            <FaCcMastercard className="text-3xl text-white" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <p>&copy; 2025 TicketBari. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;