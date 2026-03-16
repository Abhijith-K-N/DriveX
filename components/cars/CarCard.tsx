"use client";

import Link from "next/link";
import { Users, Fuel, Settings, Star, Heart } from "lucide-react";
import { Car } from "@/lib/types";
import { useStore } from "@/lib/store";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { favorites, toggleFavorite, showToast } = useStore();
  const isFav = favorites.includes(car.id);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(car.id);
    showToast(isFav ? "Removed from favorites" : "Added to favorites ❤️");
  };

  return (
    <Link href={`/cars/${car.id}`} className="block no-underline">

      {/* Rotating border wrapper */}
      <div className="group relative rounded-2xl p-[2px] overflow-hidden">

        {/* rotating green-gold border */}
        <div
          className="
          absolute inset-0
          rounded-2xl
          bg-[conic-gradient(#22c55e,#d4af37,#22c55e,#d4af37)]
          animate-[spin_8s_linear_infinite]
          group-hover:animate-[spin_3s_linear_infinite]
          "
        />

        {/* Card */}
        <div
          className="
          relative
          rounded-2xl
          bg-[#10231a]
          border border-[var(--border2)]
          overflow-hidden
          transition-all duration-300
          group-hover:-translate-y-2
          group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]
        "
        >
          
          {/* Visual */}
          <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-[var(--navy3)] to-[var(--navy4)] text-[5rem]">

            {!car.available && (
              <div className="absolute right-3 top-3 rounded border border-red-400/40 bg-red-400/20 px-2 py-[2px] text-[0.7rem] font-semibold text-red-400">
                Unavailable
              </div>
            )}

            <button
              onClick={handleFav}
              className={`absolute left-3 top-3 flex items-center rounded-lg border border-[var(--border2)] bg-black/50 p-1.5 backdrop-blur transition-all ${
                isFav ? "text-red-400" : "text-[var(--text2)]"
              }`}
            >
              <Heart size={16} fill={isFav ? "#f87171" : "none"} />
            </button>

            <span>{car.image}</span>
          </div>

          {/* Body */}
          <div className="p-5">

            <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[var(--gold)]">
              {car.brand}
            </div>

            <div className="my-1 mb-3 font-[Syne] text-[1.1rem] font-bold">
              {car.name}
            </div>

            {/* Specs */}
            <div className="mb-4 flex flex-wrap gap-4 text-[0.78rem] text-[var(--text2)]">

              <span className="flex items-center gap-1">
                <Users size={13} />
                {car.seats} seats
              </span>

              <span className="flex items-center gap-1">
                <Fuel size={13} />
                {car.fuel}
              </span>

              <span className="flex items-center gap-1">
                <Settings size={13} />
                {car.transmission}
              </span>

            </div>

            {/* Price + Rating */}
            <div className="flex items-center justify-between border-t border-[var(--border2)] pt-3">

              <div>
                <span className="font-[Syne] text-[1.3rem] font-extrabold text-[var(--gold)]">
                  ₹{(car.price * 83).toLocaleString("en-IN")}
                </span>
                <span className="text-[0.75rem] text-[var(--text3)]">
                  {" "} /day
                </span>
              </div>

              <div className="flex items-center gap-1 text-[0.85rem] text-[var(--text2)]">
                <Star size={13} className="fill-[var(--gold)] text-[var(--gold)]" />
                {car.rating} ({car.reviews})
              </div>

            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}