import React from 'react';
import { Link } from 'react-router';
import { 
    LuArrowRight, LuTicket, LuBus, LuPlane, 
    LuShip, LuUsers, LuCheck, LuLayoutGrid, LuMapPin 
} from "react-icons/lu";
import { BiTrain } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdvertisementSection = () => {
    
    const axiosSecure = useAxiosSecure()


    const {data: tickets = [], isLoading} = useQuery({
        queryKey: ['tickets'],
        queryFn: async() => {
            const res = await axiosSecure.get('/tickets-advertise');
            return res.data;
        } 
    })

    const getTypeIcon = (type) => {
        switch(type?.toLowerCase()) {
            case 'bus': return <LuBus />;
            case 'flight': return <LuPlane />;
            case 'train': return <BiTrain />;
            case 'launch': case 'cruise': return <LuShip />;
            case 'jeep': return <LuLayoutGrid />;
            default: return <LuTicket />;
        }
    };

    if (isLoading) return <div className="py-20 text-center bg-base-200"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <section className="py-24 bg-base-200 px-4 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Title */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">Featured Deals</span>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content mt-2">
                        Trending <span className="underline decoration-wavy decoration-primary underline-offset-4">Tickets</span>
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {tickets.map((ticket) => (
                        // MAIN CARD
                        <div key={ticket._id} className="group relative flex flex-col sm:flex-row w-full bg-base-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-base-200">
                            
                            {/* --- 1. LEFT: IMAGE (30%) --- */}
                            <div className="sm:w-[35%] h-52 sm:h-auto relative overflow-hidden">
                                <img 
                                    src={ticket.image} 
                                    alt={ticket.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                
                                {/* Transport Type Badge (Floating) */}
                                <div className="absolute top-4 left-4">
                                    <span className="badge badge-primary text-white text-xs font-bold uppercase tracking-wider py-3 px-3 shadow-lg border-none gap-2">
                                        {getTypeIcon(ticket.transportType)} {ticket.transportType}
                                    </span>
                                </div>
                            </div>

                            {/* --- 2. MIDDLE: INFO (40%) --- */}
                            <div className="flex-1 p-6 flex flex-col justify-center relative">
                                
                                {/* Title */}
                                <h3 className="text-xl font-extrabold text-base-content leading-tight mb-2 line-clamp-2" title={ticket.title}>
                                    {ticket.title}
                                </h3>

                                {/* Quantity Indicator */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1 text-xs font-bold text-base-content/60 bg-base-200 px-2 py-1 rounded-md">
                                        <LuUsers size={12} className={ticket.quantity < 5 ? "text-error" : "text-success"} />
                                        <span className={ticket.quantity < 5 ? "text-error" : "text-success"}>
                                            {ticket.quantity} Seats Available
                                        </span>
                                    </div>
                                </div>

                                {/* Perks (Tags) */}
                                <div>
                                    <p className="text-[10px] text-base-content/40 uppercase font-bold tracking-wider mb-2">Includes</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ticket.perks.slice(0, 3).map((perk, idx) => (
                                            <span key={idx} className="badge badge-outline border-base-300 text-base-content/70 text-xs font-semibold gap-1 py-3 pl-2 pr-3">
                                                <LuCheck size={10} className="text-primary"/> {perk}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Divider & Notches (Desktop) */}
                                <div className="absolute right-0 top-3 bottom-3 border-r-2 border-dashed border-base-300 hidden sm:block"></div>
                                <div className="absolute -right-3 top-0 w-6 h-6 bg-base-200 rounded-full hidden sm:block z-10 box-content border-b border-base-200 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)]"></div>
                                <div className="absolute -right-3 bottom-0 w-6 h-6 bg-base-200 rounded-full hidden sm:block z-10 box-content border-t border-base-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"></div>
                            </div>

                            {/* --- 3. RIGHT: STUB (30%) --- */}
                            <div className="sm:w-[30%] bg-base-50 p-6 flex flex-row sm:flex-col items-center justify-between sm:justify-center relative border-t-2 sm:border-t-0 border-dashed border-base-300 sm:border-none">
                                
                                {/* Notches (Mobile) */}
                                <div className="absolute -left-3 -top-3 w-6 h-6 bg-base-200 rounded-full sm:hidden z-10"></div>
                                <div className="absolute -right-3 -top-3 w-6 h-6 bg-base-200 rounded-full sm:hidden z-10"></div>

                                <div className="text-left sm:text-center">
                                    <p className="text-[10px] text-base-content/40 uppercase font-bold tracking-wider">Per Person</p>
                                    <h4 className="text-3xl font-black text-primary mb-0 sm:mb-4">${ticket.price}</h4>
                                </div>

                                <Link 
                                    to={`/ticket-details/${ticket._id}`}
                                    className="btn btn-sm sm:btn-md btn-neutral w-auto sm:w-full rounded-xl font-bold gap-2 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all"
                                >
                                    See Details <LuArrowRight />
                                </Link>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default AdvertisementSection;