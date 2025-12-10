import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    LuTicket, LuMapPin, LuCalendar, LuDollarSign,
    LuUpload, LuUsers, LuBus, LuCheck, LuLock, LuImage,
    LuX
} from "react-icons/lu";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';

const AddTicket = () => {
    // Mock Vendor Data
    const vendorInfo = {
        name: "GreenLine Travels",
        email: "admin@greenline.com"
    };

    const [imagePreview, setImagePreview] = useState(null);
    const axiosSecure = useAxiosSecure()

    // Initialize React Hook Form
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            perks: [], // Initialize array for checkboxes
            transportType: 'Bus'
        }
    });

    // Watch perks to update UI visuals (badges) in real-time
    const selectedPerks = watch("perks");

    // Available Perks List
    const availablePerks = ["AC", "WiFi", "Breakfast", "Bottle Water", "Blanket", "Charging Point", "Sleeper"];

    // Custom Image Handler to show Preview + Register with RHF
    const { ref: imageRef, onChange: imageOnChange, ...imageRest } = register('image', { required: true, });

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            // Call RHF's onChange to ensure it tracks the file
            imageOnChange(e);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setValue('image', null);
    };

    const onSubmit = async (data) => {

        console.log(data)
        try {
            const imageFile = data.image[0];
            if (!imageFile) throw new Error('No image selected');

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
            const formData = new FormData();
            formData.append('image', imageFile);

            // upload image
            const imageRes = await axios.post(image_API_URL, formData); // don't set Content-Type manually
            console.log('imgbb response', imageRes.data);

            const imageUrl = imageRes.data?.data?.display_url || imageRes.data?.data?.url;
            if (!imageUrl) throw new Error('No image URL returned from imgbb');

            const ticketData = {
                title: data.title,
                from: data.from,
                to: data.to,
                departureDate: data.departureDate,
                transportType: data.transportType,
                price: data.price,
                quantity: data.quantity,
                perks: data.perks,
                image: imageUrl
            };

            // save to DB
            const res = await axiosSecure.post('/tickets', ticketData);
            console.log('ticket saved', res.data);

            alert(`Ticket "${data.title}" added!`);
        } catch (err) {
            console.error('submit error', err);
            alert('There was an error. Check console for details.');
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8 flex items-center justify-center font-sans">

            <div className="card w-full max-w-4xl bg-base-100 shadow-xl overflow-hidden border border-base-300">

                {/* Header Section */}
                <div className="bg-neutral text-neutral-content p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary rounded-lg text-primary-content">
                            <LuTicket size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Add New Journey</h2>
                            <p className="text-xs opacity-70">Create a new ticket listing for your customers</p>
                        </div>
                    </div>
                    {/* Visual Decor */}
                    <div className="hidden sm:block opacity-20">
                        <LuBus size={64} />
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Image & Main Details */}
                    <div className="lg:col-span-1 flex flex-col gap-6">

                        {/* Image Upload Area */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Cover Image</label>
                            <div className={`relative w-full bg-transparent h-48 rounded-2xl border-2 border-dashed ${errors.image ? 'border-red-300' : 'border-gray-200 bg-gray-50'} flex flex-col items-center justify-center overflow-hidden transition-all group hover:border-primary/50`}>
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-3 right-3 p-2 rounded-full text-red-500 
               bg-transparent shadow-none
               hover:bg-gray-50/20 
               transition-all z-20"
                                        >
                                            <LuX size={18} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center p-6 pointer-events-none">
                                        <div className="w-12 h-12 rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-primary">
                                            <LuUpload size={20} />
                                        </div>
                                        <p className="text-sm font-medium text-gray-600">Click to upload banner</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (1200x800px)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    {...register('image', { required: true, onChange: handleImageChange })}
                                />
                            </div>
                        </div>
                        {/* Read-Only Vendor Info */}
                        <div className="bg-base-200 rounded-xl p-4 border border-base-300/50">
                            <h3 className="text-sm font-bold opacity-50 mb-3 flex items-center gap-2">
                                <LuLock size={12} /> VENDOR DETAILS
                            </h3>
                            <div className="space-y-3">
                                <div className="form-control">
                                    <label className="text-xs opacity-60 mb-1">Company Name</label>
                                    <input type="text" value={vendorInfo.name} readOnly className="input input-sm input-bordered w-full bg-base-100/50 text-base-content/60 cursor-not-allowed" />
                                </div>
                                <div className="form-control">
                                    <label className="text-xs opacity-60 mb-1">Vendor Email</label>
                                    <input type="email" value={vendorInfo.email} readOnly className="input input-sm input-bordered w-full bg-base-100/50 text-base-content/60 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form Fields */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Ticket Title */}
                        <div className="form-control">
                            <label className="label font-semibold">Ticket Title (Route Name)</label>
                            <input
                                type="text"
                                placeholder="e.g. Dhaka to Chittagong - Night Coach"
                                className="input input-bordered focus:input-primary w-full"
                                {...register('title', { required: true })}
                            />
                            {errors.title && <span className="text-error text-xs">Title is required</span>}
                        </div>

                        {/* Route Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">From</label>
                                <div className="relative">
                                    <LuMapPin className="absolute left-3 top-3.5 text-primary" />
                                    <input
                                        type="text"
                                        placeholder="Departure City"
                                        className="input input-bordered pl-10 w-full"
                                        {...register('from', { required: true })}
                                    />
                                </div>
                            </div>

                            {/* Visual Arrow */}
                            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-9 text-base-content/30 bg-base-100 p-1 z-10">
                                →
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">To</label>
                                <div className="relative">
                                    <LuMapPin className="absolute left-3 top-3.5 text-secondary" />
                                    <input
                                        type="text"
                                        placeholder="Arrival City"
                                        className="input input-bordered pl-10 w-full"
                                        {...register('to', { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Date & Transport Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">Departure Time</label>
                                <div className="relative">
                                    <LuCalendar className="absolute left-3 top-3.5 text-base-content/50" />
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered pl-10 w-full"
                                        {...register('departureDate', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">Transport Type</label>
                                <select className="select select-bordered w-full" {...register('transportType')}>
                                    <option value="Bus">Bus</option>
                                    <option value="Train">Train</option>
                                    <option value="Air">Air</option>
                                    <option value="Launch">Launch</option>
                                </select>
                            </div>
                        </div>

                        {/* Price & Quantity Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">Price (Per Unit)</label>
                                <div className="relative">
                                    <LuDollarSign className="absolute left-3 top-3.5 text-base-content/50" />
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="input input-bordered pl-10 w-full"
                                        {...register('price', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold text-xs uppercase opacity-70">Total Seats/Qty</label>
                                <div className="relative">
                                    <LuUsers className="absolute left-3 top-3.5 text-base-content/50" />
                                    <input
                                        type="number"
                                        placeholder="e.g. 40"
                                        className="input input-bordered pl-10 w-full"
                                        {...register('quantity', { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Perks Section */}
                        <div className="form-control">
                            <label className="label font-semibold">Available Perks</label>
                            <div className="flex flex-wrap gap-2">
                                {availablePerks.map((perk) => (
                                    <label key={perk} className="cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            value={perk}
                                            className="hidden peer"
                                            {...register('perks')}
                                        />
                                        <span className="badge badge-lg badge-outline p-4 select-none transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary group-hover:bg-base-200">
                                            {selectedPerks && selectedPerks.includes(perk) && (
                                                <LuCheck className="mr-1" size={12} />
                                            )}
                                            {perk}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button type="submit" className="btn btn-primary w-full shadow-lg text-lg">
                                Add Ticket
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTicket;