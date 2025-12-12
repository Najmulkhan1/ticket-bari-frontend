import React from 'react';
import { Link } from 'react-router';
import { 
    LuX, // Replaced LuXCircle with LuX (safe)
    LuArrowLeft, 
    LuInfo, // Replaced LuHelpCircle with LuInfo (safe)
    LuCreditCard 
} from "react-icons/lu";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-sans">
      
      {/* Main Card */}
      <div className="max-w-md w-full bg-base-100 shadow-2xl rounded-3xl p-8 md:p-12 text-center border border-base-200 relative overflow-hidden">
         
         {/* Decorative Background Blob */}
         <div className="absolute top-0 left-0 w-full h-2 bg-error"></div>
         <div className="absolute -top-10 -right-10 w-32 h-32 bg-error/5 rounded-full blur-3xl"></div>
         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-error/5 rounded-full blur-3xl"></div>

         {/* Icon Section */}
         <div className="relative mb-6 inline-block">
            <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center">
                    {/* Using standard X icon inside the circle containers */}
                    <LuX className="text-error text-4xl" />
                </div>
            </div>
         </div>

         {/* Text Content */}
         <h1 className="text-3xl font-extrabold text-base-content mb-3">Payment Cancelled</h1>
         <p className="text-base-content/60 mb-8 leading-relaxed">
           You have aborted the transaction. <br/>
           Don't worry, <span className="text-base-content font-bold">no money was deducted</span> from your account. Your ticket has not been confirmed.
         </p>

         {/* Info Box */}
         <div className="bg-base-200/50 rounded-xl p-4 mb-8 text-sm text-left border border-base-200">
            <h4 className="font-bold flex items-center gap-2 mb-1">
                <LuCreditCard className="text-base-content/50" /> What happened?
            </h4>
            <p className="opacity-70 text-xs">
                The payment process was interrupted or cancelled. You can retry payment from your dashboard at any time.
            </p>
         </div>

         {/* Action Buttons */}
         <div className="space-y-3">
            <Link 
                to="/dashboard/my-bookings" 
                className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-xl"
            >
               Return to My Bookings
            </Link>
            
            <Link 
                to="/" 
                className="btn btn-ghost w-full rounded-xl hover:bg-base-200"
            >
               <LuArrowLeft className="mr-2" /> Back to Home
            </Link>
         </div>

         {/* Footer Support Link */}
         <div className="mt-8 pt-6 border-t border-base-200/60 flex items-center justify-center gap-2 text-xs text-base-content/50">
            <LuInfo size={14} /> 
            <span>Having trouble paying?</span>
            <a href="/contact" className="link link-primary font-bold no-underline hover:underline">Contact Support</a>
         </div>

      </div>
    </div>
  );
};

export default PaymentCancelled;