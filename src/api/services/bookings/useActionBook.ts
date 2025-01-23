import axiosClient from "@/api/axiosClient";
// import endpoints from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";

export interface BookPayload {
  car_id: number;
  promo_code: string;
  start_date: string;
  end_date: string;
}
// export interface BookResponse {

// }

export const useActionBook = (url: string) => {
  //   const queryClient = useQueryClient();
  const { mutate: createBook } = useMutation({
    mutationFn: async (payload: BookPayload) => {
      const response = await axiosClient.post(url, payload);
      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["fetchAllCars", endpoints.createBook],
    //   });
    // },
  });
  const { mutate: applyPromo } = useMutation({
    mutationFn: async (payload: {
      promo_code: string;
      total_price: number;
    }) => {
      const response = await axiosClient.post(url, payload);
      return response.data;
    },
  });

  return { createBook, applyPromo };
};
