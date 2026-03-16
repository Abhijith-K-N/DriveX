"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, Car, Heart, User, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Toast from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  const { bookings, showToast } = useStore();
  const [section, setSection] = useState("overview");
  const [tab, setTab] = useState("all");

  const totalSpent = bookings.reduce((s, b) => s + b.total, 0);
  const active = bookings.filter((b) => b.status === "active" || b.status === "pending");

  const filtered = tab === "all" ? bookings : bookings.filter((b) => b.status === tab);

  const sidebarItems = [
    { id: "overview", icon: <Home size={18} />, label: "Overview" },
    { id: "rentals", icon: <Car size={18} />, label: "My Rentals" },
    { id: "profile", icon: <User size={18} />, label: "Profile" },
    { id: "settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  const statusStyle = (status: string) => {
    const map: Record<string, { bg: string; color: string; border: string }> = {
      active: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", border: "rgba(34,197,94,0.2)" },
      pending: { bg: "rgba(234,179,8,0.15)", color: "#facc15", border: "rgba(234,179,8,0.2)" },
      completed: { bg: "rgba(148,163,184,0.15)", color: "#94a3b8", border: "rgba(148,163,184,0.2)" },
      cancelled: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.2)" },
    };
    return map[status] || map.completed;
  };

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem", display: "grid", gridTemplateColumns: "240px 1fr", gap: "1.5rem", minHeight: "80vh" }}>
        {/* Sidebar */}
        <aside>
          <div style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 16, padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border2)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--gold-glow)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, color: "var(--gold)" }}>AK</div>
              <div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.9rem" }}>Arjun Kumar</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text3)" }}>Premium Member</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {sidebarItems.map((item) => (
                <div key={item.id} onClick={() => setSection(item.id)} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem",
                  borderRadius: 10, cursor: "pointer", fontSize: "0.9rem",
                  color: section === item.id ? "var(--gold)" : "var(--text2)",
                  background: section === item.id ? "var(--gold-glow)" : "transparent",
                  border: section === item.id ? "1px solid var(--border)" : "1px solid transparent",
                  transition: "all 0.2s",
                }}>
                  {item.icon}{item.label}
                </div>
              ))}
              <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border2)" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, color: "var(--text2)", textDecoration: "none", fontSize: "0.9rem" }}>
                  <LogOut size={18} />Logout
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          {section === "overview" && (
            <>
              <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800 }}>Welcome back, Arjun 👋</h1>
                <p style={{ color: "var(--text2)", fontSize: "0.9rem" }}>Here's your rental overview</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                {[
                  { label: "Total Rentals", value: bookings.length, sub: "All time", color: "var(--gold)" },
                  { label: "Active Bookings", value: active.length, sub: "Right now", color: "#4ade80" },
                  { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, sub: "This year", color: "#60a5fa" },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 14, padding: "1.25rem" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginBottom: "0.5rem" }}>{stat.label}</div>
                    <div style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: "0.3rem" }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: "1rem" }}>Recent Bookings</h3>
              {bookings.slice(0, 3).map((b) => {
                const s = statusStyle(b.status);
                return (
                  <div key={b.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto auto", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--navy3)", borderRadius: 12, border: "1px solid var(--border2)", marginBottom: "0.75rem" }}>
                    <div style={{ width: 52, height: 52, background: "var(--navy4)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>{b.car.image}</div>
                    <div>
                      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem" }}>{b.car.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>{b.from} → {b.to} · {b.days} days</div>
                    </div>
                    <div style={{ padding: "0.25rem 0.7rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{b.status}</div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--gold)", textAlign: "right" }}>₹{b.total.toLocaleString("en-IN")}</div>
                  </div>
                );
              })}
            </>
          )}

          {section === "rentals" && (
            <>
              <h1 style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1.5rem" }}>My Rentals</h1>
              {/* Tabs */}
              <div style={{ display: "flex", gap: "0.5rem", background: "var(--navy3)", borderRadius: 12, padding: "0.4rem", marginBottom: "1.5rem" }}>
                {[["all", "All"], ["active", "Active"], ["pending", "Pending"], ["completed", "Completed"]].map(([v, l]) => (
                  <div key={v} onClick={() => setTab(v)} style={{ flex: 1, textAlign: "center", padding: "0.6rem", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", fontWeight: 500, background: tab === v ? "var(--navy4)" : "transparent", color: tab === v ? "var(--gold)" : "var(--text2)", transition: "all 0.2s" }}>{l}</div>
                ))}
              </div>
              {filtered.map((b) => {
                const s = statusStyle(b.status);
                return (
                  <div key={b.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto auto", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--navy3)", borderRadius: 12, border: "1px solid var(--border2)", marginBottom: "0.75rem" }}>
                    <div style={{ width: 52, height: 52, background: "var(--navy4)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>{b.car.image}</div>
                    <div>
                      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "0.95rem" }}>{b.car.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>{b.from} → {b.to} · {b.days} days · {b.id}</div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ padding: "0.25rem 0.7rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{b.status}</span>
                      {(b.status === "active" || b.status === "pending") && (
                        <button onClick={() => showToast("Booking cancelled", "error")} style={{ background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "0.3rem 0.7rem", fontSize: "0.78rem", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Cancel</button>
                      )}
                    </div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--gold)", textAlign: "right" }}>₹{b.total.toLocaleString("en-IN")}</div>
                  </div>
                );
              })}
            </>
          )}

          {(section === "profile" || section === "settings") && (
            <>
              <h1 style={{ fontFamily: "Syne", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1.5rem" }}>{section === "profile" ? "My Profile" : "Settings"}</h1>
              <div style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--gold-glow)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne", fontWeight: 800, fontSize: "1.3rem", color: "var(--gold)" }}>AK</div>
                  <div>
                    <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: "1.1rem" }}>Arjun Kumar</div>
                    <div style={{ color: "var(--text3)", fontSize: "0.82rem" }}>Premium Member since 2024</div>
                  </div>
                  <button style={{ marginLeft: "auto", background: "transparent", color: "var(--gold)", border: "1px solid var(--border)", borderRadius: 8, padding: "0.4rem 0.9rem", fontSize: "0.8rem", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Edit Photo</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["Full Name", "Arjun Kumar", "text"], ["Email", "arjun@email.com", "email"], ["Phone", "+91 98765 43210", "text"], ["City", "Bengaluru", "text"]].map(([l, v, t]) => (
                    <div key={l}>
                      <div style={{ fontSize: "0.8rem", color: "var(--text3)", fontWeight: 500, marginBottom: "0.4rem" }}>{l}</div>
                      <input type={t} defaultValue={v} style={{ background: "var(--navy3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "0.75rem 1rem", color: "var(--text)", fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", outline: "none", width: "100%" }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => showToast("Profile saved!")} style={{ background: "var(--gold)", color: "var(--navy)", border: "none", borderRadius: 8, padding: "0.65rem 1.5rem", fontWeight: 500, cursor: "pointer", fontSize: "0.9rem", marginTop: "1.25rem", fontFamily: "DM Sans, sans-serif" }}>
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Toast />
    </>
  );
}
