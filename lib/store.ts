import { create } from "zustand";
import { Car, Booking } from "./types";

interface BookingStore {
  selectedCar: Car | null;
  favorites: number[];
  bookings: Booking[];
  toast: { msg: string; type: "success" | "error" } | null;
  setSelectedCar: (car: Car | null) => void;
  toggleFavorite: (id: number) => void;
  addBooking: (booking: Booking) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  clearToast: () => void;
}

export const useStore = create<BookingStore>((set) => ({
  selectedCar: null,
  favorites: [],
  bookings: [
    {
      id: "DX-2025-001",
      car: {
        id: 2, name: "Mercedes S-Class", brand: "Mercedes", type: "Luxury",
        price: 280, seats: 5, fuel: "Hybrid", transmission: "Automatic",
        rating: 4.8, reviews: 204, mileage: "14 km/l", engine: "3.0L Inline-6",
        image: "🚘", color: "#A8B8C8", available: true,
        features: ["Massage Seats", "Burmester Audio", "Night Vision", "AR Navigation"],
        description: "The pinnacle of automotive luxury.",
      },
      from: "Mar 10", to: "Mar 14", days: 4, status: "active",
      total: 1120, addons: ["GPS", "Insurance"],
    },
    {
      id: "DX-2025-002",
      car: {
        id: 1, name: "Porsche 911 GT3", brand: "Porsche", type: "Sports",
        price: 320, seats: 2, fuel: "Petrol", transmission: "Automatic",
        rating: 4.9, reviews: 128, mileage: "8 km/l", engine: "4.0L Flat-6",
        image: "🏎️", color: "#E8C547", available: true,
        features: ["Sport Exhaust", "Carbon Ceramic Brakes", "Rear Wing", "Track Mode"],
        description: "The ultimate expression of Porsche motorsport DNA.",
      },
      from: "Feb 20", to: "Feb 22", days: 2, status: "completed",
      total: 640, addons: [],
    },
  ],
  toast: null,
  setSelectedCar: (car) => set({ selectedCar: car }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
  addBooking: (booking) =>
    set((state) => ({ bookings: [booking, ...state.bookings] })),
  showToast: (msg, type = "success") => {
    set({ toast: { msg, type } });
    setTimeout(() => set({ toast: null }), 3500);
  },
  clearToast: () => set({ toast: null }),
}));
