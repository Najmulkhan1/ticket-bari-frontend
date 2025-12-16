import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    LuMapPin, LuCalendar, LuClock, LuUsers,
 LuShieldCheck, LuBus, LuPlane,
     LuArrowRight, LuTicket
} from "react-icons/lu";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { FiAlertTriangle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // --- STATE ---
    const [bookingQty, setBookingQty] = useState(1);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    const { data: ticket, isLoading } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        }
    });

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
        if (!ticket) return;

        const timer = setInterval(() => {
            const departureTime = new Date(ticket.departureDate).getTime();
            const now = new Date().getTime();
            const distance = departureTime - now;

            if (distance < 0) {
                clearInterval(timer);
                setIsExpired(true);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [ticket]);

    // --- BOOKING HANDLER ---
    const handleBooking = async (e) => {
        e.preventDefault();

        if (bookingQty > ticket.quantity) {
            Swal.fire("Error", "You cannot book more seats than available.", "error");
            return;
        }

        const bookingData = {
            ticketId: ticket._id,
            ticketTitle: ticket.title,
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
            orderNumber: Math.floor(Math.random() * 100000000),
            vendorEmail: ticket.email,
            quantity: parseInt(bookingQty),
            totalPrice: parseInt(bookingQty) * ticket.price,
            status: 'pending',
            bookingDate: new Date()
        };

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            console.log("Booking Data Sent:", res.data);
            document.getElementById('booking_modal').close();
            Swal.fire({
                title: "Booking Successful!",
                text: "Your booking is pending approval.",
                icon: "success"
            }).then(() => {
                navigate('/dashboard/my-bookings');
            });
        } catch (error) {
            Swal.fire("Error", "Booking failed. Try again.", "error");
        }
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center bg-base-200"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (!ticket) return <div className="min-h-screen flex justify-center items-center text-error">Failed to load ticket details.</div>;

    const isSoldOut = ticket.quantity === 0;
    const isButtonDisabled = isExpired || isSoldOut;

    // Helper for icons
    const TransportIcon = ticket.transportType === 'bus' ? LuBus : LuPlane;

    return (
        <div className="min-h-screen bg-base-200  font-sans pb-20">
            
            {/* 1. IMMERSIVE HEADER IMAGE */}
            <div className="relative h-[55vh] w-full overflow-hidden">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-black/40 to-black/30"></div>
                
                {/* Back Button / Breadcrumb Area could go here */}
                <div className="absolute pt-20 top-8 left-0 w-full px-6">
                    <div className="max-w-7xl mx-auto">
                         <span className="badge badge-primary badge-lg font-bold shadow-lg capitalize">
                            <TransportIcon className="mr-2"/> {ticket.transportType} Travel
                         </span>
                    </div>
                </div>
            </div>

            {/* 2. OVERLAPPING MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN (DETAILS) --- */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Title & Route Card */}
                        <div className="bg-base-100 rounded-3xl p-6 md:p-10 shadow-xl border border-base-100">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-base-content">
                                {ticket.title}
                            </h1>

                            {/* Visual Route Timeline (Boarding Pass Style) */}
                            <div className="bg-base-200/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-base-300">
                                {/* Origin */}
                                <div className="text-center md:text-left">
                                    <p className="text-sm font-bold opacity-50 uppercase tracking-wider mb-1">From</p>
                                    <h3 className="text-2xl font-black text-primary">{ticket.from}</h3>
                                    <p className="font-medium flex items-center justify-center md:justify-start gap-2 mt-2">
                                        <LuCalendar className="text-primary"/> 
                                        {new Date(ticket.departureDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* Connector Line */}
                                <div className="flex-1 w-full md:w-auto flex flex-col items-center px-4 relative">
                                    <div className="w-full border-t-2 border-dashed border-base-content/20 absolute top-1/2 -translate-y-1/2 z-0"></div>
                                    <div className="bg-base-100 p-2 rounded-full border border-base-200 z-10 text-primary relative">
                                        <TransportIcon size={24} />
                                    </div>
                                    <p className="text-xs font-bold bg-base-100 px-2 py-1 rounded mt-3 z-10 border border-base-200">
                                        {new Date(ticket.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>

                                {/* Destination */}
                                <div className="text-center md:text-right">
                                    <p className="text-sm font-bold opacity-50 uppercase tracking-wider mb-1">To</p>
                                    <h3 className="text-2xl font-black text-primary">{ticket.to}</h3>
                                    <p className="font-medium flex items-center justify-center md:justify-end gap-2 mt-2">
                                        <LuMapPin className="text-primary"/> 
                                        Destination
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description & Perks */}
                        <div className="bg-base-100 rounded-3xl p-8 shadow-lg border border-base-100">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 p-2 rounded-lg text-primary"><LuTicket /></span>
                                About this Trip
                            </h3>
                            <p className="text-base-content/70 leading-relaxed mb-8 text-lg">
                                {ticket.description}
                            </p>

                            <div className="divider">Included Amenities</div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {ticket.perks.map((perk, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors">
                                        <BiCheckCircle className="text-success text-xl flex-shrink-0" />
                                        <span className="font-semibold">{perk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (BOOKING SIDEBAR) --- */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            
                            {/* Main Booking Card */}
                            <div className="bg-base-100 rounded-3xl shadow-2xl p-6 border-t-8 border-primary relative overflow-hidden">
                                {/* Background Decorative Circle */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <p className="text-sm font-medium opacity-60">Price per person</p>
                                        <h2 className="text-4xl font-black text-primary">${ticket.price}</h2>
                                    </div>
                                    <div className={`badge ${ticket.quantity < 5 ? 'badge-warning' : 'badge-outline'} p-3 font-bold`}>
                                        {ticket.quantity > 0 ? `${ticket.quantity} Seats Left` : 'Full'}
                                    </div>
                                </div>

                                {/* Compact Countdown Timer inside Booking Card */}
                                {!isExpired && !isSoldOut && (
                                    <div className="mb-6 bg-neutral text-neutral-content rounded-xl p-4">
                                        <p className="text-xs text-center opacity-70 mb-2 uppercase tracking-widest">Offers Ends In</p>
                                        <div className="flex justify-center gap-3 text-center">
                                            {Object.entries(timeLeft).map(([unit, value]) => (
                                                <div key={unit} className="flex flex-col">
                                                    <span className="countdown font-mono text-xl font-bold">
                                                        <span style={{ "--value": value }}></span>
                                                    </span>
                                                    <span className="text-[10px] opacity-60">{unit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Vendor Info */}
                                <div className="flex items-center gap-3 mb-6 p-3 bg-base-200 rounded-lg">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                            <span className="text-xs">{ticket.vendorName?.slice(0,2).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs opacity-60">Operated by</p>
                                        <p className="font-bold truncate">{ticket.vendorName}</p>
                                    </div>
                                </div>

                                <button
                                    className={`btn btn-primary w-full btn-lg rounded-xl shadow-lg shadow-primary/30 text-lg group
                                        ${isButtonDisabled ? 'btn-disabled bg-base-300 text-base-content/40 border-none shadow-none' : 'hover:-translate-y-1 transition-transform'}`}
                                    onClick={() => document.getElementById('booking_modal').showModal()}
                                    disabled={isButtonDisabled}
                                >
                                    {isExpired ? "Expired" : isSoldOut ? "Sold Out" : "Book Now"}
                                    {!isButtonDisabled && <LuArrowRight className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                                
                                {isButtonDisabled && (
                                    <div className="mt-4 text-center text-xs text-error font-medium flex items-center justify-center gap-1">
                                        <FiAlertTriangle /> Booking unavailable
                                    </div>
                                )}
                            </div>

                            {/* Trust Badge / Safe Checkout (Optional Visual) */}
                            <div className="bg-base-100 rounded-2xl p-4 flex items-center justify-center gap-4 text-sm font-medium opacity-70 shadow-sm">
                                <span className="flex items-center gap-1"><LuShieldCheck className="text-success"/> Secure Payment</span>
                                <span className="w-1 h-1 bg-base-content rounded-full"></span>
                                <span>Instant Confirmation</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- BOOKING MODAL (Clean & Centered) --- */}
            <dialog id="booking_modal" className="modal backdrop-blur-sm">
                <div className="modal-box rounded-3xl p-0 max-w-md bg-base-100 shadow-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-primary p-6 text-primary-content text-center">
                        <h3 className="font-bold text-2xl">Confirm Your Seat</h3>
                        <p className="text-sm opacity-80 mt-1">Traveling to {ticket.to}</p>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={handleBooking}>
                            <div className="flex justify-between items-center mb-6 bg-base-200 p-4 rounded-xl">
                                <span className="font-bold text-lg">Seats</span>
                                <div className="flex items-center gap-3 bg-base-100 rounded-lg p-1 border border-base-300">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-ghost btn-square"
                                        onClick={() => setBookingQty(q => Math.max(1, q - 1))}
                                    >-</button>
                                    <span className="font-mono text-xl w-8 text-center">{bookingQty}</span>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-ghost btn-square"
                                        onClick={() => setBookingQty(q => Math.min(ticket.quantity, q + 1))}
                                    >+</button>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="opacity-70">Total Amount</span>
                                <span className="text-3xl font-black text-primary">${(bookingQty * ticket.price) || 0}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content"
                                    onClick={() => document.getElementById('booking_modal').close()}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary shadow-lg shadow-primary/30">
                                    Pay Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default TicketDetails;