import axiosClient from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { SinggleResponse } from "../cars/useViewCars";
import { CarResponse } from "../cars/useActionCar";

export interface myBooking {
  id: number;
  user_id: number;
  car_id: number;
  promo_code: string;
  start_date: string; // Format tanggal ISO (YYYY-MM-DD)
  end_date: string; // Format tanggal ISO (YYYY-MM-DD)
  total_price: number;
  discount_applied: number;
  final_price: number;
  status: string; // Contoh: 'pending', 'confirmed', dll.
  created_at: string; // Format datetime ISO
  updated_at: string; // Format datetime ISO
  car: CarResponse;
}
export interface myBookToPay {
  id: number;
  promo_code: string;
  start_date: string; // Format tanggal ISO (YYYY-MM-DD)
  end_date: string; // Format tanggal ISO (YYYY-MM-DD)
  total_price: number;
  discount_applied: number;
  final_price: number;
  status: string; // Contoh: 'pending', 'confirmed', dll.
  duration: number;
  car: CarResponse;
}
export const useViewBook = (url: string) => {
  return useQuery({
    queryKey: ["fetchMyBook"],
    queryFn: async () => {
      const response = await axiosClient.get<SinggleResponse<myBooking[]>>(url);
      return response.data.data;
    },
  });
};

export const useBookTopPay = (url: string) => {
  return useQuery({
    queryKey: ["fetchMyBookTopPay"],
    queryFn: async () => {
      const response = await axiosClient.get<SinggleResponse<myBookToPay>>(url);
      return response.data.data;
    },
  });
};
