"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div style={{
      background: "var(--navy3)", border: "1px solid var(--border)",
      borderRadius: 16, padding: "1.5rem",
      width: "100%", maxWidth: 780,
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto",
      gap: "1rem", alignItems: "end",
      boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    }}>
      {[
        { label: "Pickup Location", placeholder: "City or airport...", type: "text", value: pickup, onChange: setPickup, icon: "📍" },
        { label: "Pickup Date", placeholder: "", type: "date", value: from, onChange: setFrom, icon: "📅" },
        { label: "Return Date", placeholder: "", type: "date", value: to, onChange: setTo, icon: "📅" },
      ].map((field) => (
        <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
            {field.label}
          </label>
          <div style={{
            background: "var(--navy4)", border: "1px solid var(--border2)",
            borderRadius: 10, padding: "0.7rem 0.9rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span>{field.icon}</span>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              style={{
                background: "none", border: "none", outline: "none",
                color: "var(--text)", fontFamily: "DM Sans, sans-serif",
                fontSize: "0.9rem", width: "100%", colorScheme: "dark",
              }}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => router.push("/browse")}
        style={{
          background: "var(--gold)", color: "var(--navy)",
          border: "none", borderRadius: 10, padding: "0.85rem 1.5rem",
          fontWeight: 500, cursor: "pointer", fontSize: "0.95rem",
          display: "flex", alignItems: "center", gap: "0.4rem",
          whiteSpace: "nowrap", fontFamily: "DM Sans, sans-serif",
        }}
      >
        🔍 Search
      </button>
    </div>
  );
}
