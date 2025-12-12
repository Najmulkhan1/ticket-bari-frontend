import React, { useEffect, useState } from 'react';
import { 
    LuCreditCard, LuCalendar, LuTicket, LuSearch, 
    LuArrowUpRight, LuFileText 
} from "react-icons/lu";
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Your custom hook

const TransactionHistory = () => {
    const axiosSecure = useAxiosSecure();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- FETCH DATA ---
    useEffect(() => {
        // MOCK DATA (Replace with your API call)
        const mockData = [
            {
                _id: 'tx_1',
                transactionId: 'pi_3M9uO2LkdIwHu7ix0',
                amount: 1500,
                ticketTitle: "Dhaka to Cox's Bazar Luxury",
                paymentDate: '2025-12-10T14:30:00'
            },
            {
                _id: 'tx_2',
                transactionId: 'pi_3M9uO2LkdIwHu7ix1',
                amount: 5000,
                ticketTitle: "Dhaka to Bangkok Flight",
                paymentDate: '2025-12-08T09:15:00'
            },
            {
                _id: 'tx_3',
                transactionId: 'pi_3M9uO2LkdIwHu7ix2',
                amount: 800,
                ticketTitle: "Sylhet Express Train",
                paymentDate: '2025-12-05T18:45:00'
            },
            {
                _id: 'tx_4',
                transactionId: 'pi_3M9uO2LkdIwHu7ix3',
                amount: 2000,
                ticketTitle: "Barisal Launch Cabin",
                paymentDate: '2025-12-01T11:20:00'
            }
        ];

        // Simulate API call
        setTimeout(() => {
            setTransactions(mockData);
            setLoading(false);
        }, 600);

        // REAL API:
        // axiosSecure.get('/payments/history').then(res => setTransactions(res.data));
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-10 font-sans min-h-[600px]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
                        <LuCreditCard className="text-primary" /> Payment History
                    </h2>
                    <p className="text-sm opacity-60 mt-1">Track your Stripe transactions and ticket purchases.</p>
                </div>
                
                {/* Visual Search Bar */}
                <div className="relative w-full md:w-64">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        type="text" 
                        placeholder="Search ID..." 
                        className="input input-bordered pl-10 w-full bg-base-200/50 focus:bg-base-100 focus:input-primary transition-all rounded-xl"
                    />
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-xl border border-base-200">
                <table className="table table-zebra w-full align-middle">
                    
                    {/* Table Head */}
                    <thead className="bg-base-200 text-base-content uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="py-4">Transaction ID</th>
                            <th>Ticket Details</th>
                            <th>Date & Time</th>
                            <th className="text-right">Amount</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-16 opacity-50">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-4 bg-base-200 rounded-full">
                                            <LuFileText size={32} />
                                        </div>
                                        <span className="font-bold text-lg">No transactions found</span>
                                        <span className="text-sm">You haven't purchased any tickets yet.</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-base-200/50 transition-colors">
                                    
                                    {/* 1. Transaction ID */}
                                    <td>
                                        <div className="font-mono text-xs font-bold bg-base-200 px-2 py-1 rounded inline-block select-all cursor-pointer hover:bg-base-300">
                                            {tx.transactionId}
                                        </div>
                                    </td>

                                    {/* 2. Ticket Title */}
                                    <td>
                                        <div className="flex items-center gap-2 font-semibold">
                                            <LuTicket className="text-primary opacity-70" />
                                            <span className="truncate max-w-[200px]" title={tx.ticketTitle}>
                                                {tx.ticketTitle}
                                            </span>
                                        </div>
                                    </td>

                                    {/* 3. Payment Date */}
                                    <td>
                                        <div className="flex flex-col text-sm">
                                            <span className="font-medium flex items-center gap-1.5">
                                                <LuCalendar size={12} className="opacity-60" /> 
                                                {new Date(tx.paymentDate).toLocaleDateString()}
                                            </span>
                                            <span className="text-xs opacity-50 ml-4.5">
                                                {new Date(tx.paymentDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                    </td>

                                    {/* 4. Amount */}
                                    <td className="text-right">
                                        <span className="font-extrabold text-base text-base-content">
                                            ${tx.amount.toLocaleString()}
                                        </span>
                                    </td>

                                    {/* 5. Status (Static 'Paid' for history) */}
                                    <td className="text-center">
                                        <div className="badge badge-success badge-sm gap-1 text-white font-bold py-3">
                                            Success <LuArrowUpRight size={10} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination (Visual) */}
            <div className="flex justify-between items-center mt-6 text-xs opacity-60">
                <span>Showing {transactions.length} recent transactions</span>
                <div className="join">
                    <button className="join-item btn btn-xs">«</button>
                    <button className="join-item btn btn-xs btn-active">1</button>
                    <button className="join-item btn btn-xs">»</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;