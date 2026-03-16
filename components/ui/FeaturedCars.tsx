"use client";

import Link from "next/link";
import CarCard from "@/components/cars/CarCard";
import { Car } from "@/lib/types";

interface FeaturedCarsProps {
  featured: Car[];
}

export default function FeaturedCars({ featured }: FeaturedCarsProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-20">
      {/* Label */}
      <div className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--gold)]">
        Fleet Highlights
      </div>

      {/* Title + Button */}
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold">
          Featured Vehicles
        </h2>

        <Link
          href="/browse"
          className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-4 py-1 text-[0.82rem] font-medium text-[var(--gold)]"
        >
          View All →
        </Link>
      </div>

      {/* Description */}
      <p className="mb-8 max-w-[480px] text-[1rem] leading-relaxed text-[var(--text2)]">
        Curated selection of the finest cars available for your next journey.
      </p>

      {/* Cars Grid */}
      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
        {featured.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}