import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { Bed, Users, CheckCircle } from "lucide-react";

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  let room = null;
  
  try {
    const res = await fetchAPI(`/hotel/room-types/${params.id}`);
    room = res;
  } catch (error) {
    console.error(`Failed to fetch room ${params.id}:`, error);
  }

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Room Not Found</h1>
          <p className="text-muted-foreground mb-8">The room you are looking for does not exist or is unavailable.</p>
          <Link href="/rooms" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium">
            Browse All Rooms
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div 
        className="w-full h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url('${room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
            <Link href="/rooms" className="text-white/80 hover:text-white transition-colors mb-4 inline-block font-medium">
              &larr; Back to Rooms
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{room.name}</h1>
            <p className="text-white/90 text-lg flex items-center gap-4">
              <span className="flex items-center gap-1"><Users className="w-5 h-5" /> Up to {room.capacity} Guests</span>
              <span className="flex items-center gap-1"><Bed className="w-5 h-5" /> 1 King Bed</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Room Details Left Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">About this room</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {room.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Fallback amenities if none provided by API, otherwise map over room.amenities */}
              {room.amenities?.length ? room.amenities.map((amenity: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{amenity.name}</span>
                </div>
              )) : (
                <>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Free High-Speed WiFi</span></div>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Smart TV</span></div>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Air Conditioning</span></div>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Mini Bar</span></div>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Room Service</span></div>
                  <div className="flex items-center gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary" /><span>Daily Housekeeping</span></div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Booking Form Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-10 glass-card bg-card/80 p-8 rounded-3xl border border-border shadow-xl">
            <div className="mb-6 pb-6 border-b border-border">
              <span className="text-3xl font-bold text-foreground">${room.price_per_night}</span>
              <span className="text-muted-foreground font-medium"> / night</span>
            </div>
            
            <BookingForm roomTypeId={room.id} pricePerNight={room.price_per_night} />
          </div>
        </div>
      </div>
    </main>
  );
}
