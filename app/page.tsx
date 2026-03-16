import Link from "next/link";
import { CARS, TESTIMONIALS } from "@/lib/data/cars";
import Navbar from "@/components/layout/Navbar";
import CarCard from "@/components/cars/CarCard";
import HomeSearch from "@/components/ui/HomeSearch";
import Toast from "@/components/ui/Toast";
import Hero from "@/components/ui/Hero";
import FeaturedCars from "@/components/ui/FeaturedCars";

export default function HomePage() {
  const featured = CARS.filter((c) => c.available).slice(0, 6);

  return (
    <>
      <Navbar />
      <main>
       <Hero />
        {/* Featured Cars */}
       <FeaturedCars featured={featured}/>

        {/* How It Works */}
    import Link from "next/link";

<div className="bg-[var(--navy2)] py-20 border-t border-b border-[var(--border2)]">
  <div className="px-8 max-w-[1200px] mx-auto">

    <div className="text-[0.75rem] text-[var(--gold)] uppercase tracking-[0.12em] font-semibold mb-2">
      Simple Process
    </div>

    <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold mb-10">
      How DriveX Works
    </h2>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
      {[
        { num: "01", icon: "🔍", title: "Search & Filter", desc: "Browse our curated fleet. Filter by type, price, features, and availability." },
        { num: "02", icon: "📅", title: "Book Instantly", desc: "Select your dates, add extras like GPS or insurance, and confirm in minutes." },
        { num: "03", icon: "🚗", title: "Drive Away", desc: "Pick up your vehicle or get it delivered. Enjoy the ride, return hassle-free." },
      ].map((item) => (
        <Link key={item.num} href="/browse">
          <div className="bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-8 text-center relative overflow-hidden cursor-pointer hover:border-[var(--gold)] transition-all">
            
            <div className="absolute top-4 right-5 font-[Syne] text-[3rem] font-extrabold text-white/5 leading-none">
              {item.num}
            </div>

            <div className="text-[2.5rem] mb-4">{item.icon}</div>

            <div className="font-[Syne] font-bold text-base mb-2">
              {item.title}
            </div>

            <div className="text-[0.85rem] text-[var(--text2)] leading-relaxed">
              {item.desc}
            </div>

          </div>
        </Link>
      ))}
    </div>

  </div>
</div>

        {/* Testimonials */}
        <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: "0.5rem" }}>Client Stories</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "2.5rem" }}>What Our Clients Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border2)", borderRadius: 16, padding: "1.75rem" }}>
                <div style={{ display: "flex", gap: "0.2rem", color: "var(--gold)", marginBottom: "0.8rem" }}>
                  {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.2rem", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: 40, height: 40, background: "var(--gold-glow)", border: "1px solid var(--border)",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "0.8rem", color: "var(--gold)", fontFamily: "Syne",
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ padding: "4rem 2rem", textAlign: "center", background: "linear-gradient(135deg, var(--navy2), var(--navy3))", borderTop: "1px solid var(--border2)" }}>
          <h2 style={{ fontFamily: "Syne", fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Ready to Hit the Road?</h2>
          <p style={{ color: "var(--text2)", marginBottom: "2rem" }}>Your perfect drive is just a few clicks away.</p>
          <Link href="/browse" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.85rem 2rem", borderRadius: 10, fontWeight: 500,
            background: "var(--gold)", color: "var(--navy)", textDecoration: "none", fontSize: "1rem",
          }}>
            Browse All Cars →
          </Link>
        </div>

        {/* Footer */}
        <footer style={{
          padding: "2.5rem", borderTop: "1px solid var(--border2)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "1rem", background: "var(--navy2)",
        }}>
          <div style={{ fontFamily: "Syne", fontSize: "1.4rem", fontWeight: 800, color: "var(--gold)" }}>Drive<span style={{ color: "var(--text)" }}>X</span></div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Contact", "FAQ"].map((l) => (
              <span key={l} style={{ fontSize: "0.82rem", color: "var(--text3)", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text3)" }}>© 2025 DriveX. All rights reserved.</span>
        </footer>
      </main>
      <Toast />
    </>
  );
}
