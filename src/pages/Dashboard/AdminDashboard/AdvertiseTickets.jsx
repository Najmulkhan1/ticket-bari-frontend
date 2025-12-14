import React, { useEffect, useState } from 'react';
import { 
    LuMegaphone, LuSearch, 
    LuBadgeAlert, // FIXED: Replaced LuAlertCircle with LuBadgeAlert
    LuTrendingUp, LuCalendar 
} from "react-icons/lu";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FETCH DATA ---
    useEffect(() => {
        // MOCK DATA (Replace with: axiosSecure.get('/tickets/approved'))
        const mockData = [
            {
                _id: 't1',
                title: 'Dhaka to Cox\'s Bazar Luxury',
                vendorName: 'GreenLine',
                price: 1500,
                date: '2025-12-31',
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069',
                isAdvertised: true // Currently advertised
            },
            {
                _id: 't2',
                title: 'Sylhet Express Train',
                vendorName: 'Railway Bd',
                price: 800,
                date: '2025-12-28',
                image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2184',
                isAdvertised: true
            },
            {
                _id: 't3',
                title: 'Dhaka to Saidpur Air',
                vendorName: 'US Bangla',
                price: 4500,
                date: '2025-12-30',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074',
                isAdvertised: false
            },
            {
                _id: 't4',
                title: 'Barisal Launch VIP',
                vendorName: 'Surovi',
                price: 2000,
                date: '2025-12-25',
                image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071',
                isAdvertised: false
            }
        ];

        setTimeout(() => {
            setTickets(mockData);
            setLoading(false);
        }, 800);
    }, []);

    // Count currently advertised tickets
    const advertisedCount = tickets.filter(t => t.isAdvertised).length;

    // --- TOGGLE HANDLER ---
    const handleToggle = async (ticket) => {
        const isTurningOn = !ticket.isAdvertised;

        // 1. Check Limit Constraint
        if (isTurningOn && advertisedCount >= 6) {
            Swal.fire({
                title: "Limit Reached",
                text: "You can only advertise a maximum of 6 tickets at a time. Please unadvertise one first.",
                icon: "warning",
                confirmButtonColor: "#f87171"
            });
            return; // Stop execution
        }

        try {
            // 2. Optimistic Update (Update UI instantly)
            const updatedTickets = tickets.map(t => 
                t._id === ticket._id ? { ...t, isAdvertised: !t.isAdvertised } : t
            );
            setTickets(updatedTickets);

            // 3. API Call
            // await axiosSecure.patch(`/tickets/advertise/${ticket._id}`, { 
            //     isAdvertised: isTurningOn 
            // });

            // Optional: Small toast for feedback
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
            });
            Toast.fire({
                icon: isTurningOn ? "success" : "info",
                title: isTurningOn ? "Added to Highlights" : "Removed from Highlights"
            });

        } catch (error) {
            // Revert on error
            Swal.fire("Error", "Could not update status", "error");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="bg-base-200 min-h-screen p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <LuMegaphone className="text-secondary" /> Advertise Tickets
                        </h1>
                        <p className="text-sm opacity-60 mt-1">
                            Highlight top tickets on the homepage slider.
                        </p>
                    </div>

                    {/* Slot Counter Card */}
                    <div className={`stat bg-base-100 shadow-lg rounded-2xl w-full md:w-auto p-4 border-l-4 ${advertisedCount >= 6 ? 'border-error' : 'border-success'}`}>
                        <div className="stat-figure text-secondary">
                            <LuTrendingUp size={24} />
                        </div>
                        <div className="stat-title text-xs font-bold uppercase">Active Slots</div>
                        <div className="stat-value text-2xl">
                            <span className={advertisedCount >= 6 ? 'text-error' : 'text-success'}>
                                {advertisedCount}
                            </span> 
                            <span className="text-base-content/30 text-lg"> / 6</span>
                        </div>
                        <div className="stat-desc text-xs font-medium">
                            {advertisedCount >= 6 ? 'Max limit reached' : 'Slots available'}
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
                    
                    {/* Toolbar */}
                    <div className="p-4 border-b border-base-200 flex justify-between items-center bg-base-100">
                        <div className="font-bold text-sm opacity-50 uppercase tracking-widest">
                            Approved Inventory
                        </div>
                        <div className="relative w-48">
                            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-xs" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="input input-sm input-bordered pl-8 w-full rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table align-middle">
                            {/* Head */}
                            <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold">
                                <tr>
                                    <th className="pl-6 py-4">Ticket Info</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th className="text-center">Ad Status</th>
                                    <th className="text-right pr-6">Toggle</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket._id} className="hover:bg-base-200/40 transition-colors border-b border-base-100 last:border-none">
                                        
                                        {/* 1. Ticket Info */}
                                        <td className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="mask mask-squircle w-12 h-12 bg-base-200">
                                                    <img src={ticket.image} alt="Ticket" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm line-clamp-1 max-w-[180px]">
                                                        {ticket.title}
                                                    </div>
                                                    <div className="text-xs opacity-50">
                                                        Vendor: {ticket.vendorName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 2. Price */}
                                        <td className="font-bold text-primary">
                                            ${ticket.price}
                                        </td>

                                        {/* 3. Date */}
                                        <td className="text-xs opacity-70">
                                            <div className="flex items-center gap-1">
                                                <LuCalendar /> {ticket.date}
                                            </div>
                                        </td>

                                        {/* 4. Status Label */}
                                        <td className="text-center">
                                            {ticket.isAdvertised ? (
                                                <span className="badge badge-success text-white text-xs font-bold">
                                                    Live
                                                </span>
                                            ) : (
                                                <span className="badge badge-ghost opacity-50 text-xs">
                                                    Hidden
                                                </span>
                                            )}
                                        </td>

                                        {/* 5. Toggle Switch */}
                                        <td className="text-right pr-6">
                                            <input 
                                                type="checkbox" 
                                                className="toggle toggle-success toggle-sm hover:scale-105 transition-transform" 
                                                checked={ticket.isAdvertised}
                                                onChange={() => handleToggle(ticket)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Limit Warning */}
                {advertisedCount >= 6 && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-error text-xs font-bold bg-error/10 p-3 rounded-xl border border-error/20">
                        <LuBadgeAlert /> You have reached the maximum limit of 6 advertised tickets.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvertiseTickets;