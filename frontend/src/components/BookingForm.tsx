"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users } from "lucide-react";

export default function BookingForm({ roomTypeId, pricePerNight }: { roomTypeId: number, pricePerNight: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    checkin: "",
    checkout: "",
    guests: 1,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    special_request: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/hotel/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_type_id: roomTypeId,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to complete booking");
      }

      setSuccess(true);
      // Optional: Redirect after success
      // setTimeout(() => router.push("/"), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-emerald-800 mb-2">Booking Confirmed!</h3>
        <p className="text-emerald-600 mb-6">Your reservation has been successfully placed. We've sent a confirmation email to {formData.email}.</p>
        <button 
          onClick={() => router.push("/")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">Check In</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              name="checkin"
              required
              value={formData.checkin}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">Check Out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="date"
              name="checkout"
              required
              value={formData.checkout}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground/80">Number of Guests</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="number"
            name="guests"
            min="1"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>
      </div>

      <hr className="border-border" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">First Name</label>
          <input
            type="text"
            name="first_name"
            required
            value={formData.first_name}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">Last Name</label>
          <input
            type="text"
            name="last_name"
            required
            value={formData.last_name}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground/80">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground/80">Special Requests (Optional)</label>
        <textarea
          name="special_request"
          rows={3}
          value={formData.special_request}
          onChange={handleChange}
          className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
      >
        {loading ? "Processing..." : `Book Now • $${pricePerNight}/night`}
      </button>
    </form>
  );
}
