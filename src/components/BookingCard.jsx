import { useState } from "react";
import { useEffect } from "react";
import { LuMapPin, LuCalendar, LuClock, LuUsers, LuCheck, LuShieldCheck, LuBus, LuPlane, LuBadgeAlert, LuCreditCard, LuX } from "react-icons/lu";


const BookingCard = ({ booking, onPay }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isExpired, setIsExpired] = useState(false);

    // Calculate time difference
    function calculateTimeLeft() {
        const difference = new Date(booking.ticket?.departureDate) - new Date();
        if (difference > 0) {
            return {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60)
            };
        }
        return null; // Expired
    }

    // Timer Effect
    useEffect(() => {
        // If rejected, we don't need the timer
        if (booking.status === 'rejected') return;

        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            if (left) {
                setTimeLeft(left);
            } else {
                setIsExpired(true);
                clearInterval(timer);
            }
        }, 1000);

        // Initial check for expiration
        if (new Date(booking.ticket?.departureDate) < new Date()) {
            setIsExpired(true);
        }

        return () => clearInterval(timer);
    }, [booking.ticket?.departureDate, booking.status]);

    const totalPrice = booking.price * booking.quantity;

    // Helper for Status Badge Color
    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'badge-info text-white';
            case 'paid': return 'badge-success text-white';
            case 'rejected': return 'badge-error text-white';
            default: return 'badge-warning text-white';
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden group flex flex-col h-full">

            {/* Image & Header */}
            <div className="relative h-48">
                <img
                    src={booking.ticket?.image}
                    alt={booking.ticket?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 right-3 badge ${getStatusColor(booking.status)} uppercase font-bold shadow-md p-3`}>
                    {booking.status}
                </div>
            </div>

            {/* Body */}
            <div className="card-body p-6 flex-grow">
                <h2 className="card-title text-lg font-bold line-clamp-1">{booking.ticket?.title}</h2>

                {/* Route */}
                <div className="flex items-center gap-2 text-sm text-base-content/70 mb-2">
                    <LuMapPin className="text-primary" />
                    <span className="font-semibold">{booking.ticket?.from}</span>
                    <span>→</span>
                    <span className="font-semibold">{booking.ticket?.to}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-base-content/70 mb-4">
                    <LuCalendar className="text-secondary" />
                    <span>{new Date(booking.ticket?.departureDate).toLocaleString()}</span>
                </div>

                {/* Financials */}
                <div className="bg-base-200/50 rounded-xl p-3 mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="block opacity-60 text-xs uppercase">Qty</span>
                        <span className="font-bold">{booking.quantity} Tickets</span>
                    </div>
                    <div className="text-right">
                        <span className="block opacity-60 text-xs uppercase">Total</span>
                        <span className="font-extrabold text-primary text-lg">${booking.ticket?.price * booking.quantity}</span>
                    </div>
                </div>

                {/* Countdown Section (Hidden if Rejected) */}
                {booking.status !== 'rejected' && (
                    <div className="mb-4">
                        {isExpired ? (
                            <div className="text-error text-xs font-bold flex items-center gap-1 justify-center bg-error/10 p-2 rounded-lg">
                                <LuClock /> Departure time passed
                            </div>
                        ) : (
                            timeLeft && (
                                <div className="grid grid-flow-col gap-2 text-center auto-cols-max justify-center p-2 bg-neutral text-neutral-content rounded-xl text-xs">
                                    <div className="flex flex-col"><span className="countdown font-mono text-sm"><span style={{ "--value": timeLeft.d }}></span></span>d</div>
                                    <div className="flex flex-col"><span className="countdown font-mono text-sm"><span style={{ "--value": timeLeft.h }}></span></span>h</div>
                                    <div className="flex flex-col"><span className="countdown font-mono text-sm"><span style={{ "--value": timeLeft.m }}></span></span>m</div>
                                    <div className="flex flex-col"><span className="countdown font-mono text-sm"><span style={{ "--value": timeLeft.s }}></span></span>s</div>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Action Footer */}
                <div className="mt-auto pt-2">
                    {booking.status === 'accepted' && (
                        <button
                            onClick={() => onPay(booking, booking.ticket?.price * booking.quantity)}
                            disabled={isExpired} // Requirement: Cannot pay if expired
                            className="btn btn-primary w-full shadow-lg shadow-primary/30"
                        >
                            {isExpired ? 'Expired' : <><LuCreditCard /> Pay Now</>}
                        </button>
                    )}

                    {booking.status === 'paid' && (
                        <button className="btn btn-success btn-outline w-full cursor-default no-animation">
                            <LuCheck /> Payment Complete
                        </button>
                    )}

                    {booking.status === 'pending' && (
                        <button className="btn btn-ghost w-full cursor-default text-base-content/50 italic bg-base-200">
                            Waiting for Approval...
                        </button>
                    )}

                    {booking.status === 'rejected' && (
                        <button className="btn btn-error btn-outline w-full cursor-default">
                            <LuX /> Booking Rejected
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;