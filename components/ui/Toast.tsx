"use client";
import { useStore } from "@/lib/store";

export default function Toast() {
  const toast = useStore((s) => s.toast);
  if (!toast) return null;

  return (
    <div className="animate-toast" style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 300,
      background: "var(--navy3)", border: "1px solid var(--gold)",
      borderRadius: 12, padding: "1rem 1.5rem",
      display: "flex", alignItems: "center", gap: "0.75rem",
      boxShadow: "0 16px 48px rgba(0,0,0,0.5)", maxWidth: 320,
    }}>
      <span style={{ color: toast.type === "success" ? "#4ade80" : "#f87171", fontSize: "1.2rem", fontWeight: 700 }}>
        {toast.type === "success" ? "✓" : "✕"}
      </span>
      <span style={{ fontSize: "0.88rem" }}>{toast.msg}</span>
    </div>
  );
}
