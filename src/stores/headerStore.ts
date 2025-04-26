import { create } from "zustand";

interface HeaderState {
  isOpen: boolean;
  isDashboard: boolean;
  toggle: () => void;
  toggleDashboard: () => void;
}
export const useHeaderStore = create<HeaderState>((set) => ({
  isOpen: false,
  isDashboard: false,
  toggleDashboard: () => set((state) => ({ isDashboard: !state.isDashboard })),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
