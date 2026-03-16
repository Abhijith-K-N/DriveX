"use client";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useStore } from "@/lib/store";

export default function ConfirmPage() {
  const bookings = useStore((s) => s.bookings);
  const latest = bookings[0];

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: 24, padding: "3rem", maxWidth: 480, width: "100%", textAlign: "center",
        }}>
          <div className="animate-pop" style={{
            width: 80, height: 80, background: "rgba(34,197,94,0.15)",
            border: "2px solid rgba(34,197,94,0.3)", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
          }}>
            <Check size={36} style={{ color: "#4ade80" }} />
          </div>

          <h1 style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>Booking Confirmed!</h1>
          <p style={{ color: "var(--text2)", marginBottom: "2rem" }}>Your ride is all set. Get ready to drive in style.</p>

          {latest && (
            <div style={{ background: "var(--navy3)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text3)" }}>Booking Reference</span>
                <span style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--gold)", fontSize: "0.85rem" }}>{latest.id}</span>
              </div>
              <div style={{ height: 1, background: "var(--border2)", margin: "0.75rem 0" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{latest.car.image}</span>
                <div>
                  <div style={{ fontFamily: "Syne", fontWeight: 700 }}>{latest.car.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text2)" }}>{latest.from} → {latest.to} · {latest.days} days</div>
                </div>
              </div>
              {latest.addons.length > 0 && (
                <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginBottom: "0.75rem" }}>Extras: {latest.addons.join(", ")}</div>
              )}
              <div style={{ height: 1, background: "var(--border2)", margin: "0.75rem 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600 }}>Total Paid</span>
                <span style={{ fontFamily: "Syne", fontWeight: 800, color: "var(--gold)" }}>₹{latest.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/dashboard" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              padding: "0.7rem", borderRadius: 8, background: "transparent", color: "var(--gold)",
              border: "1px solid var(--border)", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem",
            }}>
              📊 My Rentals
            </Link>
            <Link href="/" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              padding: "0.7rem", borderRadius: 8, background: "var(--gold)", color: "var(--navy)",
              textDecoration: "none", fontWeight: 500, fontSize: "0.9rem",
            }}>
              🏠 Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
