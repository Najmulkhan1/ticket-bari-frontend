import React from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

const Blogs = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Exploring the Deep Green: A Guide to the Sundarbans",
            category: "Nature",
            date: "Jan 12, 2026",
            readTime: "8 min",
            location: "Khulna",
            image: "https://images.unsplash.com/photo-1698560875663-7d9e91a55ae3?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/blog/sundarbans-guide",
            featured: true // First post takes more space on desktop
        },
        {
            id: 2,
            title: "Cox's Bazar: Beyond the Main Beach",
            category: "Coastal",
            date: "Jan 10, 2026",
            readTime: "5 min",
            location: "Chittagong",
            image: "https://images.unsplash.com/photo-1619177383949-f03975e50b19?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "/blog/coxs-bazar-hidden"
        },
        {
            id: 3,
            title: "Sylhet's Tea Gardens: A Visual Journey",
            category: "Relaxation",
            date: "Jan 05, 2026",
            readTime: "6 min",
            location: "Sylhet",
            image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&q=80&w=1000",
            link: "/blog/sylhet-tea-gardens"
        },
        {
            id: 4,
            title: "Train Journey: The Silk Route to Rajshahi",
            category: "Railways",
            date: "Jan 02, 2026",
            readTime: "4 min",
            location: "Rajshahi",
            image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=1000",
            link: "/blog/rajshahi-train-trip"
        }
    ];

    return (
        <section className="py-20 bg-base-100 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Bangladeshi Branding Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold uppercase tracking-tighter text-sm">ভ্রমণ কাহিনী (Travel Stories)</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-base-content">
                            Discover the Beauty of <span className="text-primary italic">Bangladesh</span>
                        </h3>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center gap-2 font-bold text-base-content/60 hover:text-primary transition-colors group">
                        Explore All Stories <HiArrowLongRight className="group-hover:translate-x-2 transition-transform text-xl" />
                    </Link>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`group relative overflow-hidden rounded-[2rem] bg-base-200 border border-base-content/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 ${post.featured ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                        >
                            {/* Image Container */}
                            <div className={`relative overflow-hidden ${post.featured ? 'h-64 md:h-full' : 'h-64'}`}>
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={post.title}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Floating Content Card (for Featured) or Bottom Content */}
                            <div className={`p-6 md:p-8 flex flex-col justify-end ${post.featured ? 'md:absolute md:bottom-0 md:left-0 md:w-2/3' : ''}`}>
                                <div className="flex items-center gap-3 text-white/60 text-[10px] mb-3 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><FaCalendarAlt className="text-primary" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><FaClock className="text-primary" /> {post.readTime}</span>
                                </div>

                                <h4 className={`font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors ${post.featured ? 'text-2xl md:text-4xl' : 'text-xl'}`}>
                                    {post.title}
                                </h4>

                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-white/50 text-xs italic">
                                        <FaMapMarkerAlt /> {post.location}, BD
                                    </span>
                                    <Link
                                        to={post.link}
                                        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                                    >
                                        <HiArrowLongRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Show All Button */}
                <div className="mt-10 md:hidden flex justify-center">
                    <Link to="/blog" className="px-8 py-4 bg-primary text-white font-bold rounded-full w-full text-center shadow-lg">
                        See More Stories
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blogs;