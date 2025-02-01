"use client";
import { useAuthStore } from "@/stores/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const queryClient = new QueryClient();
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthStore();
  useEffect(() => {
    Cookies.set("token", token);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </QueryClientProvider>
  );
}
