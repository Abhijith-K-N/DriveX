import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DriveX — Premium Car Rental",
  description: "Handpicked luxury & performance vehicles. Transparent pricing, seamless booking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
