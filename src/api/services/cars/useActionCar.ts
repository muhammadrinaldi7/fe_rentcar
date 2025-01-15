import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CarPayload {
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
}
export interface CarResponse {
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

export const useActionCar = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: createCar } = useMutation({
    mutationFn: async (payload: CarPayload) => {
      const response = await axiosClient.post(url, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchAllCars", endpoints.createCar],
      });
    },
  });

  return { createCar };
};
