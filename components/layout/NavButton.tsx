"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface NavButtonProps {
  href: string;
  children: ReactNode;
  background?: string;
  color?: string;
  hoverLift?: boolean;
}

export default function NavButton({
  href,
  children,
  background,
  color,
  hoverLift = true,
}: NavButtonProps) {
  return (
    <Link
      href={href}
      style={{
        padding: "0.6rem 1.4rem",
        borderRadius: "10px",
        fontWeight: 600,
        background: background || "transparent",
        color: color || "var(--text2)",
        textDecoration: "none",
        fontSize: "0.9rem",
        transition: "all 0.25s ease",
        boxShadow: background
          ? "0 6px 18px rgba(212,175,55,0.35)"
          : "none",
      }}
    >
      {children}
    </Link>
  );
}