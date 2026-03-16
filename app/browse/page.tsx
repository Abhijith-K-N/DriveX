"use client";
import { useState } from "react";
import Link from "next/link";
import { CARS } from "@/lib/data/cars";
import Navbar from "@/components/layout/Navbar";
import CarCard from "@/components/cars/CarCard";
import Toast from "@/components/ui/Toast";

const types = [...new Set(CARS.map((c) => c.type))];
const fuels = [...new Set(CARS.map((c) => c.fuel))];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterFuel, setFilterFuel] = useState<string[]>([]);
  const [filterTrans, setFilterTrans] = useState("");
  const [sort, setSort] = useState("popular");

  const toggleArr = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  let filtered = CARS.filter((car) => {
    if (filterTypes.length && !filterTypes.includes(car.type)) return false;
    if (filterFuel.length && !filterFuel.includes(car.fuel)) return false;
    if (filterTrans && car.transmission !== filterTrans) return false;
    if (search && !car.name.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const hasFilters = filterTypes.length || filterFuel.length || filterTrans;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
        <Link href="/" style={{ color: "var(--text2)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>← Back</Link>
        <h1 style={{ fontFamily: "Syne", fontSize: "2rem", fontWeight: 800, marginTop: "0.75rem", marginBottom: "0.25rem" }}>Browse Fleet</h1>
        <p style={{ color: "var(--text2)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>{filtered.length} vehicles available</p>

        {/* Search + Sort */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <input
            style={{
              flex: 1, minWidth: 200,
              background: "var(--navy3)", border: "1px solid var(--border2)",
              borderRadius: 10, padding: "0.75rem 1rem",
              color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
              outline: "none",
            }}
            placeholder="🔍 Search brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            style={{
              background: "var(--navy3)", border: "1px solid var(--border2)",
              borderRadius: 10, padding: "0.75rem 1rem",
              color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem",
              outline: "none", minWidth: 180,
            }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem" }}>
          {/* Filters */}
          <aside>
            <div style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem", marginBottom: "1rem" }}>⚡ Filters</div>

              {[
                { title: "Car Type", options: types, state: filterTypes, set: (v: string) => setFilterTypes(toggleArr(filterTypes, v)) },
                { title: "Fuel Type", options: fuels, state: filterFuel, set: (v: string) => setFilterFuel(toggleArr(filterFuel, v)) },
              ].map(({ title, options, state, set }) => (
                <div key={title} style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem", fontWeight: 600 }}>{title}</div>
                  {options.map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.4rem 0", cursor: "pointer", fontSize: "0.85rem", color: "var(--text2)" }}>
                      <input type="checkbox" checked={state.includes(opt)} onChange={() => set(opt)} style={{ accentColor: "var(--gold)" }} />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}

              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem", fontWeight: 600 }}>Transmission</div>
                {["Automatic", "Manual"].map((t) => (
                  <label key={t} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.4rem 0", cursor: "pointer", fontSize: "0.85rem", color: "var(--text2)" }}>
                    <input type="radio" name="trans" checked={filterTrans === t} onChange={() => setFilterTrans(filterTrans === t ? "" : t)} style={{ accentColor: "var(--gold)" }} />
                    {t}
                  </label>
                ))}
              </div>

              {hasFilters ? (
                <button
                  onClick={() => { setFilterTypes([]); setFilterFuel([]); setFilterTrans(""); }}
                  style={{
                    width: "100%", background: "transparent", border: "1px solid var(--border2)",
                    borderRadius: 8, padding: "0.5rem", color: "var(--text2)",
                    cursor: "pointer", fontSize: "0.82rem", fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Clear All Filters
                </button>
              ) : null}
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--text3)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <h3 style={{ fontFamily: "Syne", marginBottom: "0.5rem" }}>No cars found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {filtered.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </main>
      <Toast />
    </>
  );
}
