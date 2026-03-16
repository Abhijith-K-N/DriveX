"use client";
import Link from "next/link";
import { CARS } from "@/lib/data/cars";
import Navbar from "@/components/layout/Navbar";
import CarCard from "@/components/cars/CarCard";
import Toast from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

export default function FavoritesPage() {
  const favorites = useStore((s) => s.favorites);
  const favCars = CARS.filter((c) => favorites.includes(c.id));

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ fontFamily: "Syne", fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>Your Favorites</h1>
        <p style={{ color: "var(--text2)", marginBottom: "2rem" }}>{favCars.length} saved vehicle{favCars.length !== 1 ? "s" : ""}</p>

        {favCars.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>❤️</div>
            <h2 style={{ fontFamily: "Syne", fontWeight: 800, marginBottom: "0.5rem" }}>No favorites yet</h2>
            <p style={{ color: "var(--text2)", marginBottom: "1.5rem" }}>Browse our fleet and tap the heart icon to save cars you love.</p>
            <Link href="/browse" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", borderRadius: 10, background: "var(--gold)", color: "var(--navy)", textDecoration: "none", fontWeight: 500 }}>
              Browse Cars →
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {favCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </main>
      <Toast />
    </>
  );
}
