import React from "react";
import { FaUsers, FaMapMarkedAlt, FaBus, FaShieldAlt } from "react-icons/fa";

const Statistics = () => {
    const stats = [
        {
            id: 1,
            icon: <FaUsers className="text-blue-500" />,
            value: "2.5M+",
            label: "Happy Travelers",
            description: "Trusted by millions for reliable journeys.",
        },
        {
            id: 2,
            icon: <FaMapMarkedAlt className="text-emerald-500" />,
            value: "500+",
            label: "Routes Covered",
            description: "Connecting cities, towns, and remote areas.",
        },
        {
            id: 3,
            icon: <FaBus className="text-orange-500" />,
            value: "1,200+",
            label: "Fleet Size",
            description: "Modern buses, trains, and flight partners.",
        },
        {
            id: 4,
            icon: <FaShieldAlt className="text-purple-500" />,
            value: "99.9%",
            label: "Safety Record",
            description: "Your safety is our absolute priority.",
        },
    ];

    return (
        <section className="relative py-12 md:py-20 bg-base-100 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[120px]" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header for the Stats */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-base-content text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                            Leading the way in <span className="text-primary">Modern Transit</span>
                        </h2>
                        <p className="text-base-content/60 text-sm md:text-base leading-relaxed">
                            We aren't just selling tickets; we are building the infrastructure for your next great adventure across land and sky.
                        </p>
                    </div>
                    <div className="hidden lg:block h-[1px] flex-1 bg-base-content/10 mx-12 mb-4"></div>
                    <div className="flex items-center gap-2 text-base-content/40 font-mono text-xs tracking-widest uppercase">
                        <span>Live Data</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className="group relative p-8 rounded-3xl bg-base-200/50 border border-base-content/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Icon & Value */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-base-content/5 group-hover:bg-base-content/10 transition-colors text-2xl">
                                    {stat.icon}
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
                                    {stat.value}
                                </span>
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-base-content font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                    {stat.label}
                                </h3>
                                <p className="text-base-content/60 text-sm leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;