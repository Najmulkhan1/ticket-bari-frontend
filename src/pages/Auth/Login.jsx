import React, { useState } from 'react';
import { 
  LuPlane, LuMail, LuLock, 
  LuArrowRight, LuEye, LuEyeOff, 
  LuQrCode 
} from "react-icons/lu";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {

  const { googleLogin, sinInUser } = useAuth();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();
  
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    sinInUser(data.email, data.password)
    .then(result => {
      const user = result.user;
      console.log(user);
      navigate('/')
    })
    .catch(error => {
      console.error(error);
    })
  };

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
      const user = result.user;
      console.log(user);
      navigate('/')
    })
    .catch(error => {
      console.error(error);
    })
  }



  return (
    <div className="relative  min-h-screen bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80 backdrop-blur-sm"></div>

      {/* Main Container - Ticket Shape */}
      <div className="relative w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden grid lg:grid-cols-5 z-10 min-h-[600px]">
        
        {/* Left Side: "Boarding Pass" Visual (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-2 bg-neutral text-neutral-content flex-col justify-between p-10 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="w-64 h-64 bg-primary rounded-full blur-3xl absolute -top-10 -left-10"></div>
             <div className="w-64 h-64 bg-secondary rounded-full blur-3xl absolute bottom-0 right-0"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <LuPlane size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter">TicketBari</h1>
            </div>
            
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Welcome <br/> <span className="text-primary">Back.</span>
            </h2>
            <p className="opacity-70 text-sm">
              Your next destination is waiting. Please check in to continue.
            </p>
          </div>

          {/* Abstract "Gate Info" Graphic */}
          <div className="relative z-10 mt-auto bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-[10px] font-mono opacity-60 block">GATE</span>
                    <span className="text-xl font-bold">04A</span>
                </div>
                <div>
                    <span className="text-[10px] font-mono opacity-60 block text-right">STATUS</span>
                    <span className="badge badge-success badge-sm text-xs">On Time</span>
                </div>
            </div>
            <div className="border-t border-dashed border-white/20"></div>
            <div className="flex items-center gap-3">
                <LuQrCode className="text-4xl opacity-80" />
                <div className="text-[10px] opacity-60 font-mono leading-tight">
                    CLASS: BUSINESS<br/>
                    ID: 8859-BLK
                </div>
            </div>
          </div>
        </div>

        {/* Center Divider: Visual Perforation */}
        <div className="hidden lg:flex flex-col justify-between absolute left-[40%] top-0 bottom-0 z-20 pointer-events-none h-full w-4 -ml-2">
           <div className="w-6 h-6 rounded-full bg-primary/90 -mt-3"></div>
           <div className="h-full border-r-2 border-dashed border-gray-300/50"></div>
           <div className="w-6 h-6 rounded-full bg-secondary/80 -mb-3"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="col-span-1 lg:col-span-3 bg-base-100 p-6 md:p-12 flex flex-col justify-center w-full">
          
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-base-content">Sign In</h3>
              <p className="text-sm text-base-content/60 mt-2">Access your bookings and profile</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Email */}
              <div className="form-control">
                <label className="label pt-0">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all">
                  <LuMail className="text-base-content/40" />
                  <input 
                    type="email" 
                    name="email"
                    className="grow" 
                    placeholder="john@example.com" 
                    {...register("email", { required: "Email is required" })}
                  />
                </label>
              </div>

              {/* Password with Toggle */}
              <div className="form-control">
                <label className="label pt-0">
                  <span className="label-text font-medium">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 focus-within:input-primary transition-all">
                  <LuLock className="text-base-content/40" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    className="grow" 
                    placeholder="••••••••" 
                    {...register("password", { required: "Password is required" })}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-base-content/40 hover:text-primary transition-colors focus:outline-none"
                  >
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </label>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                    <span className="text-base-content/70">Remember me</span>
                </label>
                <a href="#" className="link link-hover link-primary text-xs font-semibold">Forgot Password?</a>
              </div>

              {/* Login Button */}
              <button className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 mt-4 group">
                Sign In
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="divider text-xs text-base-content/40 my-6">OR LOGIN WITH</div>

            <SocialLogin />

            <p className="text-center mt-8 text-sm text-base-content/70">
              Don't have a ticket yet? <a href="/register" className="link link-primary font-bold no-underline hover:underline">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;