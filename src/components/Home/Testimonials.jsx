import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Frequent Flyer",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            text: "The flight booking process was seamless. I saved nearly 20% compared to other platforms, and the real-time gate updates were a lifesaver!",
            rating: 5,
            tag: "Air Travel"
        },
        {
            id: 2,
            name: "Marcus Chen",
            role: "Digital Nomad",
            image: "https://randomuser.me/api/portraits/men/44.jpg",
            text: "I take the intercity bus twice a week for work. The premium seating is actually premium—tons of legroom and reliable Wi-Fi. Highly recommend.",
            rating: 5,
            tag: "Bus Travel"
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            role: "Adventure Traveler",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "The train routes covered here are impressive. I managed to book a cross-country trip with three transfers, and everything synced perfectly.",
            rating: 4,
            tag: "Rail Journey"
        }
    ];

    const nextReview = () => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    const prevReview = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

    return (
        <section className="py-20 bg-base-100 transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl text-center md:text-left">
                        <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Voices of the Road</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-base-content leading-tight">
                            What our <span className="underline decoration-primary decoration-4 underline-offset-8">Travelers</span> say
                        </h3>
                    </div>

                    {/* Navigation Buttons (Desktop) */}
                    <div className="hidden md:flex gap-4">
                        <button onClick={prevReview} className="w-14 h-14 flex items-center justify-center rounded-full border border-base-content/10 text-base-content hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
                            <FaChevronLeft />
                        </button>
                        <button onClick={nextReview} className="w-14 h-14 flex items-center justify-center rounded-full border border-base-content/10 text-base-content hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Review Content */}
                    <div className="lg:col-span-7">
                        <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-base-200 border border-base-content/10 shadow-2xl transition-all duration-500">
                            <FaQuoteLeft className="text-primary/20 text-6xl absolute top-8 left-8" />

                            <div className="relative z-10">
                                <div className="flex gap-1 text-yellow-500 mb-6">
                                    {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl font-medium text-base-content/80 leading-relaxed mb-8 italic">
                                    "{reviews[activeIndex].text}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={reviews[activeIndex].image}
                                        alt={reviews[activeIndex].name}
                                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-base-100 shadow-xl"
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold text-base-content">{reviews[activeIndex].name}</h4>
                                        <p className="text-sm text-base-content/60">{reviews[activeIndex].role}</p>
                                    </div>
                                    <div className="ml-auto px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                        {reviews[activeIndex].tag}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual Stats/Decoration (Laptop/PC only) */}
                    <div className="hidden lg:block lg:col-span-5 relative">
                        <div className="space-y-6">
                            {reviews.map((rev, idx) => (
                                <div
                                    key={rev.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${activeIndex === idx
                                            ? "bg-base-200 border-primary shadow-xl translate-x-4"
                                            : "bg-transparent border-transparent opacity-40 hover:opacity-100"
                                        }`}
                                >
                                    <img src={rev.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-base-content line-clamp-1">{rev.text}</p>
                                        <p className="text-[10px] uppercase font-bold text-primary">{rev.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Arrows */}
                <div className="flex md:hidden justify-center gap-6 mt-12">
                    <button onClick={prevReview} className="w-14 h-14 flex items-center justify-center rounded-full bg-base-200 border border-base-content/10 text-base-content hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
                        <FaChevronLeft />
                    </button>
                    <button onClick={nextReview} className="w-14 h-14 flex items-center justify-center rounded-full bg-base-200 border border-base-content/10 text-base-content hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;