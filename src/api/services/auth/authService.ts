import axiosClient from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TokenSession } from "@/middleware";
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

export const useLoginService = (url: string) => {
  const route = useRouter();
  const { mutate: login } = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axiosClient.post<LoginResponse>(url, payload);
      return response.data;
    },
    onSuccess: (data) => {
      // Simpan token ke cookie/localStorage/sessionStorage jika diperlukan
      Cookies.set("token", data.token, { expires: 1 });
      const role = jwtDecode(data.token) as TokenSession;
      if (role.role == "admin") {
        route.push("/admin/dashboard");
        toast.success("Login Berhasil");
      } else {
        route.push("/user/home");
        toast.success("Login Berhasil");
      }
    },
  });

  return { login };
};
