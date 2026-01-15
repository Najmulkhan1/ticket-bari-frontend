import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    LuMapPin, LuCalendar, LuClock, LuUsers,
    LuShieldCheck, LuBus, LuPlane,
    LuArrowRight, LuTicket, LuStar
} from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
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

    // --- MOCK DATA FOR NEW SECTIONS ---
    const reviews = [
        { id: 1, user: "Rahim Ahmed", rating: 5, date: "Jan 10, 2024", comment: "Excellent service! The bus was on time and very comfortable." },
        { id: 2, user: "Fatima Khan", rating: 4, date: "Jan 08, 2024", comment: "Good experience, but the AC was a bit too cold." },
        { id: 3, user: "Tanvir Hasan", rating: 5, date: "Jan 05, 2024", comment: "Best journey ever. Highly recommended for long trips." }
    ];

    const relatedTickets = [
        { id: 101, operator: "Green Line", type: "AC Business", price: 1600, time: "11:00 PM" },
        { id: 102, operator: "Shohagh Paribahan", type: "AC Economy", price: 1400, time: "11:15 PM" },
    ];

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
    const TransportIcon = ticket.transportType === 'bus' ? LuBus : LuPlane;

    return (
        <div className="min-h-screen bg-base-100 font-sans pb-20 selection:bg-primary selection:text-white">

            {/* 1. IMMERSIVE HERO SECTION */}
            <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/20 to-transparent z-20"></div>

                <div className="absolute bottom-0 left-0 w-full z-30 pb-12 lg:pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-4">
                                    <TransportIcon className="text-primary" /> {ticket.transportType} Travel
                                </span>
                                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight drop-shadow-lg">
                                    {ticket.title}
                                </h1>
                                <div className="flex items-center gap-4 text-white/80 font-medium">
                                    <span className="flex items-center gap-1"><LuMapPin className="text-primary" /> {ticket.from}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                                    <span className="flex items-center gap-1"><LuMapPin className="text-primary" /> {ticket.to}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer">
                                    <LuTicket size={24} />
                                </span>
                                <span className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer">
                                    <LuStar size={24} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* --- LEFT COLUMN (DETAILS) --- */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* DIGITAL BOARDING PASS CARD */}
                        <div className="bg-base-100 rounded-[2rem] p-8 shadow-2xl border border-base-200/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                                {/* From */}
                                <div className="text-center md:text-left flex-1">
                                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-1">Departure</p>
                                    <h3 className="text-3xl font-black text-base-content mb-1">{ticket.from.split(' ')[0]}</h3>
                                    <p className="text-lg font-medium text-base-content/60">{new Date(ticket.departureDate).toLocaleDateString()}</p>
                                    <p className="text-sm font-bold text-primary bg-primary/10 inline-block px-3 py-1 rounded-lg mt-2">
                                        {new Date(ticket.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                {/* Graphic */}
                                <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center relative">
                                    <div className="w-full h-px border-t-2 border-dashed border-base-300 absolute top-1/2 -mt-px"></div>
                                    <div className="bg-base-100 p-3 rounded-2xl shadow-lg border border-base-200 relative z-10">
                                        <TransportIcon className="text-2xl text-primary" />
                                    </div>
                                    <p className="text-xs font-bold text-base-content/40 mt-3">{ticket.duration || "8h 30m"}</p>
                                </div>

                                {/* To */}
                                <div className="text-center md:text-right flex-1">
                                    <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest mb-1">Arrival</p>
                                    <h3 className="text-3xl font-black text-base-content mb-1">{ticket.to.split(' ')[0]}</h3>
                                    <p className="text-lg font-medium text-base-content/60">Next Day</p>
                                    <p className="text-sm font-bold text-base-content/60 bg-base-200 inline-block px-3 py-1 rounded-lg mt-2">
                                        07:30 AM <span className="text-[10px] opacity-60 ml-1">(Est.)</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DESCRIPTION & AMENITIES */}
                        <div className="prose prose-lg max-w-none">
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-base-content mb-6">
                                <span className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">i</span>
                                About this Trip
                            </h3>
                            <p className="text-base-content/70 leading-relaxed text-lg bg-base-100 p-6 rounded-2xl border border-base-200/60 shadow-sm">
                                {ticket.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-base-content mb-6">
                                <span className="bg-secondary text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/30"><LuStar /></span>
                                Amenities
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {ticket.perks.map((perk, idx) => (
                                    <div key={idx} className="flex flex-col items-center justify-center p-6 bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
                                        <BiCheckCircle className="text-3xl text-success mb-3 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-base-content text-sm text-center">{perk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* REVIEWS */}
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold flex items-center gap-3 text-base-content">
                                    <span className="bg-accent text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-accent/30"><LuUsers /></span>
                                    Passenger Reviews
                                </h3>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-warning text-lg font-black">
                                        <FaStar /> 4.8
                                    </div>
                                    <p className="text-xs text-base-content/50 font-medium">124 Verified Reviews</p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-base-100 p-6 rounded-3xl border border-base-200 shadow-sm hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                                        <span className="text-lg">{review.user.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-base-content">{review.user}</h4>
                                                    <p className="text-xs text-base-content/40">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 text-warning text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={i < review.rating ? "" : "text-base-300"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-base-content/70 italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>

                            {/* MODERN REVIEW FORM */}
                            <div className="mt-12 bg-base-100 rounded-[2rem] p-8 md:p-10 shadow-xl border border-base-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-20 -mt-20"></div>
                                <h4 className="font-black text-2xl mb-6 relative z-10">Write a Review</h4>
                                <form onSubmit={(e) => { e.preventDefault(); Swal.fire("Success", "Review submitted successfully!", "success"); }} className="relative z-10 space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-base-content/60 mb-2">How was your journey?</label>
                                        <div className="rating rating-lg gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <input key={star} type="radio" name="rating-9" className="mask mask-star-2 bg-warning" />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-base-content/60 mb-2">Detailed Feedback</label>
                                        <textarea className="textarea textarea-bordered w-full h-32 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-base" placeholder="Describe your experience..."></textarea>
                                    </div>
                                    <button className="btn btn-primary btn-lg rounded-xl w-full md:w-auto px-8 shadow-lg shadow-primary/30">Submit Review</button>
                                </form>
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN (BOOKING STICKY) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">

                            {/* ULTRA MODERN BOOKING CARD */}
                            <div className="bg-base-100/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 relative overflow-hidden ring-1 ring-base-content/5">
                                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>

                                <div className="text-center mb-8">
                                    <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest mb-2">Total Price</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-2xl text-primary font-bold align-top mt-1">৳</span>
                                        <span className="text-6xl font-black text-base-content">{ticket.price}</span>
                                    </div>
                                    <div className={`badge ${ticket.quantity < 5 ? 'badge-error text-white' : 'badge-success text-white'} mt-3 py-3 px-4 font-bold rounded-lg shadow-sm border-none`}>
                                        {ticket.quantity > 0 ? `${ticket.quantity} SEATS LEFT` : 'SOLD OUT'}
                                    </div>
                                </div>

                                {!isSoldOut && !isExpired && (
                                    <button
                                        className="btn btn-primary w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all mb-4"
                                        onClick={() => document.getElementById('booking_modal').showModal()}
                                    >
                                        Book Ticket Now <LuArrowRight className="ml-2" />
                                    </button>
                                )}

                                <div className="text-center">
                                    <p className="text-xs text-base-content/40 font-medium">No hidden fees • Instant confirmation</p>
                                </div>
                            </div>

                            {/* RELATED CARDS */}
                            <div className="bg-base-100 rounded-[2rem] p-6 shadow-lg border border-base-200">
                                <h4 className="font-bold text-lg mb-5 flex items-center gap-2">
                                    <LuBus className="text-primary" /> Similar Options
                                </h4>
                                <div className="space-y-4">
                                    {relatedTickets.map((item) => (
                                        <div key={item.id} className="group p-4 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors border border-transparent hover:border-primary/20 cursor-pointer">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-bold text-base-content group-hover:text-primary transition-colors">{item.operator}</h5>
                                                    <p className="text-xs font-bold text-base-content/40 mt-1">{item.type}</p>
                                                </div>
                                                <span className="text-sm font-black text-base-content">৳{item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODAL (MODERNIZED) --- */}
            <dialog id="booking_modal" className="modal backdrop-blur-md">
                <div className="modal-box rounded-[2rem] p-0 max-w-lg bg-base-100 shadow-2xl">
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                        <h3 className="font-black text-3xl relative z-10">Confirm Seat</h3>
                        <p className="opacity-90 mt-2 relative z-10">Complete your reservation for {ticket.to}</p>
                    </div>

                    <div className="p-8 md:p-10">
                        <form onSubmit={handleBooking} className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-base-content/60 mb-3 uppercase tracking-wider">Number of Seats</label>
                                <div className="flex items-center justify-between bg-base-200 p-2 rounded-2xl border border-base-300">
                                    <button
                                        type="button"
                                        className="w-12 h-12 flex items-center justify-center bg-base-100 rounded-xl shadow-sm hover:scale-105 transition-transform text-xl font-bold"
                                        onClick={() => setBookingQty(q => Math.max(1, q - 1))}
                                    >-</button>
                                    <span className="font-mono text-3xl font-bold w-12 text-center text-primary">{bookingQty}</span>
                                    <button
                                        type="button"
                                        className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-xl shadow-md shadow-primary/30 hover:scale-105 transition-transform text-xl font-bold"
                                        onClick={() => setBookingQty(q => Math.min(ticket.quantity, q + 1))}
                                    >+</button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-6 border-t border-dashed border-base-300">
                                <span className="text-lg font-medium text-base-content/60">Total Amount</span>
                                <span className="text-4xl font-black text-primary">৳{(bookingQty * ticket.price) || 0}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-lg rounded-2xl"
                                    onClick={() => document.getElementById('booking_modal').close()}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/30">
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