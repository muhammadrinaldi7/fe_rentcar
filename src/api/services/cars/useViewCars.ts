import axiosClient from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

export interface Response<T> {
  data: ApiResponse<T>;
  message: string;
  success: string;
}
export interface SinggleResponse<T> {
  success: string;
  message: string;
  data: T;
}
interface Car {
  // Anda bisa menyesuaikan properti berdasarkan data mobil yang ada
  id: number;
  name: string;
  brand: string;
  model: string;
  fuel: number;
  capacity: number;
  transmission: string;
  year: number;
  price_per_day: number;
  available: number;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

interface PaginationLinks {
  // URL yang digunakan untuk navigasi pagination
  url: string | null;
  label: string;
  active: boolean;
}

interface ApiResponse<T> {
  current_page: number;
  data: T; // Array of cars
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[]; // Pagination links (prev, next, etc.)
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const useFetchAllCars = (url: string) => {
  return useQuery({
    queryKey: ["fetchAllCars"],
    queryFn: async () => {
      const response = await axiosClient.get<Response<Car[]>>(url);
      return response.data.data;
    },
  });
};
export const useFetchDetailCar = (url: string) => {
  return useQuery({
    queryKey: ["detailCar"],
    queryFn: async () => {
      const response = await axiosClient.get<SinggleResponse<Car>>(url);
      return response.data;
    },
  });
};
