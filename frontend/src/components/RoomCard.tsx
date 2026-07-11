"use client";

import { motion } from "framer-motion";
import { Bed, Users, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  pricePerNight: string | number;
  capacity: number;
  image?: string;
}

export default function RoomCard({
  id,
  name,
  description,
  pricePerNight,
  capacity,
  image,
}: RoomCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
            No Image Available
          </div>
        )}
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-semibold text-primary-foreground bg-primary">
          ${pricePerNight} / night
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto mb-6">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>1 King</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <span>Free Wifi</span>
          </div>
        </div>

        <Link
          href={`/rooms/${id}`}
          className="w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors"
        >
          View & Book
        </Link>
      </div>
    </motion.div>
  );
}
