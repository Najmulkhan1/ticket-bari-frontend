import React, { useEffect, useState } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    BarChart, Bar, Legend, Cell 
} from 'recharts';
import { 
    LuDollarSign, LuTicket, LuLayers, 
    LuTrendingUp, LuTrendingDown 
} from "react-icons/lu";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalSold: 0,
        totalAdded: 0
    });
    const [chartData, setChartData] = useState([]);

    // --- FETCH DATA ---
    useEffect(() => {
        // MOCK DATA GENERATION
        // In real app: const res = await axiosSecure.get('/admin/revenue-stats');
        
        const mockChartData = [
            { name: 'Jan', revenue: 4000, sold: 24, added: 40 },
            { name: 'Feb', revenue: 3000, sold: 18, added: 35 },
            { name: 'Mar', revenue: 5000, sold: 30, added: 50 },
            { name: 'Apr', revenue: 2780, sold: 15, added: 30 },
            { name: 'May', revenue: 7890, sold: 50, added: 65 },
            { name: 'Jun', revenue: 6390, sold: 40, added: 45 },
            { name: 'Jul', revenue: 8490, sold: 60, added: 70 },
        ];

        // Calculate Totals from mock data
        const totals = mockChartData.reduce((acc, curr) => ({
            totalRevenue: acc.totalRevenue + curr.revenue,
            totalSold: acc.totalSold + curr.sold,
            totalAdded: acc.totalAdded + curr.added
        }), { totalRevenue: 0, totalSold: 0, totalAdded: 0 });

        setTimeout(() => {
            setChartData(mockChartData);
            setStats(totals);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <LuTrendingUp className="text-primary" /> Financial Overview
                    </h1>
                    <p className="opacity-60 text-sm mt-1">Track platform performance and ticket sales metrics.</p>
                </div>

                {/* --- 1. KEY METRICS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Card 1: Revenue */}
                    <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                        <div className="stat-figure text-success p-3 bg-success/10 rounded-2xl">
                            <LuDollarSign size={28} />
                        </div>
                        <div className="stat-title font-bold opacity-60">Total Revenue</div>
                        <div className="stat-value text-success text-4xl">
                            ${stats.totalRevenue.toLocaleString()}
                        </div>
                        <div className="stat-desc flex items-center gap-1 text-success font-medium mt-1">
                            <LuTrendingUp /> +12% from last month
                        </div>
                    </div>

                    {/* Card 2: Sold */}
                    <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                        <div className="stat-figure text-primary p-3 bg-primary/10 rounded-2xl">
                            <LuTicket size={28} />
                        </div>
                        <div className="stat-title font-bold opacity-60">Tickets Sold</div>
                        <div className="stat-value text-primary text-4xl">
                            {stats.totalSold}
                        </div>
                        <div className="stat-desc flex items-center gap-1 text-primary font-medium mt-1">
                            <LuTrendingUp /> +5% new bookings
                        </div>
                    </div>

                    {/* Card 3: Added */}
                    <div className="stat bg-base-100 shadow-xl rounded-3xl border border-base-200">
                        <div className="stat-figure text-secondary p-3 bg-secondary/10 rounded-2xl">
                            <LuLayers size={28} />
                        </div>
                        <div className="stat-title font-bold opacity-60">Total Tickets Added</div>
                        <div className="stat-value text-secondary text-4xl">
                            {stats.totalAdded}
                        </div>
                        <div className="stat-desc flex items-center gap-1 text-error font-medium mt-1">
                            <LuTrendingDown /> Inventory stable
                        </div>
                    </div>
                </div>

                {/* --- 2. INTERACTIVE CHARTS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Revenue Area Chart */}
                    <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-200">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            Revenue Analytics <span className="badge badge-sm badge-ghost font-normal">Last 7 Months</span>
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        formatter={(value) => [`$${value}`, 'Revenue']}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="revenue" 
                                        stroke="#22c55e" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sales vs Inventory Bar Chart */}
                    <div className="bg-base-100 p-6 rounded-3xl shadow-xl border border-base-200">
                        <h3 className="text-xl font-bold mb-6">Sales vs Inventory</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} barSize={12}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar dataKey="sold" name="Tickets Sold" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="added" name="Tickets Added" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;