import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";

export const useUploadImageService = () => {
  const { mutate: uploadImage } = useMutation({
    mutationFn: async (images: File[]) => {
      const formData = new FormData();

      // Menambahkan semua gambar ke dalam FormData
      images.forEach((image) => {
        formData.append("images[]", image); // 'images[]' bisa disesuaikan dengan format parameter yang dibutuhkan di server
      });

      const response = await axiosClient.post(endpoints.uploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });

  return { uploadImage };
};
