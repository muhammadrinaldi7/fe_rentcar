import { create } from "zustand";
import { User } from "./userStore";

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logged: boolean;
  setLogged: (logged: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
  user: null,
  setUser: (user: User | null) => set({ user }),
  logged: false,
  setLogged: (logged: boolean) => set({ logged }),
}));
