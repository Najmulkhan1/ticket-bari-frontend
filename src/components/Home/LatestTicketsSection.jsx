import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
    LuArrowRight, LuTicket, LuBus, LuPlane,
    LuShip, LuUsers, LuZap, LuClock, LuLayoutGrid
} from "react-icons/lu";
import { BiTrain } from 'react-icons/bi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

// import useAxiosPublic from '../../hooks/useAxiosPublic';

const LatestTickets = () => {
    // const axiosPublic = useAxiosPublic();
    const axiosInstance = useAxios()

    // useEffect(() => {
    //     // --- MOCK DATA (8 Recently Added Tickets) ---
    //     const mockData = [
    //         { _id: '1', title: "Dhaka to Sylhet AC Bus", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069", price: 1200, quantity: 15, transportType: 'Bus', perks: ['AC', 'Water'] },
    //         { _id: '2', title: "Chittagong Express Train", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2184", price: 650, quantity: 50, transportType: 'Train', perks: ['Shovan', 'Fan'] },
    //         { _id: '3', title: "Cox's Bazar Air Flight", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074", price: 3500, quantity: 8, transportType: 'Flight', perks: ['Meal', 'Fast Check-in'] },
    //         { _id: '4', title: "Green Line Water Bus", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071", price: 900, quantity: 20, transportType: 'Launch', perks: ['AC', 'TV'] },
    //         { _id: '5', title: "Sajek Valley Jeep", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070", price: 2500, quantity: 5, transportType: 'Jeep', perks: ['Guide'] },
    //         { _id: '6', title: "Padma Bridge Bus Service", image: "https://images.unsplash.com/photo-1570125909517-53cb21c89581?q=80&w=2070", price: 500, quantity: 30, transportType: 'Bus', perks: ['Non-AC'] },
    //         { _id: '7', title: "Rajshahi Silk City Train", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2070", price: 750, quantity: 12, transportType: 'Train', perks: ['Snigdha'] },
    //         { _id: '8', title: "Saint Martin Ship", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070", price: 1800, quantity: 10, transportType: 'Ship', perks: ['Open Deck'] },
    //     ];

    //     // REAL API CALL:
    //     // axiosPublic.get('/tickets/latest?limit=8').then(res => setTickets(res.data));

    //     setTimeout(() => {
    //         setTickets(mockData);
    //         setLoading(false);
    //     }, 800);
    // }, []);

    const { data: tickets, isLoading } = useQuery({
        queryKey: ['latest-tickets'],
        queryFn: () => axiosInstance.get('/all-tickets?limit=8').then(res => res.data)
    })


    

    const timeAgo = (createdAt) => {
        const now = new Date();
        const past = new Date(createdAt);
        const diffMs = now - past;

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        return `${days} day${days > 1 ? "s" : ""} ago`;
    };

    if (isLoading) return <div className="py-20 text-center"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <section className="py-20 px-4 font-sans bg-base-100">
            <div className="max-w-7xl mx-auto">

                {/* Header with View All Button */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-secondary font-bold uppercase text-xs tracking-widest mb-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            Just Added
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-base-content">
                            Latest <span className="text-primary">Arrivals</span>
                        </h2>
                    </div>

                    <Link to="/all-tickets" className="btn btn-outline rounded-full px-6 hover:bg-base-content hover:text-base-100 transition-all">
                        View All Tickets
                    </Link>
                </div>

                {/* Grid Layout (Responsive: 1 -> 2 -> 3 -> 4) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {tickets?.map((ticket) => (
                        <div
                            key={ticket._id}
                            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden rounded-2xl"
                        >

                            {/* Image Header */}
                            <figure className="relative h-48 overflow-hidden">
                                <img
                                    src={ticket?.image}
                                    alt={ticket?.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                                {/* "New" Badge */}
                                <div className="absolute top-3 left-3 badge badge-secondary text-white text-xs font-bold shadow-md">
                                    NEW
                                </div>

                                {/* Transport Type Icon */}
                                <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-lg text-white">
                                    {ticket?.transportType}
                                </div>
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-5 gap-0">

                                {/* Meta: Quantity & Time */}
                                <div className="flex justify-between items-center text-xs text-base-content/50 font-bold mb-2">
                                    <span className="flex items-center gap-1">
                                        <LuUsers className="text-primary" /> {ticket?.quantity} Available
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <LuClock /> {timeAgo(ticket?.createdAt)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="card-title text-lg font-bold text-base-content mb-3 line-clamp-1" title={ticket.title}>
                                    {ticket.title}
                                </h3>

                                {/* Perks Tags */}
                                <div className="flex flex-wrap gap-2 mb-4 h-12 overflow-hidden">
                                    {ticket.perks.slice(0, 3).map((perk, idx) => (
                                        <span key={idx} className="badge badge-ghost bg-base-200 text-[10px] font-bold text-base-content/70 border-base-200">
                                            {perk}
                                        </span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="divider my-0 mb-4"></div>

                                {/* Footer: Price & Action */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-base-content/40">Price</p>
                                        <span className="text-xl font-black text-primary">
                                            ${ticket.price}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/tickets-details/${ticket._id}`}
                                        className="btn btn-sm  btn-neutral group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors"
                                        title="See Details"
                                    >
                                       See Details <LuArrowRight />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LatestTickets;