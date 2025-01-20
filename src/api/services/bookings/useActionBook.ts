import axiosClient from "@/api/axiosClient";
// import endpoints from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";

export interface BookPayload {
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  final_price: number;
  status: string;
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

  return { createBook };
};
