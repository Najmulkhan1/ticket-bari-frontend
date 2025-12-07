import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // Ensure you are using 'react-router-dom' in most projects
import { FaArrowRight, FaArrowLeft, FaTicketAlt, FaCalendarCheck } from "react-icons/fa";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slide Data: Ticket Booking Theme with User Provided Images
    const slides = [
        {
            id: 1,
            // Slide 1 Image
            image: "https://i.ibb.co/1JfjS7D4/Untitled-design-10.png",
            subtitle: "Live Entertainment",
            title: "Book Concerts & Live Shows",
            description: "Experience the thrill of live music. Secure the best seats for upcoming concerts and events near you.",
            buttonText: "Get Tickets",
            link: "/concerts",
        },
        {
            id: 2,
            // Slide 2 Image
            image: "https://i.ibb.co/VcWGfCkN/Untitled-design-11.png",
            subtitle: "Travel & Transit",
            title: "Your Journey Starts Here",
            description: "Fast and easy booking for bus, train, and flight tickets. Explore new destinations with zero hassle.",
            buttonText: "Book Travel",
            link: "/travel",
        },
        {
            id: 3,
            // Slide 3 Image
            image: "https://i.ibb.co/Mkbz7Rmm/Untitled-design-12.png",
            subtitle: "Movies & Cinema",
            title: "Catch the Latest Blockbusters",
            description: "Pre-book your movie tickets and skip the line. Enjoy the magic of cinema with family and friends.",
            buttonText: "See Showtimes",
            link: "/movies",
        },
    ];

    // Auto-slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-[550px] lg:h-[750px] overflow-hidden font-sans group">
            
            {/* --- CAROUSEL SLIDES --- */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    {/* 1. Background Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear transform scale-100 hover:scale-105"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    ></div>

                    {/* 2. Dark Overlay (Gradient) - Makes text readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

                    {/* 3. Text Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 lg:px-12">
                            <div className="max-w-2xl space-y-6">
                                
                                {/* Subtitle Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border border-white/30 bg-white/10 backdrop-blur-md text-white text-sm tracking-widest uppercase font-semibold transform transition-all duration-700 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                                    <FaCalendarCheck className="text-yellow-400" />
                                    {slide.subtitle}
                                </div>

                                {/* Main Title */}
                                <h1 
                                    className={`text-4xl lg:text-7xl font-bold text-white leading-tight transform transition-all duration-700 delay-100 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                                >
                                    {slide.title}
                                </h1>

                                {/* Description */}
                                <p 
                                    className={`text-lg text-gray-300 transform transition-all duration-700 delay-200 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                                >
                                    {slide.description}
                                </p>

                                {/* Button */}
                                <div className={`pt-4 transform transition-all duration-700 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                                    <Link 
                                        to={slide.link}
                                        className="btn bg-red-600 hover:bg-red-700 border-none text-white px-8 h-14 rounded-lg text-lg font-medium flex items-center gap-3 w-fit transition-all hover:gap-5"
                                    >
                                        <FaTicketAlt />
                                        {slide.buttonText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* --- NAVIGATION ARROWS --- */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-4">
                <button 
                    onClick={handlePrev} 
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm"
                >
                    <FaArrowLeft />
                </button>
                <button 
                    onClick={handleNext} 
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm"
                >
                    <FaArrowRight />
                </button>
            </div>

            {/* --- PROGRESS INDICATORS --- */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            currentSlide === idx ? "w-12 bg-red-600" : "w-6 bg-white/50 hover:bg-white"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;