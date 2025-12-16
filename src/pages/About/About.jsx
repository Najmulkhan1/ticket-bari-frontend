import React from 'react';
import { Link } from 'react-router';
import { 
    LuMap, LuTarget, LuUsers, LuTrendingUp, 
    LuAward, LuSmile, LuArrowRight, LuLinkedin, LuTwitter 
} from "react-icons/lu";

const About = () => {
    
    // Mock Team Data
    const teamMembers = [
        {
            id: 1,
            name: "Md Nazmul Khan",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974",
        },
        {
            id: 2,
            name: "Sarah Ahmed",
            role: "Head of Operations",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
        },
        {
            id: 3,
            name: "Rafiqul Islam",
            role: "Lead Developer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
        }
    ];

    return (
        <div className="font-sans bg-base-100 text-base-content">
            
            {/* --- 1. HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021" 
                        alt="Travel Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-4">
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        We Make Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Journey Easier.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        TicketBari is Bangladesh's fastest-growing ticketing platform. We connect travelers with their destinations through technology, trust, and simplicity.
                    </p>
                </div>
            </section>


            {/* --- 2. MISSION & VISION (Split Layout) --- */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Text Content */}
                        <div>
                            <h2 className="text-4xl font-black mb-6">
                                Reimagining the way <br /> 
                                <span className="text-primary">Bangladesh Travels.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-base-content/70">
                                <p>
                                    Founded in 2025, TicketBari started with a simple idea: booking a ticket shouldn't be a hassle. Whether it's a bus to home, a train to a vacation, or a launch to the south, we wanted to bring everything under one roof.
                                </p>
                                <p>
                                    Today, we partner with over 500+ transport operators to provide real-time ticketing, secure payments, and 24/7 customer support.
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-6 mt-10 border-t border-base-200 pt-8">
                                <div>
                                    <h3 className="text-3xl font-black text-primary">500+</h3>
                                    <p className="text-xs font-bold uppercase opacity-50">Partners</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-primary">10k+</h3>
                                    <p className="text-xs font-bold uppercase opacity-50">Daily Users</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-primary">1M+</h3>
                                    <p className="text-xs font-bold uppercase opacity-50">Tickets Sold</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Collage */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1517409256247-497d3967d4f9?q=80&w=1925" 
                                alt="Team working" 
                                className="relative rounded-[2.5rem] shadow-2xl w-full object-cover z-10 border-4 border-base-100"
                            />
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 z-20 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                                        <LuAward size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">#1 Rated</p>
                                        <p className="text-xs opacity-60">Travel App 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* --- 3. OUR VALUES (Bento Grid) --- */}
            <section className="py-24 px-4 bg-base-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs">Our Core Values</span>
                        <h2 className="text-4xl font-black mt-2">What Drives Us</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <LuTarget size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Customer First</h3>
                            <p className="text-base-content/60">We build everything with the traveler in mind. Your convenience is our obsession.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <LuTrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Innovation</h3>
                            <p className="text-base-content/60">We constantly improve our technology to make booking faster, safer, and smarter.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                                <LuSmile size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Transparency</h3>
                            <p className="text-base-content/60">No hidden fees. No surprises. What you see is exactly what you pay.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- 4. TEAM SECTION --- */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black">Meet The Minds</h2>
                        <p className="text-base-content/60 mt-3 max-w-lg mx-auto">
                            The passionate individuals working behind the scenes to make your travel seamless.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="group relative rounded-3xl overflow-hidden cursor-pointer">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.role}</p>
                                    
                                    <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <button className="hover:text-primary transition-colors"><LuLinkedin size={20}/></button>
                                        <button className="hover:text-primary transition-colors"><LuTwitter size={20}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- 5. CTA SECTION --- */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto bg-primary text-primary-content rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
                    {/* Decorative Patterns */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                        <LuMap size={300} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to start your journey?</h2>
                        <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
                            Join thousands of happy travelers who trust TicketBari for their daily commute and holiday trips.
                        </p>
                        <Link to="/all-tickets" className="btn btn-lg bg-white text-primary border-none rounded-full px-10 hover:bg-gray-100 hover:scale-105 transition-transform font-bold">
                            Book a Ticket Now <LuArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;