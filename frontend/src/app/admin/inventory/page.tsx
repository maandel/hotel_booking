import { fetchAPI } from "@/lib/api";
import { Building2, Edit, Trash2 } from "lucide-react";

export default async function AdminInventory() {
  let hotels = [];
  let roomTypes = [];
  try {
    const res = await fetchAPI("/admin/hotels");
    hotels = res?.items || res || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch hotels:", error);
  }

  try {
    const res = await fetchAPI("/admin/room-types");
    roomTypes = res?.items || res || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch room types:", error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Manage hotels, rooms, room types, and amenities.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5">
          + Add Hotel
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/50 flex items-center gap-3">
          <Building2 className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Hotels</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No hotels found or you lack permissions to view them.
                  </td>
                </tr>
              ) : (
                hotels.map((hotel: any) => (
                  <tr key={hotel.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">#{hotel.id}</td>
                    <td className="px-6 py-4 text-foreground">{hotel.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{hotel.location}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Room Types Section */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-12">
        <div className="p-6 border-b border-border bg-muted/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Room Types</h2>
          </div>
          <a href="/admin/inventory/room-types/new" className="bg-foreground hover:bg-foreground/90 text-background px-4 py-2 rounded-lg font-medium text-sm transition-transform hover:-translate-y-0.5">
            + Add Room Type
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Price / Night</th>
                <th className="px-6 py-4 font-semibold">Capacity</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roomTypes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No room types found.
                  </td>
                </tr>
              ) : (
                roomTypes.map((rt: any) => (
                  <tr key={rt.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">#{rt.id}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{rt.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">${rt.price_per_night}</td>
                    <td className="px-6 py-4 text-muted-foreground">{rt.capacity} guests</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
