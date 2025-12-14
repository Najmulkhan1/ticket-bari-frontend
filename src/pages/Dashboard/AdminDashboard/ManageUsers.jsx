import React from 'react'

import  { useEffect, useState } from 'react';
import { 
    LuUsers, LuShield, LuStore, LuBan, 
    LuSearch, LuMail, LuUser, LuCheck 
} from "react-icons/lu";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    
    const [loading] = useState(false);
    const [search, setSearch] = useState('');


    const {data: users = [], isLoading, refetch} = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        }
    })

    // --- HANDLE ROLE CHANGE (Admin/Vendor) ---
    const handleMakeRole = (user, newRole) => {
        if(user.role === newRole) return;

        Swal.fire({
            title: `Make ${newRole}?`,
            text: `Promote ${user.name} to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, promote!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    // API Call
                    // await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
                    await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });

                    Swal.fire("Success", `${user.displayName} is now a ${newRole}.`, "success");
                    refetch();
                } catch (error) {
                    Swal.fire("Error", "Failed to update role.", "error");
                }
            }
        });
    };

    // --- HANDLE MARK AS FRAUD ---
    const handleMarkFraud = (user) => {
        Swal.fire({
            title: "Mark as Fraud?",
            text: "This will hide all their tickets and ban them from adding new ones. This action is severe.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Mark Fraud!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                  

                    // API Call
                    const res = await axiosSecure.patch(`/users/fraud/${user._id}`);

                    console.log(res.data);
                    if(res.data.updateUserResult.modifiedCount > 0){
                        refetch();
                        Swal.fire("Banned!", "Vendor marked as fraud.", "success");
                    }

                } catch (error) {
                    Swal.fire("Error", "Failed to update status.", "error");
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
                            <LuUsers className="text-primary" /> Manage Users
                        </h1>
                        <p className="text-sm opacity-60 mt-1">Control user roles and monitor vendor activities.</p>
                    </div>
                    
                    {/* Search (Visual) */}
                    <div className="relative w-full md:w-72">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                        <p>Search: {search}</p>
                        <input 
                        onChange={(e) => setSearch(e.target.value)}
                            type="text" 
                            placeholder="Search name or email..." 
                            className="input input-bordered pl-10 w-full rounded-xl focus:input-primary"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table align-middle">
                            {/* Head */}
                            <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="py-5 pl-6">User Profile</th>
                                    <th>Role</th>
                                    <th className="text-right pr-6">Actions</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-base-200/40 transition-colors border-b border-base-100 last:border-none">
                                        
                                        {/* 1. Profile Info */}
                                        <td className="pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.photoUrl} alt={user.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold flex items-center gap-2">
                                                        {user.displayName}
                                                    </div>
                                                    <div className="text-xs opacity-50 flex items-center gap-1 mt-0.5">
                                                        <LuMail size={12} /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 2. Role Badge */}
                                        <td>
                                            {user.role === 'admin' && (
                                                <span className="badge badge-primary badge-outline gap-1 font-bold p-3">
                                                    <LuShield size={12} /> Admin
                                                </span>
                                            )}
                                            {user.role === 'vendor' && (
                                                <span className="badge badge-secondary badge-outline gap-1 font-bold p-3">
                                                    <LuStore size={12} /> Vendor
                                                </span>
                                            )}
                                            {user.role === 'user' && (
                                                <span className="badge badge-ghost badge-outline gap-1 font-bold p-3">
                                                    <LuUser size={12} /> User
                                                </span>
                                            )}
                                            {user.role === 'fraud' && (
                                                <span className="badge badge-error text-white gap-1 font-bold p-3">
                                                    <LuBan size={12} /> FRAUD
                                                </span>
                                            )}
                                        </td>

                                        {/* 3. Action Buttons */}
                                        <td className="text-right pr-6">
                                            <div className="flex justify-end gap-2">
                                                
                                                {/* Make Admin */}
                                                <button 
                                                    onClick={() => handleMakeRole(user, 'admin')}
                                                    disabled={user.role === 'admin' || user.role === 'fraud'}
                                                    className="btn btn-sm btn-ghost bg-base-200 hover:bg-primary hover:text-white tooltip"
                                                    data-tip="Make Admin"
                                                >
                                                    <LuShield />
                                                </button>

                                                {/* Make Vendor */}
                                                <button 
                                                    onClick={() => handleMakeRole(user, 'vendor')}
                                                    disabled={user.role === 'vendor' || user.role === 'admin' || user.role === 'fraud'}
                                                    className="btn btn-sm btn-ghost bg-base-200 hover:bg-secondary hover:text-white tooltip"
                                                    data-tip="Make Vendor"
                                                >
                                                    <LuStore />
                                                </button>

                                                {/* Mark as Fraud (Only for Vendors) */}
                                                {user.role === 'vendor' && (
                                                    <button 
                                                        onClick={() => handleMarkFraud(user)}
                                                        className="btn btn-sm btn-error text-white shadow-sm hover:shadow-error/40 tooltip"
                                                        data-tip="Mark as Fraud"
                                                    >
                                                        <LuBan />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="text-center mt-6 text-xs text-base-content/40">
                    Total Users: {users.length}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;