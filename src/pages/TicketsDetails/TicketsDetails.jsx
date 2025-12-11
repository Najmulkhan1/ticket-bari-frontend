import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
    LuMapPin, LuCalendar, LuClock, LuUsers, 
    LuCheck, LuShieldCheck, LuBus, LuPlane, 
    LuBadgeAlert // Replaced LuAlertCircle with this safe alternative
} from "react-icons/lu";
// import useAxiosSecure from '../../../hooks/useAxiosSecure'; 
import Swal from 'sweetalert2';

const TicketDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    // const axiosSecure = useAxiosSecure();
    
    // --- STATE ---
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingQty, setBookingQty] = useState(1);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    // --- MOCK FETCH (Replace with your API) ---
    useEffect(() => {
        // MOCK DATA
        setTimeout(() => {
            setTicket({
                _id: '1',
                title: 'Dhaka to Cox\'s Bazar Luxury Night Coach',
                from: 'Dhaka',
                to: 'Cox\'s Bazar',
                transportType: 'Bus',
                price: 1500,
                quantity: 15, // Available seats
                departureDate: '2025-12-31T23:59:00', // Future date
                perks: ['AC', 'Blanket', 'Water', 'WiFi', 'Charging Point', 'Reading Light'],
                vendorName: 'GreenLine Travels',
                vendorEmail: 'support@greenline.com',
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
                description: "Experience the ultimate comfort with our luxury night coach service. Featuring reclining sleeper seats, onboard entertainment, and complimentary snacks."
            });
            setLoading(false);
        }, 500);
    }, [id]);

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
            vendorEmail: ticket.vendorEmail,
            quantity: parseInt(bookingQty),
            totalPrice: parseInt(bookingQty) * ticket.price,
            status: 'pending', 
            bookingDate: new Date()
        };

        try {
            // await axiosSecure.post('/bookings', bookingData);
            console.log("Booking Data Sent:", bookingData);
            
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

    if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-dots loading-lg"></span></div>;

    // --- DISABLED STATE LOGIC ---
    const isSoldOut = ticket.quantity === 0;
    const isButtonDisabled = isExpired || isSoldOut;

    return (
        <div className="min-h-screen bg-base-100 font-sans pb-20">
            
            {/* 1. HERO SECTION */}
            <div className="relative h-[60vh] w-full">
                <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="badge badge-primary font-bold mb-4 p-3">{ticket.transportType} Journey</div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{ticket.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm md:text-base opacity-90">
                            <div className="flex items-center gap-2">
                                <LuMapPin className="text-primary" /> 
                                {ticket.from} <span className="opacity-50">➔</span> {ticket.to}
                            </div>
                            <div className="flex items-center gap-2">
                                <LuUsers className="text-primary" /> 
                                {ticket.quantity} Seats Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COL: Details */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Countdown Timer Card */}
                    <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <LuClock className="text-primary" /> Time Until Departure
                            </h3>
                            {isExpired && <span className="badge badge-error text-white">Departure Time Passed</span>}
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 text-center">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className={`bg-base-200 rounded-2xl p-4 flex flex-col items-center justify-center ${isExpired ? 'opacity-50 grayscale' : ''}`}>
                                    <span className="countdown font-mono text-4xl font-bold">
                                        <span style={{"--value": value}}></span>
                                    </span>
                                    <span className="text-xs uppercase font-bold opacity-50 mt-1">{unit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* About & Perks */}
                    <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200">
                        <h3 className="text-2xl font-bold mb-4">Journey Details</h3>
                        <p className="opacity-70 leading-relaxed mb-6">{ticket.description}</p>
                        
                        <div className="divider"></div>

                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <LuShieldCheck className="text-success" /> Included Perks
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {ticket.perks.map((perk, idx) => (
                                <span key={idx} className="badge badge-lg badge-outline py-4 px-4 border-base-300 bg-base-100">
                                    <LuCheck className="mr-2 text-primary" size={14} /> {perk}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Booking Card (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 rounded-3xl p-8 shadow-2xl border border-primary/10 sticky top-10">
                        <div className="text-center mb-6">
                            <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Price Per Person</p>
                            <h2 className="text-5xl font-extrabold text-primary mt-2">${ticket.price}</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm border-b border-base-200 pb-3">
                                <span className="opacity-60">Departure Date</span>
                                <span className="font-bold">{new Date(ticket.departureDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-base-200 pb-3">
                                <span className="opacity-60">Time</span>
                                <span className="font-bold">{new Date(ticket.departureDate).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between text-sm pb-3">
                                <span className="opacity-60">Vendor</span>
                                <span className="font-bold text-primary">{ticket.vendorName}</span>
                            </div>
                        </div>

                        {/* OPEN MODAL BUTTON */}
                        <button 
                            className={`btn btn-primary w-full btn-lg rounded-2xl shadow-lg shadow-primary/30 transition-all 
                                ${isButtonDisabled ? 'btn-disabled bg-base-300 border-none text-base-content/40 shadow-none' : 'hover:scale-105'}`}
                            onClick={() => document.getElementById('booking_modal').showModal()}
                            disabled={isButtonDisabled}
                        >
                            {isExpired 
                                ? "Departure Time Passed" 
                                : isSoldOut 
                                    ? "Sold Out" 
                                    : "Book Now"
                            }
                        </button>
                        
                        {isButtonDisabled && (
                            <div className="alert alert-warning mt-4 py-2 text-xs flex justify-center">
                                <LuBadgeAlert className="text-lg" /> Booking is currently unavailable
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- BOOKING MODAL --- */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box p-8 rounded-3xl">
                    <h3 className="font-bold text-2xl mb-2">Confirm Booking</h3>
                    <p className="text-sm opacity-60 mb-6">Enter the number of seats you want to reserve.</p>

                    <form onSubmit={handleBooking}>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text font-bold">Quantity (Max: {ticket.quantity})</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <button 
                                    type="button" 
                                    className="btn btn-square btn-outline"
                                    onClick={() => setBookingQty(q => Math.max(1, q - 1))}
                                >-</button>
                                <input 
                                    type="number" 
                                    className="input input-bordered text-center font-bold text-xl w-full focus:input-primary" 
                                    value={bookingQty}
                                    min="1"
                                    max={ticket.quantity}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        // Live Validation to prevent entering more than max
                                        if (val <= ticket.quantity) setBookingQty(val);
                                    }}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="btn btn-square btn-outline"
                                    onClick={() => setBookingQty(q => Math.min(ticket.quantity, q + 1))}
                                >+</button>
                            </div>
                            <label className="label">
                                <span className="label-text-alt">Total Cost:</span>
                                <span className="label-text-alt font-bold text-primary text-lg">
                                    ${(bookingQty * ticket.price) || 0}
                                </span>
                            </label>
                        </div>

                        <div className="modal-action grid grid-cols-2 gap-4">
                            <button 
                                type="button" 
                                className="btn btn-ghost hover:bg-base-200"
                                onClick={() => document.getElementById('booking_modal').close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Confirm Payment
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default TicketDetails;