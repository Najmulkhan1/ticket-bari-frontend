import React, { useState, useEffect } from "react";
import { Link } from "react-router"; 
import { FaArrowRight, FaArrowLeft, FaTicketAlt, FaCalendarCheck } from "react-icons/fa";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "https://i.ibb.co/1JfjS7D4/Untitled-design-10.png",
            subtitle: "Live Entertainment",
            title: "Book Concerts & Live Shows",
            description: "Experience the thrill of live music. Secure the best seats for upcoming concerts and events near you.",
            buttonText: "Get Tickets",
            link: "/concerts",
        },
        {
            id: 2,
            image: "https://i.ibb.co/VcWGfCkN/Untitled-design-11.png",
            subtitle: "Travel & Transit",
            title: "Your Journey Starts Here",
            description: "Fast and easy booking for bus, train, and flight tickets. Explore new destinations with zero hassle.",
            buttonText: "Book Travel",
            link: "/travel",
        },
        {
            id: 3,
            image: "https://i.ibb.co/Mkbz7Rmm/Untitled-design-12.png",
            subtitle: "Movies & Cinema",
            title: "Catch the Latest Blockbusters",
            description: "Pre-book your movie tickets and skip the line. Enjoy the magic of cinema with family and friends.",
            buttonText: "See Showtimes",
            link: "/movies",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000); 
        return () => clearInterval(interval);
    }, [currentSlide]);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        // Height adjusted for mobile (h-[600px]) and larger screens
        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden font-sans group bg-black">
            
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

                    {/* 2. Dark Overlay - Slightly darker on mobile for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent"></div>

                    {/* 3. Text Content */}
                    <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                            {/* Content Wrapper */}
                            <div className="max-w-lg lg:max-w-2xl w-full space-y-4 sm:space-y-6 text-center lg:text-left mx-auto lg:mx-0">
                                
                                {/* Subtitle Badge */}
                                <div className={`inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 rounded border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm tracking-widest uppercase font-semibold transform transition-all duration-700 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                                    <FaCalendarCheck className="text-yellow-400" />
                                    {slide.subtitle}
                                </div>

                                {/* Main Title - Responsive Text Sizes */}
                                <h1 
                                    className={`text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight sm:leading-tight transform transition-all duration-700 delay-100 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                                >
                                    {slide.title}
                                </h1>

                                {/* Description */}
                                <p 
                                    className={`text-sm sm:text-lg text-gray-200 leading-relaxed transform transition-all duration-700 delay-200 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                                >
                                    {slide.description}
                                </p>

                                {/* Button - Full width on mobile, fit on desktop */}
                                <div className={`pt-4 flex justify-center lg:justify-start transform transition-all duration-700 delay-300 ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                                    <Link 
                                        to={slide.link}
                                        className="btn bg-red-600 hover:bg-red-700 border-none text-white w-full sm:w-auto px-8 h-12 sm:h-14 rounded-lg text-base sm:text-lg font-medium flex items-center justify-center gap-3 transition-all hover:gap-5 shadow-lg shadow-red-600/20"
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

            {/* --- NAVIGATION ARROWS (Hidden on very small screens, visible on sm+) --- */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 flex gap-3 sm:gap-4">
                <button 
                    onClick={handlePrev} 
                    className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all bg-black/30 backdrop-blur-sm active:scale-95"
                >
                    <FaArrowLeft className="text-sm sm:text-xl" />
                </button>
                <button 
                    onClick={handleNext} 
                    className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all bg-black/30 backdrop-blur-sm active:scale-95"
                >
                    <FaArrowRight className="text-sm sm:text-xl" />
                </button>
            </div>

            {/* --- PROGRESS INDICATORS --- */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-12 z-20 flex gap-2 sm:gap-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            currentSlide === idx ? "w-8 sm:w-12 bg-red-600" : "w-4 sm:w-6 bg-white/30 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;