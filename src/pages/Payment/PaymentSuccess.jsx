import React from 'react';
import { useSearchParams, Link } from 'react-router';
import {
    LuCheck,
    LuArrowLeft,
    LuArrowRight,
    LuPrinter,
    LuCopy,
    LuCalendar,
    LuCreditCard,
    LuDownload
} from "react-icons/lu";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

// 1. TanStack Query Import
import { useQuery } from '@tanstack/react-query';

// 2. PDF Libraries Import
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    // 3. useQuery Implementation (Replacing useEffect & useState)
    const { data: paymentInfo, isLoading } = useQuery({
        queryKey: ['paymentSuccess', sessionId], // Unique key for caching
        enabled: !!sessionId, // session_id না থাকলে রিকোয়েস্ট যাবে না
        refetchOnWindowFocus: false, // ট্যাব চেঞ্জ করলে যাতে PATCH রিকোয়েস্ট আবার না যায়
        retry: false, // ফেইল হলে বারবার রিকোয়েস্ট করবে না
        queryFn: async () => {
            const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
            
            // ডাটা ফরম্যাটিং এখানেই করে নেওয়া ভালো
            console.log(res.data);
            
            return res.data;
        }
    });

    // 4. Professional Receipt Generator Function
    const generateReceipt = () => {
        if (!paymentInfo) return; // ডাটা না থাকলে জেনারেট হবে না

        const doc = new jsPDF();

        // --- Header ---
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("TicketBari", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Dhaka, Bangladesh", 14, 28);
        doc.text("Email: support@ticketbari.com", 14, 33);
        doc.text("Phone: +880 1234 567 890", 14, 38);

        // --- Title & Details ---
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("PAYMENT RECEIPT", 140, 22, { align: "right" });
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Receipt #: ${paymentInfo.transactionId.slice(-6).toUpperCase()}`, 195, 30, { align: "right" });
        doc.text(`Date: ${paymentInfo.date}`, 195, 35, { align: "right" });
        doc.text(`Status: Paid`, 195, 40, { align: "right" });

        doc.setDrawColor(200); 
        doc.line(14, 45, 196, 45);

        // --- Bill To ---
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Bill To:", 14, 55);
        
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.text(paymentInfo.customerName, 14, 62);
        doc.text(`Tracking ID: ${paymentInfo.trackingId}`, 14, 67);
        doc.text(`Payment Method: Card / Online`, 14, 72);

        // --- Table ---
        const tableColumn = ["#", "Item Description", "Qty", "Unit Price", "Total"];
        const tableRows = [
            [
                "1",
                "Bus/Train Ticket Booking Service", 
                "1", 
                `${paymentInfo.amount} ${paymentInfo.currency}`, 
                `${paymentInfo.amount} ${paymentInfo.currency}`
            ]
        ];

        autoTable(doc, {
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 3 },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 20, halign: 'center' },
                3: { cellWidth: 30, halign: 'right' },
                4: { cellWidth: 30, halign: 'right' },
            },
        });

        // --- Totals ---
        const finalY = (doc).lastAutoTable.finalY + 10;
        const rightMargin = 195;

        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.text(`Subtotal:`, 150, finalY, { align: "right" });
        doc.text(`${paymentInfo.amount} ${paymentInfo.currency}`, rightMargin, finalY, { align: "right" });
        
        doc.text(`Tax (0%):`, 150, finalY + 6, { align: "right" });
        doc.text(`0.00 ${paymentInfo.currency}`, rightMargin, finalY + 6, { align: "right" });
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Grand Total:`, 150, finalY + 14, { align: "right" });
        doc.text(`${paymentInfo.amount} ${paymentInfo.currency}`, rightMargin, finalY + 14, { align: "right" });

        // --- Footer ---
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Thank you for your business!", 105, finalY + 30, { align: "center" });
        doc.setFontSize(8);
        doc.text("For any queries, please contact support@ticketbari.com", 105, finalY + 35, { align: "center" });

        doc.save(`Receipt_${paymentInfo.transactionId}.pdf`);

        Swal.fire({
            icon: 'success',
            title: 'Receipt Downloaded',
            showConfirmButton: false,
            timer: 1500
        });
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-bars loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">
                
                {/* Left Side */}
                <div className="md:w-[35%] relative overflow-hidden text-white p-10 flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-cover bg-center animate-slowZoom" style={{ backgroundImage: "url('https://i.ibb.co/gLr9GC1k/f3a67746-c1de-478f-84ff-b983a04c2936-1.png')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/70 to-black/50"></div>
                    <div className="relative z-10 animate-fadeInUp">
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center mb-6 mx-auto animate-bounce shadow-lg shadow-green-900/30 bg-white/10 backdrop-blur-sm">
                            <LuCheck size={60} />
                        </div>
                        <h2 className="text-4xl font-bold mb-3 text-shadow-sm">Success!</h2>
                        <p className="text-green-50 text-sm opacity-90 font-medium">Your payment has been completed successfully.</p>
                    </div>
                </div>

                {/* Right Side */}
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
                        <div className="bg-base-200 p-4 rounded-xl border border-base-300 group relative">
                            <p className="text-xs text-base-content/60 uppercase font-bold mb-1">Transaction ID</p>
                            <p className="font-mono text-sm font-bold text-base-content break-all">{paymentInfo?.transactionId}</p>
                            <button onClick={() => handleCopy(paymentInfo?.transactionId)} className="absolute top-3 right-3 text-base-content/40 hover:text-success">
                                <LuCopy />
                            </button>
                        </div>
                        <div className="bg-base-200 p-4 rounded-xl border border-base-300 group relative">
                            <p className="text-xs text-base-content/60 uppercase font-bold mb-1">Total Amount</p>
                            <p className="font-mono text-sm font-bold text-base-content break-all">{paymentInfo?.amount_subtotal} {paymentInfo?.currency}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link to="/dashboard/my-bookings" className="btn btn-neutral text-white flex-1 rounded-xl shadow-lg">
                            View Ticket <LuArrowRight />
                        </Link>
                        <Link to="/" className="btn btn-ghost border border-base-300 flex-1 rounded-xl hover:bg-base-200">
                            <LuArrowLeft className="mr-2" /> Home
                        </Link>
                        
                        <button 
                            onClick={generateReceipt} 
                            className="btn btn-square btn-outline btn-success border-2 rounded-xl" 
                            title="Download Official Receipt"
                        >
                            <LuDownload size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;