import RoomCard from "@/components/RoomCard";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";

export default async function RoomsPage() {
  let roomTypes = [];
  try {
    const res = await fetchAPI("/hotel/room-types");
    roomTypes = res?.items || [];
  } catch (error) {
    console.error("Failed to fetch room types:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors mb-4 inline-block font-medium">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Accommodations</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Choose from our selection of premium rooms and suites, each designed to provide the ultimate comfort during your stay.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {roomTypes.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Rooms Available</h3>
            <p className="text-muted-foreground">Please check back later or contact us directly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((rt: any) => (
              <RoomCard
                key={rt.id}
                id={rt.id}
                name={rt.name}
                description={rt.description}
                pricePerNight={rt.price_per_night}
                capacity={rt.capacity}
                image={rt.image_url}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
