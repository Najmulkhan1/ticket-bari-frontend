import React, { useEffect, useState } from 'react';
import {
  LuUser, LuMail, LuCheck, LuX, LuTicket,
  LuBadgeAlert, // FIXED: Replaced LuAlertCircle with LuBadgeAlert
  LuLoader
} from "react-icons/lu";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const RequestedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth()

  // --- FETCH DATA ---
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/bookings-request?vendorEmail=${user?.email}`);
      return res.data;
    }
  })

  // --- HANDLER: Update Status ---
  const handleStatusUpdate = (id, newStatus) => {
    const actionText = newStatus === 'accepted' ? 'Accept' : 'Reject';
    const color = newStatus === 'accepted' ? '#22c55e' : '#ef4444';

    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText} this booking request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Update Local State Optimistically
          // const targetBooking = bookings.find(b => b._id === id);
          // const updatedBooking = { ...targetBooking, status: newStatus };

          // API Call
        const res = await axiosSecure.patch(`/bookings/${id}`, {status: newStatus});
          console.log(res);

          refetch();

          Swal.fire({
            title: "Updated!",
            text: `Booking has been ${newStatus}.`,
            icon: "success",
            timer: 1500
          });
        } catch (error) {
          Swal.fire("Error", "Could not update status", "error");
        }
      }
    });
  };

  if (loading) return <div className="flex justify-center py-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

  return (
    <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-10 font-sans min-h-[500px]">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LuTicket className="text-primary" /> Booking Requests
          </h2>
          <p className="text-sm opacity-60 mt-1">Manage incoming ticket requests from users.</p>
        </div>
        <div className="badge badge-primary badge-outline font-bold p-4">
          {bookings?.filter(b => b.status === 'pending')?.length} Pending Requests
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table align-middle">
          {/* Head */}
          <thead className="bg-base-200/50 text-base-content uppercase text-xs font-bold">
            <tr>
              <th className="py-4 rounded-l-xl">User Details</th>
              <th>Ticket Info</th>
              <th>Pricing</th>
              <th>Status</th>
              <th className="text-right rounded-r-xl">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {bookings?.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 opacity-50">
                  <div className="flex flex-col items-center gap-2">
                    {/* FIXED: Using LuBadgeAlert here */}
                    <LuBadgeAlert size={40} />
                    <span className="font-bold">No booking requests found</span>
                  </div>
                </td>
              </tr>
            ) : (
              bookings?.map((booking) => (
                <tr key={booking._id} className="hover:bg-base-200/30 transition-colors border-b border-base-100 last:border-none">

                  {/* 1. User Info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.image} alt="avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-1">
                          {booking.name}
                        </div>
                        <div className="text-xs opacity-60 flex items-center gap-1">
                          <LuMail size={10} /> {booking.ticket.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Ticket Info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={booking.ticketImage} alt="Ticket" />
                      </div>
                      <div className="max-w-[150px]">
                        <div className="font-bold text-xs truncate" title={booking.ticketTitle}>
                          {booking.ticketTitle}
                        </div>
                        <div className="text-[10px] opacity-60 mt-1">
                          Req: {new Date(booking.bookingDate).toLocaleString([], {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Pricing */}
                  <td>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">
                        ${booking.ticket.price * booking.quantity}
                      </span>
                      <span className="text-xs opacity-60">
                        {booking.quantity} x ${booking.ticket.price}
                      </span>
                    </div>
                  </td>

                  {/* 4. Status Badge */}
                  <td>
                    <div className={`badge gap-2 font-bold text-xs p-3
                                            ${booking.status === 'accepted' ? 'badge-success text-white' : ''}
                                            ${booking.status === 'rejected' ? 'badge-error text-white' : ''}
                                            ${booking.status === 'pending' ? 'badge-warning text-white' : ''}
                                        `}>
                      {booking.status === 'accepted' && <LuCheck size={12} />}
                      {booking.status === 'rejected' && <LuX size={12} />}
                      {booking.status === 'pending' && <LuLoader size={12} className="animate-spin" />}
                      {booking.status.toUpperCase()}
                    </div>
                  </td>

                  {/* 5. Actions Buttons */}
                  <td className="text-right">
                    {booking.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                          className="btn btn-sm btn-success text-white shadow-md hover:shadow-success/50 tooltip"
                          data-tip="Accept Booking"
                        >
                          <LuCheck />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                          className="btn btn-sm btn-error text-white shadow-md hover:shadow-error/50 tooltip"
                          data-tip="Reject Booking"
                        >
                          <LuX />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs opacity-40 font-mono italic">
                        Action Taken
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;