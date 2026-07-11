import { createRoomType } from "@/app/actions/inventory";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewRoomTypePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/inventory" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Inventory
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create Room Type</h1>
        <p className="text-muted-foreground mt-1">Add a new room classification to your hotel inventory.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
        <form action={createRoomType} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Room Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="e.g. Serenity Suite"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Price Per Night ($)</label>
              <input
                type="number"
                name="price_per_night"
                step="0.01"
                required
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="550.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Capacity (Guests)</label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="2"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Amenities (Comma-separated)</label>
              <input
                type="text"
                name="amenities"
                className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                placeholder="e.g. WiFi, Mini-bar, Ocean View"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Room Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full bg-background border border-border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
              placeholder="Describe the room features and ambiance..."
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
            >
              Save Room Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
