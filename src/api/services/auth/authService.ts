import axiosClient from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  success: string;
  message: string;
  token: string;
}
interface RegisterPayload {
  email: string;
  password: string;
}
interface RegisterResponse {
  success: string;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

export const useLoginService = (url: string) => {
  const route = useRouter();
  const { mutate: login } = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axiosClient.post<LoginResponse>(url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Log untuk memastikan token disimpan
      Cookies.set("token", data.token);
      console.log("Token saved:", Cookies.get("token"));
      // Log untuk memastikan route.push dipanggil
      console.log("Redirecting to /user/home");
      setTimeout(() => {
        route.push("/user/home");
      }, 2000);
    },
  });
  const { mutate: register } = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await axiosClient.post<RegisterResponse>(url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`${data.data.name}, ${data.message}`, { duration: 3000 });
      route.push("/auth/login");
      // Simpan token ke cookie/localStorage/sessionStorage jika diperlukan
    },
  });

  return { login, register };
};
