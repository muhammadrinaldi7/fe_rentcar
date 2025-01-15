import { create } from "zustand";

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
