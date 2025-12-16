import React from 'react';
import { 
    LuMapPin, LuPhone, LuMail, LuSend, 
    LuMessageSquare, LuClock, 
} from "react-icons/lu";
import Swal from 'sweetalert2';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation of form submission
        Swal.fire({
            title: "Message Sent!",
            text: "We will get back to you shortly.",
            icon: "success",
            confirmButtonColor: "#22c55e"
        });
        e.target.reset();
    };

    return (
        <div className="font-sans bg-base-200 min-h-screen">
            
            {/* --- 1. HERO HEADER --- */}
            <section className="bg-base-100 py-16 md:py-24 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-black mt-2 mb-6 text-base-content">
                        We're here to <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Help You.</span>
                    </h1>
                    <p className="text-lg text-base-content/60 leading-relaxed">
                        Have a question about a booking, a refund, or want to partner with us? 
                        Fill out the form or reach us via our support channels.
                    </p>
                </div>
            </section>

            {/* --- 2. CONTACT CONTENT --- */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    
                    {/* LEFT COLUMN: Contact Form */}
                    <div className="bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-base-200 h-fit">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Send us a Message</h3>
                            <p className="text-base-content/60 text-sm">We typically reply within 2 hours during working days.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-70">Your Name</span>
                                    </label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered rounded-xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold opacity-70">Email Address</span>
                                    </label>
                                    <input type="email" placeholder="hello@example.com" className="input input-bordered rounded-xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all" required />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Subject</span>
                                </label>
                                <select className="select select-bordered rounded-xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all">
                                    <option disabled selected>Select a topic</option>
                                    <option>Booking Issue</option>
                                    <option>Refund Request</option>
                                    <option>Vendor Partnership</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold opacity-70">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered h-32 rounded-xl bg-base-200 focus:bg-base-100 focus:border-primary transition-all" placeholder="Tell us how we can help..." required></textarea>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">
                                Send Message <LuSend />
                            </button>
                        </form>
                    </div>


                    {/* RIGHT COLUMN: Contact Info & Map Visual */}
                    <div className="space-y-8">
                        
                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Email Card */}
                            <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LuMail size={24} />
                                </div>
                                <h4 className="font-bold text-lg">Email Support</h4>
                                <p className="text-sm text-base-content/60 mb-2">For general inquiries</p>
                                <a href="mailto:support@ticketbari.com" className="text-primary font-bold hover:underline">support@ticketbari.com</a>
                            </div>

                            {/* Phone Card */}
                            <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LuPhone size={24} />
                                </div>
                                <h4 className="font-bold text-lg">Call Us</h4>
                                <p className="text-sm text-base-content/60 mb-2">Mon-Fri from 8am to 5pm</p>
                                <a href="tel:+8801712345678" className="text-primary font-bold hover:underline">+880 1712 345 678</a>
                            </div>

                            {/* Live Chat Card */}
                            <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LuMessageSquare size={24} />
                                </div>
                                <h4 className="font-bold text-lg">Live Chat</h4>
                                <p className="text-sm text-base-content/60 mb-2">Available 24/7</p>
                                <span className="text-primary font-bold cursor-pointer">Start Chat &rarr;</span>
                            </div>

                            {/* Location Card */}
                            <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <LuMapPin size={24} />
                                </div>
                                <h4 className="font-bold text-lg">Head Office</h4>
                                <p className="text-sm text-base-content/60 mb-2">Banani, Dhaka-1213</p>
                                <a href="#" className="text-primary font-bold hover:underline">View on Map</a>
                            </div>
                        </div>

                        {/* Map Visual (Static Image approach) */}
                        <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-base-100">
                            <img 
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074" 
                                alt="Map Location" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <div className="bg-base-100 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
                                    <LuMapPin className="text-error" />
                                    <span className="font-bold text-sm">TicketBari HQ</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- 3. FAQ ACCORDION --- */}
            <section className="py-16 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-2">Frequently Asked Questions</h2>
                    <p className="text-base-content/60">Can't find what you're looking for?</p>
                </div>

                <div className="space-y-4">
                    <div className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl">
                        <input type="radio" name="my-accordion-3" defaultChecked /> 
                        <div className="collapse-title text-lg font-bold">
                            How do I cancel my booking?
                        </div>
                        <div className="collapse-content"> 
                            <p className="text-base-content/70">You can cancel your booking from the "My Tickets" section in your dashboard up to 24 hours before departure for a full refund.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-lg font-bold">
                            Is it safe to pay online?
                        </div>
                        <div className="collapse-content"> 
                            <p className="text-base-content/70">Absolutely. We use SSL encryption and trusted payment gateways like Stripe and SSLCommerz to ensure your data is 100% secure.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-100 border border-base-200 rounded-2xl">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-lg font-bold">
                            Do I need to print my ticket?
                        </div>
                        <div className="collapse-content"> 
                            <p className="text-base-content/70">No, you can show the e-ticket QR code from your mobile app or email at the time of boarding.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;