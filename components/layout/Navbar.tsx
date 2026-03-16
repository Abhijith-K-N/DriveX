"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Heart, LayoutDashboard, Home } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import NavButton from "./NavButton";

export default function Navbar() {
  const pathname = usePathname();
  const favorites = useStore((s) => s.favorites);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/browse", label: "Browse Cars", icon: Car },
    { href: "/dashboard", label: "My Rentals", icon: LayoutDashboard },
    {
      href: "/favorites",
      label: `Favorites${favorites.length ? ` (${favorites.length})` : ""}`,
      icon: Heart,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "70px",
        padding: "0 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, rgba(2,6,23,0.9), rgba(15,23,42,0.85))",
        backdropFilter: "blur(18px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "Syne",
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "var(--gold)",
          textDecoration: "none",
        }}
      >
        Drive<span style={{ color: "var(--text)" }}>X</span>
      </Link>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={href}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: active ? "var(--gold)" : "var(--text2)",
                  paddingBottom: "6px",
                }}
              >
                <Icon size={16} />
                {label}

                {active && (
  <motion.span
    style={{
      position: "absolute",
      bottom: "0px",
      left: 0,
      width: "100%",
      height: "3px",
      borderRadius: "4px",
      background:
        "linear-gradient(90deg,#D4AF37,#FACC15,#FFD700,#22c55e,#38bdf8,#D4AF37)",
      backgroundSize: "300% 100%",
    }}
    animate={{
      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    }}
  />
)}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
        <NavButton href="/auth/login">Login</NavButton>

        <NavButton
          href="/browse"
          background="linear-gradient(135deg,#D4AF37,#FACC15)"
          color="#020617"
        >
          Book Now
        </NavButton>
      </div>
    </motion.nav>
  );
}