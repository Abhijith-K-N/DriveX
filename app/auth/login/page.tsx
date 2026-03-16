"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const { showToast } = useStore();
  const router = useRouter();

  const handleSubmit = () => {
    showToast(
      mode === "login"
        ? "Welcome back! 🎉"
        : "Account created! Welcome to DriveX 🚗"
    );
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen grid grid-cols-2">

      {/* Left panel */}
      <div className="bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_70%),var(--navy2)] flex items-center justify-center p-12 border-r border-[var(--border2)] flex-col text-center">

        <div className="text-[5rem] mb-6">🏎️</div>

        <div className="font-[Syne] text-[2.5rem] font-extrabold text-[var(--gold)] mb-4">
          Drive<span className="text-[var(--text)]">X</span>
        </div>

        <h2 className="font-[Syne] text-[1.5rem] font-bold mb-4 max-w-[280px]">
          Your Premium Drive Awaits
        </h2>

        <p className="text-[var(--text2)] leading-relaxed max-w-[280px]">
          Join thousands of satisfied drivers who trust DriveX for their premium rental needs.
        </p>

        <div className="flex gap-8 mt-10">
          {[["500+", "Cars"], ["50K+", "Clients"], ["4.9★", "Rating"]].map(
            ([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-[Syne] font-extrabold text-[var(--gold)] text-[1.4rem]">
                  {n}
                </div>
                <div className="text-xs text-[var(--text3)]">{l}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-12 bg-[var(--navy)]">
        <div className="w-full max-w-[380px]">

          <div className="mb-8">
            <h2 className="font-[Syne] text-[1.7rem] font-extrabold mb-1">
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-[var(--text2)] text-sm">
              {mode === "login"
                ? "Welcome back to DriveX"
                : "Join DriveX today"}
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-2 bg-[var(--navy3)] rounded-xl p-1.5 mb-6">
            {(["login", "register"] as const).map((m) => (
              <div
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 text-center py-2 rounded-lg cursor-pointer text-sm font-medium transition-all
                ${
                  mode === m
                    ? "bg-[var(--navy4)] text-[var(--gold)]"
                    : "text-[var(--text2)]"
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </div>
            ))}
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            {["G  Google", "🍎  Apple"].map((p) => (
              <button
                key={p}
                className="flex-1 bg-transparent text-[var(--gold)] border border-[var(--border)] rounded-lg py-2 font-medium cursor-pointer text-sm"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="text-center text-xs text-[var(--text3)] mb-6">
            — or continue with email —
          </div>

          {/* Register name */}
          {mode === "register" && (
            <div className="mb-4">
              <div className="text-xs text-[var(--text3)] mb-1">
                Full Name
              </div>
              <input
                className="bg-[var(--navy3)] border border-[var(--border2)] rounded-lg px-4 py-3 text-[var(--text)] text-sm outline-none w-full"
                placeholder="Arjun Kumar"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <div className="text-xs text-[var(--text3)] mb-1">
              Email Address
            </div>
            <input
              type="email"
              className="bg-[var(--navy3)] border border-[var(--border2)] rounded-lg px-4 py-3 text-[var(--text)] text-sm outline-none w-full"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-[var(--text3)]">
                Password
              </div>
              {mode === "login" && (
                <span className="text-xs text-[var(--gold)] cursor-pointer">
                  Forgot password?
                </span>
              )}
            </div>

            <input
              type="password"
              className="bg-[var(--navy3)] border border-[var(--border2)] rounded-lg px-4 py-3 text-[var(--text)] text-sm outline-none w-full"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[var(--gold)] text-[var(--navy)] rounded-lg py-3 font-medium text-base mt-2"
          >
            {mode === "login" ? "Sign In →" : "Create Account →"}
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-1 mt-4 text-[var(--text2)] text-sm"
          >
            ← Back to Home
          </Link>

        </div>
      </div>
    </main>
  );
}