export interface Car {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  seats: number;
  fuel: string;
  transmission: string;
  rating: number;
  reviews: number;
  mileage: string;
  engine: string;
  image: string;
  color: string;
  available: boolean;
  features: string[];
  description: string;
}

export interface Booking {
  id: string;
  car: Car;
  from: string;
  to: string;
  days: number;
  status: "active" | "pending" | "completed" | "cancelled";
  total: number;
  addons: string[];
  pickup?: string;
}

export interface Addon {
  id: string;
  icon: string;
  name: string;
  desc: string;
  price: number;
}
