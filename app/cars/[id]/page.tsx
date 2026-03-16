"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Fuel, Settings, Star, Heart, Shield, Zap, Check } from "lucide-react";
import { CARS } from "@/lib/data/cars";
import Navbar from "@/components/layout/Navbar";
import Toast from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const car = CARS.find((c) => c.id === Number(id));
  const { favorites, toggleFavorite, showToast, setSelectedCar } = useStore();
  const [activeImg, setActiveImg] = useState(0);

  if (!car) return <div style={{ color: "var(--text)", padding: "4rem", textAlign: "center" }}>Car not found</div>;

  const isFav = favorites.includes(car.id);
  const imgs = [car.image, "🚗", "🛣️", "🏙️"];
  const days = 1;
  const base = car.price * 83;
  const fee = Math.round(base * 0.08);

  const handleBook = () => {
    setSelectedCar(car);
    router.push(`/booking/${car.id}`);
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
        <Link href="/browse" style={{ color: "var(--text2)", textDecoration: "none", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>← Back to Browse</Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", marginTop: "1.5rem" }}>
          {/* Left */}
          <div>
            {/* Gallery */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{
                aspectRatio: "16/10", background: "linear-gradient(135deg, var(--navy3), var(--navy4))",
                borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "8rem", gridRow: "span 2",
              }}>{imgs[activeImg]}</div>
              {imgs.slice(1).map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i + 1)} style={{
                  aspectRatio: "16/9", background: "linear-gradient(135deg, var(--navy4), var(--navy3))",
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "3rem", cursor: "pointer",
                  border: activeImg === i + 1 ? "2px solid var(--gold)" : "2px solid transparent",
                  opacity: activeImg === i + 1 ? 1 : 0.6, transition: "all 0.2s",
                }}>{img}</div>
              ))}
            </div>

            {/* Header */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--gold)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{car.brand} · {car.type}</div>
              <h1 style={{ fontFamily: "Syne", fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem" }}>{car.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ color: "var(--gold)", fill: "var(--gold)" }} />)}
                  <span style={{ fontWeight: 600 }}>{car.rating}</span>
                  <span style={{ color: "var(--text2)", fontSize: "0.85rem" }}>({car.reviews} reviews)</span>
                </div>
                <span style={{
                  padding: "0.25rem 0.7rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600,
                  background: car.available ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                  color: car.available ? "#4ade80" : "#f87171",
                  border: car.available ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(239,68,68,0.2)",
                }}>{car.available ? "Available" : "Unavailable"}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>{car.description}</p>

            {/* Specs */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: "1rem" }}>Specifications</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { label: "Engine", value: car.engine },
                  { label: "Transmission", value: car.transmission },
                  { label: "Seats", value: `${car.seats} Passengers` },
                  { label: "Fuel", value: car.fuel },
                  { label: "Efficiency", value: car.mileage },
                  { label: "Type", value: car.type },
                ].map((s) => (
                  <div key={s.label} style={{ background: "var(--navy3)", borderRadius: 10, padding: "0.9rem", border: "1px solid var(--border2)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: "1rem" }}>Premium Features</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {car.features.map((f) => (
                  <div key={f} style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    background: "var(--gold-glow)", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "0.4rem 0.8rem", fontSize: "0.82rem", color: "var(--gold)",
                  }}>
                    <Check size={13} />{f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Card */}
          <div>
            <div style={{ position: "sticky", top: 80, background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 16, padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <div style={{ fontFamily: "Syne", fontSize: "2rem", fontWeight: 800, color: "var(--gold)" }}>
                    ₹{base.toLocaleString("en-IN")}<span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text2)" }}>/day</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>All taxes included</div>
                </div>
                <button onClick={() => { toggleFavorite(car.id); showToast(isFav ? "Removed from favorites" : "Added to favorites ❤️"); }} style={{ background: "none", border: "none", cursor: "pointer", color: isFav ? "#f87171" : "var(--text3)", padding: "0.3rem" }}>
                  <Heart size={22} fill={isFav ? "#f87171" : "none"} />
                </button>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text3)", fontWeight: 500, marginBottom: "0.4rem" }}>Pickup Location</div>
                <input style={{ background: "var(--navy3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "0.75rem 1rem", color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none", width: "100%" }} placeholder="Enter city or airport" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                {["From", "To"].map((label) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text3)", fontWeight: 500, marginBottom: "0.4rem" }}>{label}</div>
                    <input type="date" style={{ background: "var(--navy3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "0.75rem 1rem", color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none", width: "100%", colorScheme: "dark" }} />
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "var(--border2)", margin: "1rem 0" }} />
              {[["Base rate (1 day)", `₹${base.toLocaleString("en-IN")}`], ["Service fee", `₹${fee.toLocaleString("en-IN")}`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", fontSize: "0.9rem", color: "var(--text2)" }}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.9rem 0", borderTop: "1px solid var(--border)", marginTop: "0.5rem" }}>
                <span style={{ fontFamily: "Syne", fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "1.4rem", color: "var(--gold)" }}>₹{(base + fee).toLocaleString("en-IN")}</span>
              </div>

              <button onClick={handleBook} disabled={!car.available} style={{
                width: "100%", background: car.available ? "var(--gold)" : "var(--border2)",
                color: car.available ? "var(--navy)" : "var(--text3)",
                border: "none", borderRadius: 10, padding: "0.85rem",
                fontWeight: 500, cursor: car.available ? "pointer" : "not-allowed",
                fontSize: "1rem", fontFamily: "DM Sans, sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                marginTop: "0.5rem",
              }}>
                {car.available ? "Book This Car →" : "Currently Unavailable"}
              </button>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                {[{ icon: <Shield size={14} />, text: "Free cancellation" }, { icon: <Zap size={14} />, text: "Instant confirmation" }].map((item, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--text2)" }}>
                    <span style={{ color: "var(--gold)" }}>{item.icon}</span>{item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toast />
    </>
  );
}
