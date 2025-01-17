import axiosClient from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { SinggleResponse } from "../cars/useViewCars";

export interface Promo {
  id: number;
  code: string;
  description: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  minimum_order_value: number;
  max_discount_value: number;
  status: string;
}
export const useFetchPromoActive = (url: string) => {
  return useQuery({
    queryKey: ["fetchAllPromoActive"],
    queryFn: async () => {
      const response = await axiosClient.get<SinggleResponse<Promo[]>>(url);
      return response.data.data;
    },
  });
};
