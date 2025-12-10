import React, { useEffect, useState } from 'react';
import { 
    LuMapPin, LuCalendar, LuClock, 
    LuPencil, LuTrash2, // Removed LuMoreVertical
    LuBadgeCheck, LuBadgeAlert, LuBan, 
    LuBus, LuPlane 
    // Removed LuTrain to be safe, as it caused errors before
} from "react-icons/lu";
import { Link } from 'react-router'; 
import Swal from 'sweetalert2'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyAddedTickets = () => {
  const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [loading, setLoading] = useState(true);

    

    const {data: tickets = [], isLoading}  = useQuery({
      queryKey: ['my-tickets', user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(`/my-tickets?email=${user?.email}`);
        return res.data;
      },
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false)
      
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Deleting ticket:", id);
                // await axiosSecure.delete(`/tickets/${id}`);
                Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
            }
        });
    };

    // Helper for Status Badge
    const getStatusBadge = (status) => {
        switch(status) {
            case 'approved':
                return <div className="badge badge-success gap-1 text-white"><LuBadgeCheck /> Approved</div>;
            case 'rejected':
                return <div className="badge badge-error gap-1 text-white"><LuBan /> Rejected</div>;
            default:
                return <div className="badge badge-warning gap-1 text-white"><LuBadgeAlert /> Pending</div>;
        }
    };

    return (
        <div className="p-6 lg:p-10 min-h-screen bg-base-200 font-sans">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-base-content">My Added Tickets</h1>
                    <p className="text-sm opacity-60 mt-1">Manage and track your listed journeys.</p>
                </div>
                <div className="stats shadow bg-base-100 p-2 rounded-2xl">
                    <div className="stat place-items-center py-2">
                        <div className="stat-title text-xs font-bold uppercase tracking-wider">Total Tickets</div>
                        <div className="stat-value text-primary text-2xl">{tickets.length}</div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <div key={ticket._id} className="card bg-base-100 shadow-xl group hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden">
                            
                            {/* Card Image Header */}
                            <figure className="relative h-48 w-full overflow-hidden">
                                <img 
                                    src={ticket?.image} 
                                    alt={ticket?.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                
                                {/* Status Badge Overlay */}
                                <div className="absolute top-3 right-3 shadow-md">
                                    {getStatusBadge(ticket.status)}
                                </div>

                                {/* Transport Type Badge */}
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    {ticket.transportType === 'Air' && <LuPlane />}
                                    {/* Fallback for Train since LuTrain was problematic */}
                                    {ticket.transportType === 'Train' && <LuBus />} 
                                    {ticket.transportType === 'Bus' && <LuBus />}
                                    {ticket.transportType}
                                </div>
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-5">
                                <h2 className="card-title text-lg font-bold">
                                    {ticket?.title}
                                </h2>
                                
                                {/* Route Info */}
                                <div className="flex items-center gap-2 text-sm text-base-content/70 mt-2">
                                    <span className="font-semibold">{ticket?.from}</span>
                                    <span className="text-xs opacity-50">─────</span>
                                    <span className="font-semibold">{ticket?.to}</span>
                                </div>

                                {/* Date & Price Grid */}
                                <div className="grid grid-cols-2 gap-4 mt-4 py-4 border-t border-dashed border-base-300">
                                    <div>
                                        <p className="text-xs opacity-50 font-bold uppercase mb-1">Departure</p>
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            <LuCalendar className="text-primary" />
                                            {new Date(ticket.departureDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs opacity-70 mt-1">
                                            <LuClock />
                                            {new Date(ticket.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs opacity-50 font-bold uppercase mb-1">Price</p>
                                        <p className="text-xl font-extrabold text-primary">${ticket.price}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="card-actions grid grid-cols-2 gap-3 mt-2">
                                    {/* UPDATE BUTTON */}
                                    <Link 
                                        to={`/dashboard/update-ticket/${ticket._id}`}
                                        className={`btn btn-sm btn-outline border-base-300 hover:bg-base-200 hover:border-base-300 text-base-content 
                                            ${ticket.status === 'rejected' ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={(e) => ticket.status === 'rejected' && e.preventDefault()}
                                    >
                                        <LuPencil size={14} /> Update
                                    </Link>

                                    {/* DELETE BUTTON */}
                                    <button 
                                        onClick={() => handleDelete(ticket._id)}
                                        disabled={ticket.status === 'rejected'}
                                        className="btn btn-sm btn-error btn-outline hover:text-white"
                                    >
                                        <LuTrash2 size={14} /> Delete
                                    </button>
                                </div>

                                {/* Rejection Note */}
                                {ticket.status === 'rejected' && (
                                    <p className="text-xs text-error mt-2 text-center font-medium">
                                        *Actions locked due to rejection
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAddedTickets;