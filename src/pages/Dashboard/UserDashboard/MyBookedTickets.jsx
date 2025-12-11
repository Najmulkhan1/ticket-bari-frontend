import React, { useEffect, useState } from 'react';
import {
    LuMapPin, LuClock, LuCreditCard,
    LuCheck, LuX, LuLoader, LuTicket, LuCalendar
} from "react-icons/lu";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Your custom hook

// --- CHILD COMPONENT: Individual Booking Card ---
import BookingCard from '../../../components/BookingCard';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

// --- PARENT COMPONENT: Grid Layout ---
const MyBookedTickets = () => {
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(false);

    const { user } = useAuth()
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['my-bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-bookings?email=${user.email}`)
            return res.data
        }
    })

    // REAL API CALL:
    // axiosSecure.get(`/my-bookings/${user.email}`)
    //    .then(res => setBookings(res.data));

    // Handle Pay Now Click
    const handlePayNow = async (booking, amount) => {
        // Here you would typically redirect to a payment route or open a Stripe Modal
        // Example: navigate(`/payment/${booking._id}`)

        console.log(`Processing payment for booking ${booking._id}: $${amount}`);

        // Mocking successful payment flow for demo
        Swal.fire({
            title: "Redirecting to Stripe...",
            text: `Total to pay: $${amount}`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Simulate Payment Success"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // In real app, this happens via webhook or payment success callback
                // Update local state to show 'paid' immediately for UI demo
                const updatedBookings = bookings.map(b =>
                    b._id === booking._id ? { ...b, status: 'paid' } : b
                );

                // Call Backend to update status and reduce quantity
                // await axiosSecure.patch(`/booking/pay/${booking._id}`);

                Swal.fire("Paid!", "Ticket booked successfully.", "success");
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1>{bookings.length}</h1>
                <div className="flex items-center gap-3 mb-8">
                    <LuTicket className="text-primary text-3xl" />
                    <div>
                        <h1 className="text-3xl font-bold">My Bookings</h1>
                        <p className="opacity-60 text-sm">Track your journey status and payments.</p>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 opacity-50">
                        <h3 className="text-2xl font-bold">No bookings found</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <BookingCard
                                key={booking._id}
                                booking={booking}
                                onPay={handlePayNow}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookedTickets;