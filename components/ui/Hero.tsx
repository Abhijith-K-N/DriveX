"use client";

import HomeSearch from "./HomeSearch";
import Galaxy from "@/Reactbits/Galaxy";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-8 py-16 text-center">

      {/* Galaxy Background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
    <Galaxy 
    mouseRepulsion
    mouseInteraction
    density={0.6}
    glowIntensity={0.4}
    saturation={0.3}
    hueShift={90}
    twinkleIntensity={0.3}
    rotationSpeed={0.15}
    repulsionStrength={18}
    autoCenterRepulsion={0}
    starSpeed={1.1}
    speed={2.8}
/>
      </div>

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(74,158,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Badge */}
      <div className="animate-slide-down mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--gold-glow)] px-4 py-1 text-xs text-[var(--gold)]">
        👑 Premium Car Rental Experience
      </div>

      {/* Heading */}
      <h1
        className="mb-5 text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.1] bg-clip-text text-transparent"
        style={{
          background:
            "linear-gradient(135deg, #F0F4FF 0%, var(--gold) 60%, #F0F4FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Drive Your Dream
        <br />
        Car Today
      </h1>

      {/* Description */}
      <p className="mb-10 max-w-[520px] text-[1.15rem] leading-relaxed text-[var(--text2)]">
        Handpicked luxury & performance vehicles. Transparent pricing,
        seamless booking, unforgettable journeys.
      </p>

   

      {/* Stats */}
      <div className="mt-12 flex flex-wrap justify-center gap-12">
        {[
          ["500+", "Premium Cars"],
          ["50K+", "Happy Clients"],
          ["30+", "Cities"],
          ["4.9★", "Avg Rating"],
        ].map(([num, label]) => (
          <div key={label} className="text-center">
            <div className="font-[Syne] text-[1.8rem] font-extrabold text-[var(--gold)]">
              {num}
            </div>
            <div className="mt-1 text-xs text-[var(--text3)]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}