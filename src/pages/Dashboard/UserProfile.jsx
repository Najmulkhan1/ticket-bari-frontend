import React, { useEffect, useState } from 'react';
import { 
    LuMail, LuShield, LuStore, LuUser, 
    LuMapPin, LuCalendar,  LuLogOut, 
    LuPhone
} from "react-icons/lu";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { BiEdit } from 'react-icons/bi';
import { PiChatCircle } from 'react-icons/pi';

const UserProfile = () => {
    const { user, logOut } = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // --- MOCK DATA ---
        const mockUser = {
            displayName: user?.displayName || "Md Nazmul Khan Mukit",
            email: user?.email || "nazmul@example.com",
            photoURL: user?.photoURL || "https://i.pravatar.cc/300?img=12",
            role: "admin", 
            phone: "+880 1712 345678",
            address: "Dhaka, Bangladesh",
            joinDate: "November 2025"
        };

        // REAL API CALL:
        // axiosSecure.get(`/users/${user?.email}`).then(res => {
        //     setProfileData(res.data);
        //     setLoading(false);
        // });

        setTimeout(() => {
            setProfileData(mockUser);
            setLoading(false);
        }, 800);
    }, [user, axiosSecure]);

    // Helper: Dynamic Theme based on Role
    const getRoleTheme = (role) => {
        switch (role) {
            case 'admin':
                return { 
                    gradient: 'from-purple-600 to-indigo-600',
                    shadow: 'shadow-purple-500/30',
                    iconColor: 'text-purple-600',
                    badge: 'badge-primary',
                    icon: <LuShield />
                };
            case 'vendor':
                return { 
                    gradient: 'from-blue-500 to-cyan-500',
                    shadow: 'shadow-blue-500/30',
                    iconColor: 'text-blue-600',
                    badge: 'badge-secondary',
                    icon: <LuStore />
                };
            default: // User
                return { 
                    gradient: 'from-emerald-500 to-green-500',
                    shadow: 'shadow-green-500/30',
                    iconColor: 'text-green-600',
                    badge: 'badge-accent',
                    icon: <LuUser />
                };
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    const theme = getRoleTheme(profileData.role);

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 md:px-8 font-sans flex justify-center items-center">
            
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* --- LEFT SIDEBAR: PROFILE CARD (4 cols) --- */}
                <div className="lg:col-span-4">
                    <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
                        <div className="card-body items-center text-center p-8">
                            
                            {/* Avatar with Ring */}
                            <div className={`avatar mb-4`}>
                                <div className={`w-32 rounded-full ring ring-offset-base-100 ring-offset-2 ${theme.iconColor.replace('text-', 'ring-')}`}>
                                    <img src={profileData.photoURL} alt="Profile" />
                                </div>
                                <span className="absolute bottom-0 right-0 p-2 bg-base-100 rounded-full shadow-md border border-base-200 text-primary cursor-pointer hover:bg-base-200 transition-colors">
                                    <BiEdit size={16} />
                                </span>
                            </div>

                            <h2 className="card-title text-2xl font-bold">{profileData.displayName}</h2>
                            <p className="text-sm opacity-60 font-medium mb-4">{profileData.email}</p>

                            {/* Role Badge */}
                            <div className={`badge ${theme.badge} gap-2 p-4 w-full justify-center uppercase font-bold tracking-wider shadow-lg ${theme.shadow}`}>
                                {theme.icon} {profileData.role}
                            </div>

                            <div className="divider my-6"></div>

                            {/* Stats or Quick Info */}
                            <div className="w-full space-y-4 text-left">
                                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                                    <div className={`p-2 rounded-lg bg-base-100 ${theme.iconColor}`}>
                                        <LuMapPin />
                                    </div>
                                    <div className="text-sm">
                                        <p className="opacity-50 text-xs font-bold uppercase">Location</p>
                                        <p className="font-semibold">{profileData.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-xl">
                                    <div className={`p-2 rounded-lg bg-base-100 ${theme.iconColor}`}>
                                        <LuCalendar />
                                    </div>
                                    <div className="text-sm">
                                        <p className="opacity-50 text-xs font-bold uppercase">Joined</p>
                                        <p className="font-semibold">{profileData.joinDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions w-full mt-8">
                                <button 
                                    onClick={logOut} 
                                    className="btn btn-error btn-outline w-full gap-2 rounded-xl"
                                >
                                    <LuLogOut /> Logout Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT CONTENT: DETAILS (8 cols) --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Welcome Banner */}
                    <div className={`rounded-3xl p-8 text-white bg-gradient-to-r ${theme.gradient} shadow-lg relative overflow-hidden`}>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Welcome Back, {profileData.displayName.split(' ')[0]}!</h1>
                            <p className="opacity-90">Manage your profile information and account security settings here.</p>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Personal Info Form/Display */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <LuUser className={theme.iconColor} /> Profile Information
                                </h3>
                                <button className="btn btn-sm btn-ghost">Edit</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-60">Full Name</span>
                                    </label>
                                    <input type="text" value={profileData.displayName} readOnly className="input input-bordered bg-base-200/30 focus:bg-base-100 font-semibold" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-60">Email Address</span>
                                    </label>
                                    <input type="text" value={profileData.email} readOnly className="input input-bordered bg-base-200/30 focus:bg-base-100 font-semibold" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-60">Phone Number</span>
                                    </label>
                                    <div className="relative">
                                        <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                                        <input type="text" value={profileData.phone} readOnly className="input input-bordered bg-base-200/30 pl-10 font-semibold w-full" />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-60">Address</span>
                                    </label>
                                    <div className="relative">
                                        <LuMapPin className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                                        <input type="text" value={profileData.address} readOnly className="input input-bordered bg-base-200/30 pl-10 font-semibold w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Status Card */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body p-8 flex-row items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-1">Account Status</h3>
                                <p className="text-sm opacity-60">Your account is fully verified and active.</p>
                            </div>
                            <div className="flex items-center gap-2 text-success font-bold bg-success/10 px-4 py-2 rounded-full border border-success/20">
                                <PiChatCircle /> Active
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;