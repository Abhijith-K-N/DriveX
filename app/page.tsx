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
       <FeaturedCars  featured={featured}/>

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
       <section className="py-20 px-8 max-w-[1200px] mx-auto">
  <div className="text-[0.75rem] text-[var(--gold)] uppercase tracking-[0.12em] font-semibold mb-2">
    Client Stories
  </div>

  <h2 className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold mb-10">
    What Our Clients Say
  </h2>

  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
    {TESTIMONIALS.map((t, i) => (
      <div
        key={i}
        className="bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-7"
      >
        <div className="flex gap-[0.2rem] text-[var(--gold)] mb-3">
          {"★★★★★".split("").map((s, j) => (
            <span key={j}>{s}</span>
          ))}
        </div>

        <p className="text-[0.9rem] text-[var(--text2)] leading-[1.7] mb-5 italic">
          "{t.text}"
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--gold-glow)] border border-[var(--border)] rounded-full flex items-center justify-center font-bold text-[0.8rem] text-[var(--gold)] font-[Syne]">
            {t.avatar}
          </div>

          <div>
            <div className="font-semibold text-[0.9rem]">{t.name}</div>
            <div className="text-[0.78rem] text-[var(--text3)]">
              {t.role}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* CTA */}
     <div className="py-16 px-8 text-center bg-[linear-gradient(135deg,var(--navy2),var(--navy3))] border-t border-[var(--border2)]">
  
  <h2 className="font-[Syne] text-[2rem] font-extrabold mb-4">
    Ready to Hit the Road?
  </h2>

  <p className="text-[var(--text2)] mb-8">
    Your perfect drive is just a few clicks away.
  </p>

  <Link
    href="/browse"
    className="inline-flex items-center gap-2 px-8 py-[0.85rem] rounded-[10px] font-medium bg-[var(--gold)] text-[var(--navy)] no-underline text-[1rem]"
  >
    Browse All Cars →
  </Link>

</div>

        {/* Footer */}
        <footer className="p-10 border-t border-[var(--border2)] flex justify-between items-center flex-wrap gap-4 bg-[var(--navy2)]">

  <div className="font-[Syne] text-[1.4rem] font-extrabold text-[var(--gold)]">
    Drive<span className="text-[var(--text)]">X</span>
  </div>

  <div className="flex gap-8 flex-wrap">
    {["Privacy Policy", "Terms of Service", "Contact", "FAQ"].map((l) => (
      <span
        key={l}
        className="text-[0.82rem] text-[var(--text3)] cursor-pointer"
      >
        {l}
      </span>
    ))}
  </div>

  <span className="text-[0.78rem] text-[var(--text3)]">
    © 2025 DriveX. All rights reserved.
  </span>

</footer>
</main>

<Toast />
    </>
  );
}
