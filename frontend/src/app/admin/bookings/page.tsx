import { fetchAPI } from "@/lib/api";
import { CalendarCheck, Edit, Trash2 } from "lucide-react";

export default async function AdminBookings() {
  let bookings = [];
  try {
    const res = await fetchAPI("/admin/bookings");
    bookings = res?.items || res || [];
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Failed to fetch bookings:", error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage guest reservations.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/50 flex items-center gap-3">
          <CalendarCheck className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">All Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Guest</th>
                <th className="px-6 py-4 font-semibold">Room Type</th>
                <th className="px-6 py-4 font-semibold">Check In - Out</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No bookings found or you lack permissions to view them.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">#{booking.id}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{booking.guest_name || 'Guest'}</td>
                    <td className="px-6 py-4 text-muted-foreground">{booking.room_type?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {booking.check_in_date} &rarr; {booking.check_out_date}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {booking.status?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
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
