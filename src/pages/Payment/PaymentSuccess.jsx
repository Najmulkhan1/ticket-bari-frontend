import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import {
    LuCheck,
    LuArrowLeft,
    LuArrowRight,
    LuPrinter,
    LuCopy,
    LuCalendar,
    LuCreditCard
} from "react-icons/lu";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {

                    console.log(res.data);
                    
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trakingId || `TRK-${Math.floor(Math.random() * 900000) + 100000}`,
                        amount: res.data.amount,
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [sessionId, axiosSecure]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-bars loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-sans">

            <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">

                {/* <div className="md:w-[35%] bg-green-600 text-white p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                         <div className="w-40 h-40 bg-white rounded-full absolute -top-10 -left-10"></div>
                         <div className="w-40 h-40 bg-white rounded-full absolute bottom-10 right-10"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center mb-6 mx-auto animate-bounce">
                            <LuCheck size={60} />
                        </div>
                        
                        <h2 className="text-3xl font-bold mb-2">Success!</h2>
                        <p className="text-green-100 text-sm">Your payment has been completed successfully.</p>
                    </div>
                </div> */}


             
                <div className="md:w-[35%] relative overflow-hidden text-white p-10 flex flex-col items-center justify-center text-center">

                    
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-slowZoom"
                        style={{
                            backgroundImage: "url('https://i.ibb.co/gLr9GC1k/f3a67746-c1de-478f-84ff-b983a04c2936-1.png')"
                        }}
                    ></div>

                   
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/70 to-black/50"></div>

                   
                    <div className="relative z-10 animate-fadeInUp">
                        
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center mb-6 mx-auto animate-bounce shadow-lg shadow-green-900/30 bg-white/10 backdrop-blur-sm">
                            <LuCheck size={60} />
                        </div>

                        <h2 className="text-4xl font-bold mb-3 text-shadow-sm">Success!</h2>
                        <p className="text-green-50 text-sm opacity-90 font-medium">Your payment has been completed successfully.</p>
                    </div>
                </div>

                <div className="md:w-[65%] p-8 md:p-12 bg-base-100">

                    <div className="flex justify-between items-start mb-8 border-b border-base-300 pb-6">
                        <div>
                            <p className="text-sm text-base-content/60 uppercase tracking-wider font-bold">Payment Status</p>
                            <h1 className="text-2xl font-extrabold text-success">Confirmed</h1>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-sm text-base-content/60 font-bold">Date</p>
                            <p className="text-base-content font-medium">{paymentInfo?.date}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

                        <div className="bg-base-200 p-4 rounded-xl border border-base-300 group relative hover:border-success transition-colors">
                            <p className="text-xs text-base-content/60 uppercase font-bold mb-1">Transaction ID</p>
                            <p className="font-mono text-sm font-bold text-base-content break-all">{paymentInfo?.transactionId}</p>
                            <button onClick={() => handleCopy(paymentInfo?.transactionId)} className="absolute top-3 right-3 text-base-content/40 hover:text-success">
                                <LuCopy />
                            </button>
                        </div>

                        <div className="bg-base-200 p-4 rounded-xl border border-base-300 group relative hover:border-success transition-colors">
                            <p className="text-xs text-base-content/60 uppercase font-bold mb-1">Tracking ID</p>
                            <p className="font-mono text-sm font-bold text-base-content break-all">{paymentInfo?.trackingId}</p>
                            <button onClick={() => handleCopy(paymentInfo?.trackingId)} className="absolute top-3 right-3 text-base-content/40 hover:text-success">
                                <LuCopy />
                            </button>
                        </div>


                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-base-200 text-blue-500 flex items-center justify-center">
                                <LuCreditCard />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/60 font-bold">Payment Method</p>
                                <p className="text-sm font-bold text-base-content">Card / Online</p>
                            </div>
                        </div>


                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-base-200 text-purple-500 flex items-center justify-center">
                                <LuCalendar />
                            </div>
                            <div>
                                <p className="text-xs text-base-content/60 font-bold">Time</p>
                                <p className="text-sm font-bold text-base-content">{paymentInfo?.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link to="/dashboard/my-bookings" className="btn btn-neutral text-white flex-1 rounded-xl shadow-lg">
                            View Ticket <LuArrowRight />
                        </Link>

                        <Link to="/" className="btn btn-ghost border border-base-300 flex-1 rounded-xl hover:bg-base-200">
                            <LuArrowLeft className="mr-2" /> Home
                        </Link>

                        <button className="btn btn-square btn-ghost border border-base-300 rounded-xl hover:bg-base-200" title="Print Receipt">
                            <LuPrinter />
                        </button>


                    </div>

                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;