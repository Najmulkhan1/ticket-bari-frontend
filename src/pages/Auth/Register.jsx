import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
// Added LuEye and LuEyeOff to imports
import { LuPlane, LuUser, LuMail, LuLock, LuArrowRight, LuCamera, LuUpload, LuEye, LuEyeOff } from "react-icons/lu";
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser, updateUserProfile,googleLogin } = useAuth()
  const navigate = useNavigate()

  const axiosSecure = useAxiosSecure()  

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);

    const profileImg = data.photo[0]
    registerUser(data.email, data.password)
      .then((res) => {

        console.log(res);

        // store the image in form data
        const formData = new FormData()
        formData.append('image', profileImg)

        // send the photo to store and get the url 
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host
          }`
        axios.post(image_API_URL, formData)
          .then((res) => {
            console.log('after image upload', res.data.data.url);
            const photoUrl = res.data.data.url

            // create user in the database
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoUrl: photoUrl
            }

            axiosSecure.post('/users', userInfo)
            .then((res) => {
              console.log(res.data);
              
              if(res.data.insertedId){
                console.log("User created in the database");
              }
            })


            // update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: photoUrl
            }

            updateUserProfile(userProfile)
              .then(() => {
                console.log('User profile updated successfully');
                navigate('/')
              })
              .catch((error) => {
                console.error('Error updating user profile:', error);
              })



          })
      })
  };


  const handleGoogleRegister = () => {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center p-4">

      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden grid lg:grid-cols-5 z-10 min-h-[600px]">

        {/* Left Side: Branding */}
        <div className="hidden lg:flex lg:col-span-2 bg-neutral text-neutral-content flex-col justify-between p-10 relative overflow-hidden">
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
              Your Journey <br /> <span className="text-primary">Starts Here.</span>
            </h2>
            <p className="opacity-80 text-sm leading-relaxed">
              Join thousands of travelers booking bus, train, and flight tickets with zero hassle.
            </p>
          </div>

          {/* Ticket Preview Card */}
          <div className="relative z-10 mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono opacity-70">STATUS</span>
              <span className="text-xs font-mono opacity-70">DATE</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>ACTIVE</span>
              <span className="text-sm font-normal opacity-80">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="divider my-2 opacity-50"></div>
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] opacity-70">PASSENGER</span>
                <span className="font-semibold text-sm">New Traveler</span>
              </div>
              {imagePreview && (
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={imagePreview} alt="ticket-avatar" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Divider */}
        <div className="hidden lg:flex flex-col justify-between absolute left-[40%] top-0 bottom-0 z-20 pointer-events-none h-full w-4 -ml-2">
          <div className="w-6 h-6 rounded-full bg-primary/90 -mt-3"></div>
          <div className="h-full border-r-2 border-dashed border-gray-300/50"></div>
          <div className="w-6 h-6 rounded-full bg-secondary/80 -mb-3"></div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-3 bg-base-100 p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-[90vh]">

          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-base-content">Create Account</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Image Upload (Unchanged) */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <div className={`w-24 h-24 rounded-full border-4 ${imagePreview ? 'border-primary' : 'border-base-300'} overflow-hidden bg-base-200 flex items-center justify-center transition-all duration-300 relative shadow-lg`}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <LuCamera className="text-3xl text-base-content/30" />
                      )}

                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <LuUpload className="text-white text-xl" />
                        <span className="text-white text-[10px] font-bold mt-1">UPLOAD</span>
                      </div>
                    </div>
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("photo", {
                      onChange: (e) => handleImageChange(e)
                    })}
                  />

                  {!imagePreview && (
                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 shadow-md pointer-events-none">
                      <LuUpload size={14} />
                    </div>
                  )}
                </div>
                <span className="text-xs text-base-content/50 mt-2">Upload Profile Photo</span>
              </div>

              {/* Full Name */}
              <div className="form-control">
                <label className={`input w-full input-bordered flex items-center gap-2 focus-within:input-primary transition-all ${errors.fullName ? "input-error" : ""}`}>
                  <LuUser className="text-base-content/40" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Full Name"
                    {...register("name", { required: "Full name is required" })}
                  />
                </label>
                {errors.fullName && <span className="text-error text-xs mt-1 ml-1">{errors.fullName.message}</span>}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className={`input input-bordered w-full flex items-center gap-2 focus-within:input-primary transition-all ${errors.email ? "input-error" : ""}`}>
                  <LuMail className="text-base-content/40" />
                  <input
                    type="email"
                    className="grow"
                    placeholder="Email Address"
                    {...register("email", { required: "Email is required" })}
                  />
                </label>
                {errors.email && <span className="text-error text-xs mt-1 ml-1">{errors.email.message}</span>}
              </div>

              {/* Password Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Password Field */}
                <div className="form-control">
                  <label className={`input input-bordered flex items-center gap-2 focus-within:input-primary transition-all ${errors.password ? "input-error" : ""}`}>
                    <LuLock className="text-base-content/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="grow"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 chars" }
                      })}
                    />
                    {/* Toggle Button for Password */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-base-content/40 hover:text-primary transition-colors cursor-pointer"
                    >
                      {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </label>
                  {errors.password && <span className="text-error text-xs mt-1 ml-1">{errors.password.message}</span>}
                </div>

                {/* Confirm Password Field */}
                <div className="form-control">
                  <label className={`input input-bordered flex items-center gap-2 focus-within:input-primary transition-all ${errors.confirmPassword ? "input-error" : ""}`}>
                    <LuLock className="text-base-content/40" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="grow"
                      placeholder="Confirm"
                      {...register("confirmPassword", {
                        required: "Confirm password",
                        validate: (value) => value === password || "Passwords do not match"
                      })}
                    />
                    {/* Toggle Button for Confirm Password */}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-base-content/40 hover:text-primary transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                    </button>
                  </label>
                  {errors.confirmPassword && <span className="text-error text-xs mt-1 ml-1">{errors.confirmPassword.message}</span>}
                </div>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                  <span className="label-text text-sm">I agree to the Terms of Service</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full text-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 mt-2 group">
                Register Now
                <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="divider text-sm text-base-content/40 my-4">OR</div>

            <button onClick={handleGoogleRegister} className="btn btn-outline w-full hover:bg-base-200 hover:border-base-300">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
              Google
            </button>

            <p className="text-center mt-6 text-sm">
              Already a member? <Link to="/login" className="link link-primary font-bold no-underline hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;