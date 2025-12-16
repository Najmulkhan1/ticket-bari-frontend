import React, { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { 
    LuMapPin, LuCalendar, LuClock, LuArrowRight, 
    LuUsers, LuTag, LuSearch, LuFilter, 
    LuArrowUpDown, LuChevronLeft, LuChevronRight 
} from "react-icons/lu";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();

    // --- States for Search, Filter, Sort, Pagination ---
    const [searchTerm, setSearchTerm] = useState('');
    const [transportFilter, setTransportFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // --- Data Fetching ---
    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-tickets');
            return res.data;
        }
    });

    // --- Processing Data (Search -> Filter -> Sort) ---
    const processedTickets = useMemo(() => {
        let result = [...tickets];

        // 1. Search by From or To Location
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(ticket => 
                ticket.from.toLowerCase().includes(lowerTerm) || 
                ticket.to.toLowerCase().includes(lowerTerm)
            );
        }

        // 2. Filter by Transport Type
        if (transportFilter !== 'All') {
            result = result.filter(ticket => ticket.transportType === transportFilter);
        }

        // 3. Sort by Price
        if (sortOrder === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [tickets, searchTerm, transportFilter, sortOrder]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(processedTickets.length / itemsPerPage);
    const paginatedTickets = processedTickets.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    // Reset page to 1 if search/filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, transportFilter, sortOrder]);

    // Get unique transport types for the filter dropdown
    const uniqueTransportTypes = ['All', ...new Set(tickets.map(item => item.transportType))];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 pt-24 md:px-8 font-sans">
            
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-10 text-center">
                <h1 className="text-4xl font-extrabold mb-3 text-base-content">
                    Available <span className="text-primary">Journeys</span>
                </h1>
                <p className="text-base-content/60 max-w-2xl mx-auto">
                    Explore our admin-verified tickets for a safe and comfortable journey. 
                    Book your next destination today.
                </p>
            </div>

            {/* --- Control Bar (Search, Filter, Sort) --- */}
            <div className="max-w-7xl mx-auto mb-8 bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Input */}
                <div className="relative w-full md:w-1/3">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input 
                        type="text" 
                        placeholder="Search by Location (From/To)..." 
                        className="input input-bordered w-full pl-10 focus:outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Transport Filter */}
                    <div className="form-control w-full sm:w-auto">
                        <div className="relative">
                            <LuFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                            <select 
                                className="select select-bordered pl-10 w-full sm:w-48"
                                value={transportFilter}
                                onChange={(e) => setTransportFilter(e.target.value)}
                            >
                                {uniqueTransportTypes.map((type, idx) => (
                                    <option key={idx} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Price Sort */}
                    <div className="form-control w-full sm:w-auto">
                        <div className="relative">
                            <LuArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                            <select 
                                className="select select-bordered pl-10 w-full sm:w-48"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">Sort by Price</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Grid Container --- */}
            {paginatedTickets.length > 0 ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedTickets.map((ticket) => (
                        <div key={ticket._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden flex flex-col h-full group">
                            
                            {/* Image Section */}
                            <figure className="relative h-56 overflow-hidden">
                                <img 
                                    src={ticket.image} 
                                    alt={ticket.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute top-4 right-4 badge badge-neutral text-white font-bold p-3 shadow-lg">
                                    {ticket.transportType}
                                </div>
                                <div className={`absolute bottom-4 left-4 badge ${ticket.quantity < 10 ? 'badge-error text-white' : 'badge-primary text-primary-content'} p-3 shadow-lg gap-2 font-semibold`}>
                                    <LuUsers /> {ticket.quantity} Seats Left
                                </div>
                            </figure>

                            {/* Card Body */}
                            <div className="card-body p-6 flex-grow">
                                <h2 className="card-title text-xl font-bold text-base-content mb-2 line-clamp-2 min-h-[3.5rem]">
                                    {ticket.title}
                                </h2>

                                {/* Route */}
                                <div className="flex items-center justify-between bg-base-200/50 p-3 rounded-xl mb-4">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <LuMapPin className="text-primary shrink-0" />
                                        <span className="font-semibold truncate text-sm">{ticket.from}</span>
                                    </div>
                                    <LuArrowRight className="text-base-content/30 mx-2 shrink-0" />
                                    <div className="flex items-center gap-2 overflow-hidden justify-end">
                                        <span className="font-semibold truncate text-sm text-right">{ticket.to}</span>
                                        <LuMapPin className="text-secondary shrink-0" />
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="flex items-center gap-4 text-sm text-base-content/70 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <LuCalendar className="text-primary" />
                                        <span>{new Date(ticket.departureDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="w-px h-4 bg-base-content/20"></div>
                                    <div className="flex items-center gap-1.5">
                                        <LuClock className="text-secondary" />
                                        <span>{new Date(ticket.departureDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                </div>

                                {/* Perks */}
                                <div className="mb-6">
                                    <p className="text-xs font-bold text-base-content/40 uppercase mb-2 flex items-center gap-1">
                                        <LuTag size={12} /> Included Perks
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {ticket.perks?.slice(0, 3).map((perk, idx) => (
                                            <span key={idx} className="badge badge-sm badge-outline text-xs bg-base-100 border-base-300 text-base-content/70">
                                                {perk}
                                            </span>
                                        ))}
                                        {ticket.perks?.length > 3 && (
                                            <span className="badge badge-sm badge-ghost text-xs">+{ticket.perks.length - 3} more</span>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-base-200 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-base-content/50 font-bold uppercase">Price per person</p>
                                        <p className="text-2xl font-extrabold text-primary">
                                            ${ticket.price}
                                        </p>
                                    </div>
                                    <Link to={`/tickets-details/${ticket._id}`}>
                                        <button className="btn btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all rounded-xl gap-2">
                                            See Details <LuArrowRight />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-20 bg-base-100 rounded-3xl shadow-sm border border-base-200">
                    <div className="bg-base-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LuSearch className="text-2xl opacity-40" />
                    </div>
                    <h3 className="text-2xl font-bold">No tickets found</h3>
                    <p className="text-base-content/60 max-w-md mx-auto mt-2">
                        We couldn't find any tickets matching your search or filters. Try adjusting your criteria.
                    </p>
                    <button 
                        onClick={() => {setSearchTerm(''); setTransportFilter('All'); setSortOrder('default')}}
                        className="btn btn-outline btn-sm mt-4"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
            
            {/* --- Pagination Controls --- */}
            {processedTickets.length > itemsPerPage && (
                <div className="flex justify-center mt-12 gap-2">
                    <button 
                        className="btn btn-square btn-outline border-base-300"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <LuChevronLeft />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={`btn btn-square ${currentPage === page ? 'btn-primary' : 'btn-outline border-base-300'}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button 
                        className="btn btn-square btn-outline border-base-300"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <LuChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllTickets;