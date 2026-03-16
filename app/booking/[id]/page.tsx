"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Map, Users, User, Check } from "lucide-react";
import { CARS, ADDONS } from "@/lib/data/cars";
import Navbar from "@/components/layout/Navbar";
import Toast from "@/components/ui/Toast";
import { useStore } from "@/lib/store";

const DAYS = 3;

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const car = CARS.find((c) => c.id === Number(id));
  const { addBooking, showToast } = useStore();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    from: "",
    to: "",
    name: "",
    email: "",
    phone: "",
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!car) return null;

  const toggleAddon = (id: string) =>
    setSelectedAddons((a) =>
      a.includes(id) ? a.filter((x) => x !== id) : [...a, id]
    );

  const base = car.price * 83 * DAYS;

  const addonTotal = ADDONS
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((s, a) => s + a.price * DAYS, 0);

  const fee = Math.round(base * 0.08);

  const total = base + addonTotal + fee;

  const steps = ["Trip Details", "Add-ons", "Confirm & Pay"];

  const handleConfirm = () => {
    const booking = {
      id: `DX-${Date.now()}`,
      car,
      from: form.from || "Mar 15",
      to: form.to || "Mar 18",
      days: DAYS,
      status: "pending" as const,
      total,
      addons: ADDONS
        .filter((a) => selectedAddons.includes(a.id))
        .map((a) => a.name),
      pickup: form.pickup,
    };

    addBooking(booking);
    showToast("Booking confirmed! 🎉");
    router.push("/confirm");
  };

  const iconMap: Record<string, React.ReactNode> = {
    Map: <Map size={20} />,
    Shield: <Shield size={20} />,
    Users: <Users size={20} />,
    User: <User size={20} />,
  };

  return (
    <>
      <Navbar />

      <main className="max-w-[900px] mx-auto p-8">

        <Link
          href={`/cars/${car.id}`}
          className="text-[var(--text2)] text-sm"
        >
          ← Back
        </Link>

        <h1 className="font-[Syne] text-2xl font-extrabold mt-4 mb-8">
          Complete Your Booking
        </h1>

        {/* Steps */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1">

              <div className="flex items-center gap-2">

                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm
                  ${
                    step > i + 1
                      ? "bg-[var(--gold)] text-[var(--navy)]"
                      : step === i + 1
                      ? "border-2 border-[var(--gold)] text-[var(--gold)]"
                      : "border-2 border-[var(--border2)] text-[var(--text3)]"
                  }`}
                >
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>

                <span
                  className={`text-xs font-medium ${
                    step === i + 1
                      ? "text-[var(--gold)]"
                      : "text-[var(--text3)]"
                  }`}
                >
                  {s}
                </span>

              </div>

              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-3 ${
                    step > i + 1
                      ? "bg-[var(--gold)]"
                      : "bg-[var(--border2)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-6">

          {/* FORM */}

          <div>

            {/* STEP 1 */}

            {step === 1 && (
              <div className="bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-7">

                <h3 className="font-[Syne] font-bold mb-6">
                  Trip Details
                </h3>

                {[
                  {
                    label: "Pickup Location",
                    key: "pickup",
                    placeholder: "Airport, hotel, or address",
                  },
                  {
                    label: "Return Location",
                    key: "dropoff",
                    placeholder: "Same as pickup (optional)",
                  },
                  {
                    label: "Full Name",
                    key: "name",
                    placeholder: "As on your license",
                  },
                ].map((f) => (
                  <div key={f.key} className="mb-4">

                    <div className="text-xs text-[var(--text3)] mb-1">
                      {f.label}
                    </div>

                    <input
                      className="w-full bg-[var(--navy3)] border border-[var(--border2)] rounded-lg px-4 py-3 text-sm"
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          [f.key]: e.target.value,
                        }))
                      }
                    />

                  </div>
                ))}

                <button
                  onClick={() => setStep(2)}
                  className="bg-[var(--gold)] text-[var(--navy)] px-6 py-2 rounded-lg mt-4"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div className="bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-7">

                <h3 className="font-[Syne] font-bold mb-2">
                  Optional Add-ons
                </h3>

                <p className="text-sm text-[var(--text2)] mb-6">
                  Enhance your experience with our premium extras.
                </p>

                <div className="flex flex-col gap-3 mb-6">

                  {ADDONS.map((addon) => {

                    const sel = selectedAddons.includes(addon.id);

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition
                        ${
                          sel
                            ? "border-[var(--gold)] bg-[var(--gold-glow)]"
                            : "border-[var(--border2)] bg-[var(--navy3)]"
                        }`}
                      >

                        <div className="w-11 h-11 bg-[var(--navy4)] rounded-lg flex items-center justify-center text-[var(--gold)]">
                          {iconMap[addon.icon]}
                        </div>

                        <div className="flex-1">

                          <div className="font-semibold text-sm">
                            {addon.name}
                          </div>

                          <div className="text-xs text-[var(--text2)]">
                            {addon.desc}
                          </div>

                        </div>

                        <div className="font-[Syne] font-bold text-[var(--gold)] text-sm">
                          +₹{addon.price}/day
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center
                          ${
                            sel
                              ? "bg-[var(--gold)]"
                              : "border border-[var(--border2)]"
                          }`}
                        >
                          {sel && <Check size={12} />}
                        </div>

                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => setStep(1)}
                    className="border border-[var(--border)] text-[var(--gold)] px-5 py-2 rounded-lg"
                  >
                    ← Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="bg-[var(--gold)] text-[var(--navy)] px-6 py-2 rounded-lg"
                  >
                    Continue →
                  </button>

                </div>
              </div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <div className="bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-7">

                <h3 className="font-[Syne] font-bold mb-6">
                  Payment Details
                </h3>

                <button
                  onClick={handleConfirm}
                  className="w-full bg-[var(--gold)] text-[var(--navy)] py-3 rounded-lg font-semibold"
                >
                  Pay ₹{total.toLocaleString("en-IN")} →
                </button>

              </div>
            )}

          </div>

          {/* SUMMARY */}

          <div>

            <div className="sticky top-20 bg-[var(--card)] border border-[var(--border2)] rounded-2xl p-6">

              <h3 className="font-[Syne] font-bold mb-4">
                Booking Summary
              </h3>

              <div className="flex gap-3 p-4 bg-[var(--navy3)] rounded-lg mb-5">

                <div className="text-4xl">{car.image}</div>

                <div>

                  <div className="font-[Syne] font-bold text-sm">
                    {car.name}
                  </div>

                  <div className="text-xs text-[var(--text2)]">
                    {car.brand} · {car.type}
                  </div>

                  <div className="text-xs text-[var(--gold)] mt-1">
                    ₹{(car.price * 83).toLocaleString("en-IN")}/day
                  </div>

                </div>

              </div>

              <div className="flex justify-between text-sm text-[var(--text2)] mb-2">
                <span>Base rate</span>
                <span>₹{base.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-sm text-[var(--text2)] mb-3">
                <span>Service fee</span>
                <span>₹{fee.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between border-t border-[var(--border)] pt-4">

                <span className="font-[Syne] font-bold">
                  Total
                </span>

                <span className="font-[Syne] font-extrabold text-xl text-[var(--gold)]">
                  ₹{total.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Toast />
    </>
  );
}