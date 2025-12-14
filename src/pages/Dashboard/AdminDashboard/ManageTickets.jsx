import React, { useEffect, useState } from 'react';
import {
    LuLayoutList, LuCheck, LuX, LuMapPin,
    LuCalendar, LuSearch, LuTrash2
} from "react-icons/lu";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ['tickets', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?search=${search}`)
            console.log(res.data);
            return res.data;
        }
    })

    // --- HANDLE STATUS CHANGE ---
    const handleStatus = (ticket, newStatus) => {
        // UI Logic: Don't allow clicking if already in that status
        if (ticket.status === newStatus) return;

        Swal.fire({
            title: `Mark as ${newStatus}?`,
            text: `This ticket will be ${newStatus === 'approved' ? 'visible' : 'hidden'} on the main listing.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: newStatus === 'approved' ? '#22c55e' : '#ef4444',
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${newStatus} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // // 1. Optimistic Update (Update UI immediately)
                    // const updatedTickets = tickets.map(t =>
                    //     t._id === ticket._id ? { ...t, status: newStatus } : t
                    // );
                    // setTickets(updatedTickets);

                    // // 2. API Call
                    // // await axiosSecure.patch(`/tickets/status/${ticket._id}`, { status: newStatus });

                    const res = await axiosSecure.patch(`/tickets/status/${ticket._id}`, { status: newStatus });
                    console.log(res.data);
                    refetch();

                    Swal.fire({
                        title: "Updated!",
                        text: `Ticket has been ${newStatus}.`,
                        icon: "success",
                        timer: 1500
                    });
                } catch (error) {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            }
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="bg-base-200 min-h-screen p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <LuLayoutList className="text-primary" /> Manage Tickets
                        </h1>
                        <p className="text-sm opacity-60 mt-1">Review, approve, or reject vendor submissions.</p>
                    </div>

                    {/* Search Bar (Visual) */}
                    <div className="relative w-full md:w-72">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                        <p>{search}</p>
                        <input
                        onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search tickets..."
                            className="input input-bordered pl-10 w-full rounded-xl focus:input-primary"
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table align-middle">

                            {/* Head */}
                            <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="py-5 pl-6">Ticket Details</th>
                                    <th>Route & Date</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th className="text-right pr-6">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {tickets?.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-10 opacity-50 font-bold">
                                            No tickets found.
                                        </td>
                                    </tr>
                                ) : (
                                    tickets?.map((ticket) => (
                                        <tr key={ticket._id} className="hover:bg-base-200/40 transition-colors border-b border-base-100 last:border-none">

                                            {/* 1. Ticket Info */}
                                            <td className="pl-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={ticket.image} alt="Ticket" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm line-clamp-1 max-w-[200px]" title={ticket.title}>
                                                            {ticket.title}
                                                        </div>
                                                        <div className="text-xs opacity-50 mt-0.5">
                                                            By: {ticket.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 2. Route */}
                                            <td>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1 text-xs font-bold">
                                                        <LuMapPin size={10} className="text-primary" />
                                                        {ticket.from} → {ticket.to}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[10px] opacity-60">
                                                        <LuCalendar size={10} />
                                                        {new Date(ticket.departureDate).toLocaleString("en-BD", {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 3. Price */}
                                            <td>
                                                <span className="font-bold text-base-content">
                                                    ${ticket.price}
                                                </span>
                                            </td>

                                            {/* 4. Status Badge */}
                                            <td>
                                                <div className={`badge text-xs font-bold py-3 uppercase
                                                    ${ticket.status === 'approved' ? 'badge-success text-white' : ''}
                                                    ${ticket.status === 'rejected' ? 'badge-error text-white' : ''}
                                                    ${ticket.status === 'pending' ? 'badge-warning text-white' : ''}
                                                `}>
                                                    {ticket.status}
                                                </div>
                                            </td>

                                            {/* 5. Actions */}
                                            <td className="text-right pr-6">
                                                <div className="flex justify-end gap-2">

                                                    {/* Approve Button */}
                                                    <button
                                                        onClick={() => handleStatus(ticket, 'approved')}
                                                        disabled={ticket.status === 'approved'}
                                                        className={`btn btn-sm btn-square 
                                                            ${ticket.status === 'approved'
                                                                ? 'btn-disabled bg-base-200 opacity-20'
                                                                : 'btn-success text-white shadow-md hover:shadow-success/40'}`}
                                                        title="Approve Ticket"
                                                    >
                                                        <LuCheck size={16} />
                                                    </button>

                                                    {/* Reject Button */}
                                                    <button
                                                        onClick={() => handleStatus(ticket, 'rejected')}
                                                        disabled={ticket.status === 'rejected'}
                                                        className={`btn btn-sm btn-square 
                                                            ${ticket.status === 'rejected'
                                                                ? 'btn-disabled bg-base-200 opacity-20'
                                                                : 'btn-error text-white shadow-md hover:shadow-error/40'}`}
                                                        title="Reject Ticket"
                                                    >
                                                        <LuX size={16} />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center mt-6 text-xs text-base-content/40">
                    Showing all {tickets?.length} tickets submitted by vendors.
                </div>

            </div>
        </div>
    );
};

export default ManageTickets;