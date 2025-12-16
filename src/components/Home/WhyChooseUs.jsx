import React from 'react';
import { LuShieldCheck, LuClock, LuCreditCard, LuHeadphones } from "react-icons/lu";

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: <LuShieldCheck size={40} />,
            title: "Safe & Secure",
            desc: "We ensure secure payment processing and verified vendors for your safety."
        },
        {
            id: 2,
            icon: <LuClock size={40} />,
            title: "Instant Booking",
            desc: "Book your tickets in just a few clicks and get instant confirmation via email."
        },
        {
            id: 3,
            icon: <LuCreditCard size={40} />,
            title: "Best Prices",
            desc: "We offer competitive prices and exclusive deals you won't find anywhere else."
        },
        {
            id: 4,
            icon: <LuHeadphones size={40} />,
            title: "24/7 Support",
            desc: "Our customer support team is ready to help you anytime, anywhere."
        }
    ];

    return (
        <section className="py-24 px-4 bg-base-200 font-sans">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Title & Image/Design */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs">Our Benefits</span>
                        <h2 className="text-4xl md:text-5xl font-black text-base-content mt-2 mb-6">
                            Why Choose <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">TicketBari?</span>
                        </h2>
                        <p className="text-base-content/60 mb-8 leading-relaxed">
                            We are committed to providing you with the best travel experience. From booking to boarding, we are with you every step of the way.
                        </p>
                        <button className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">Learn More</button>
                    </div>

                    {/* Right Side: Features Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature) => (
                            <div 
                                key={feature.id} 
                                className="bg-base-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-base-100 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                                <p className="text-base-content/60 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;