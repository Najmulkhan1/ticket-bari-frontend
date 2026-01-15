import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { 
    FaBus, FaTrain, FaPlane, FaArrowRight, 
    FaArrowLeft, FaMapMarkerAlt, FaSearch, FaChevronRight 
} from "react-icons/fa";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000",
            icon: <FaBus />,
            category: "Bus Services",
            title: "Intercity Bus Travel",
            desc: "Premium coach services with reclining seats and onboard Wi-Fi for your long journeys.",
            link: "/bus",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1474487585617-9d4435e2c10c?auto=format&fit=crop&q=80&w=2000",
            icon: <FaTrain />,
            category: "Rail Network",
            title: "Express Rail Booking",
            desc: "Skip the queues. Book high-speed rail tickets across the country in seconds.",
            link: "/train",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000",
            icon: <FaPlane />,
            category: "Flight Deals",
            title: "Dom. & Int'l Flights",
            desc: "Compare prices from 500+ airlines and find the cheapest way to fly.",
            link: "/air",
        },
    ];

    const nextSlide = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            setIsAnimating(false);
        }, 500);
    }, [slides.length]);

    const prevSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            setIsAnimating(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[500px] overflow-hidden bg-neutral-950 font-sans">
            
            {/* Background Images with Zoom Effect */}
            {slides.map((slide, idx) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        idx === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
                    }`}
                >
                    <img 
                        src={slide.image} 
                        className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-linear ${idx === currentSlide ? "scale-110" : "scale-100"}`}
                        alt={slide.title}
                    />
                    {/* Multi-layered Responsive Overlay */}
                    <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/30 lg:to-transparent" />
                </div>
            ))}

            <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col justify-center">
                
                <div className={`max-w-3xl transition-all duration-700 ${isAnimating ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
                    
                    {/* Mode Tag */}
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <span className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white text-lg border border-white/20">
                            {slides[currentSlide].icon}
                        </span>
                        <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                            {slides[currentSlide].category}
                        </span>
                    </div>

                    {/* Responsive Heading */}
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-4">
                        {slides[currentSlide].title}
                    </h1>

                    {/* Description - Clamped for Mobile */}
                    <p className="text-gray-300 text-sm md:text-lg lg:text-xl mb-8 max-w-xl leading-relaxed line-clamp-2 md:line-clamp-none">
                        {slides[currentSlide].desc}
                    </p>

                    {/* Booking Dock UI */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 w-full sm:w-fit">
                        <Link 
                            to={slides[currentSlide].link}
                            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all active:scale-95 shadow-xl"
                        >
                            <FaSearch className="text-xs" />
                            <span>Book {slides[currentSlide].category.split(' ')[0]}</span>
                        </Link>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-white hover:bg-white/10 rounded-xl transition-all font-semibold text-sm group">
                            <FaMapMarkerAlt className="text-white/60 group-hover:text-white" /> Routes
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation Control - Responsive Placement */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-12 md:right-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    
                    {/* Step Indicators */}
                    <div className="flex gap-4 items-center order-2 md:order-1">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className="group flex flex-col items-center gap-2"
                            >
                                <div className={`h-1 transition-all duration-500 rounded-full ${currentSlide === idx ? "w-12 bg-white" : "w-6 bg-white/20 hover:bg-white/40"}`} />
                                <span className={`text-[10px] font-bold text-white transition-opacity ${currentSlide === idx ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                    0{idx + 1}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Arrow Group */}
                    <div className="flex gap-2 order-1 md:order-2">
                        <button 
                            onClick={prevSlide}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                        >
                            <FaArrowLeft size={14} />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                        >
                            <FaArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Visual Continuity Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />
        </section>
    );
};

export default Hero;