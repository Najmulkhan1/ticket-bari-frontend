import React from 'react';
import { Link } from 'react-router';
import { LuArrowRight, LuMapPin } from "react-icons/lu";

const PopularRoutes = () => {
    // Mock Data for Routes
    const routes = [
        {
            id: 1,
            from: "Dhaka",
            to: "Cox's Bazar",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069",
            startPrice: "1200",
            totalBuses: 15
        },
        {
            id: 2,
            from: "Dhaka",
            to: "Sylhet",
            image: "https://images.unsplash.com/photo-1600109579728-66280436d40b?q=80&w=2070",
            startPrice: "800",
            totalBuses: 10
        },
        {
            id: 3,
            from: "Chittagong",
            to: "Saint Martin",
            image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070",
            startPrice: "2500",
            totalBuses: 5
        },
        {
            id: 4,
            from: "Dhaka",
            to: "Bandarban",
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070",
            startPrice: "1500",
            totalBuses: 8
        }
    ];

    return (
        <section className="py-20 px-4 bg-base-100 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-base-content mb-3">
                        Popular <span className="text-primary">Routes</span>
                    </h2>
                    <p className="text-base-content/60">Explore the most traveled destinations by our customers.</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {routes.map((route) => (
                        <Link 
                            to="/all-tickets" 
                            key={route.id} 
                            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                        >
                            {/* Background Image */}
                            <img 
                                src={route.image} 
                                alt={`${route.from} to ${route.to}`} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                <div className="flex items-center gap-2 mb-2 opacity-80 text-xs font-bold uppercase tracking-wider">
                                    <LuMapPin className="text-primary" /> Popular Route
                                </div>
                                
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                    {route.from} <span className="text-white/50 px-1">→</span> {route.to}
                                </h3>
                                
                                <div className="flex justify-between items-end mt-4 border-t border-white/20 pt-4">
                                    <div>
                                        <p className="text-xs text-gray-400">Starts from</p>
                                        <p className="font-bold text-lg">${route.startPrice}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <LuArrowRight />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PopularRoutes;