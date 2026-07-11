import { fetchAPI } from "@/lib/api";
import { Building2, CalendarCheck, TrendingUp, Users } from "lucide-react";

export default async function AdminDashboard() {
  // Try to fetch real stats, or fallback to 0 if unauthorized/error
  let stats = {
    hotels: 0,
    rooms: 0,
    bookings: 0,
    users: 0,
  };

  try {
    const [hotelsRes, roomsRes, bookingsRes, usersRes] = await Promise.allSettled([
      fetchAPI("/admin/hotels"),
      fetchAPI("/admin/rooms"),
      fetchAPI("/admin/bookings"),
      fetchAPI("/admin/users"),
    ]);

    if (hotelsRes.status === "fulfilled" && hotelsRes.value) stats.hotels = hotelsRes.value.count || hotelsRes.value.items?.length || 0;
    if (roomsRes.status === "fulfilled" && roomsRes.value) stats.rooms = roomsRes.value.count || roomsRes.value.items?.length || 0;
    if (bookingsRes.status === "fulfilled" && bookingsRes.value) stats.bookings = bookingsRes.value.count || bookingsRes.value.items?.length || 0;
    if (usersRes.status === "fulfilled" && usersRes.value) stats.users = usersRes.value.count || usersRes.value.items?.length || 0;
  } catch (error: any) {
    if (error?.message === 'NEXT_REDIRECT') throw error;
    console.error("Dashboard stats error:", error);
  }

  const statCards = [
    { title: "Total Bookings", value: stats.bookings, icon: CalendarCheck, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Revenue", value: "$12,450", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Available Rooms", value: stats.rooms, icon: Building2, color: "text-amber-600", bg: "bg-amber-100" },
    { title: "Registered Users", value: stats.users, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening with your hotel today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Additional UI could go here, e.g. Recent Bookings Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
        <p className="text-muted-foreground text-sm">
          Navigate to Inventory or Bookings on the sidebar to manage your hotel's data. 
          Your actions are restricted by the specific permissions assigned to your role (RBAC).
        </p>
      </div>
    </div>
  );
}
