import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { 
    LuMapPin, LuCalendar, LuClock, LuArrowRight, 
    LuBus, LuPlane, LuUsers, LuTag 
    // Removed LuCheckCircle
} from "react-icons/lu";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllTickets = () => {
    
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()

    const {data: tickets, isLoading} = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-tickets')
            return res.data
        }
    })

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 pt-25 md:px-8 font-sans">
            
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-extrabold mb-3 text-base-content">
                    Available <span className="text-primary">Journeys</span>
                </h1>
                <p className="text-base-content/60 max-w-2xl mx-auto">
                    Explore our admin-verified tickets for a safe and comfortable journey. 
                    Book your next destination today.
                </p>
            </div>

            {/* Grid Container */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden flex flex-col h-full group">
                        
                        {/* 1. Image Section */}
                        <figure className="relative h-56 overflow-hidden">
                            <img 
                                src={ticket.image} 
                                alt={ticket.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                            {/* Transport Type Badge */}
                            <div className="absolute top-4 right-4 badge badge-neutral text-white font-bold p-3 shadow-lg">
                                {ticket.transportType}
                            </div>
                            
                            {/* Quantity Badge (Low stock warning logic) */}
                            <div className={`absolute bottom-4 left-4 badge ${ticket.quantity < 10 ? 'badge-error text-white' : 'badge-primary text-primary-content'} p-3 shadow-lg gap-2 font-semibold`}>
                                <LuUsers /> {ticket.quantity} Seats Left
                            </div>
                        </figure>

                        {/* Card Body */}
                        <div className="card-body p-6 flex-grow">
                            
                            {/* 2. Title */}
                            <h2 className="card-title text-xl font-bold text-base-content mb-2 line-clamp-2 min-h-[3.5rem]">
                                {ticket.title}
                            </h2>

                            {/* 3. Route (From -> To) */}
                            <div className="flex items-center justify-between bg-base-200/50 p-3 rounded-xl mb-4">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <LuMapPin className="text-primary shrink-0" />
                                    <span className="font-semibold truncate text-sm">{ticket.from}</span>
                                </div>
                                <LuArrowRight className="text-base-content/30 mx-2 shrink-0" />
                                <div className="flex items-center gap-2 overflow-hidden justify-end">
                                    <span className="font-semibold truncate text-sm text-right">{ticket.to}</span>
                                    <LuMapPin className="text-secondary shrink-0" />
                                </div>
                            </div>

                            {/* 4. Date & Time */}
                            <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <LuCalendar className="text-primary" />
                                    <span>{new Date(ticket.departureDate).toLocaleDateString()}</span>
                                </div>
                                <div className="w-px h-4 bg-base-content/20"></div>
                                <div className="flex items-center gap-1.5">
                                    <LuClock className="text-secondary" />
                                    <span>{new Date(ticket.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                            </div>

                            {/* 5. Perks (Scrollable if many) */}
                            <div className="mb-6">
                                <p className="text-xs font-bold text-base-content/40 uppercase mb-2 flex items-center gap-1">
                                    <LuTag size={12} /> Included Perks
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {ticket.perks.slice(0, 3).map((perk, idx) => (
                                        <span key={idx} className="badge badge-sm badge-outline text-xs bg-base-100 border-base-300 text-base-content/70">
                                            {perk}
                                        </span>
                                    ))}
                                    {ticket.perks.length > 3 && (
                                        <span className="badge badge-sm badge-ghost text-xs">+{ticket.perks.length - 3} more</span>
                                    )}
                                </div>
                            </div>

                            {/* Footer: Price & Button */}
                            <div className="mt-auto pt-4 border-t border-base-200 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-base-content/50 font-bold uppercase">Price per person</p>
                                    <p className="text-2xl font-extrabold text-primary">
                                        ${ticket.price}
                                    </p>
                                </div>
                                
                                <Link to={`/tickets-details/${ticket._id}`}>
                                    <button className="btn btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all rounded-xl gap-2">
                                        See Details <LuArrowRight />
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            
            {/* Empty State */}
            {!loading && tickets.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <h3 className="text-2xl font-bold">No tickets found</h3>
                    <p>Check back later for new journeys.</p>
                </div>
            )}
        </div>
    );
};

export default AllTickets;