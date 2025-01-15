import { create } from "zustand";

interface HeaderState {
  isOpen: boolean;
  toggle: () => void;
}
export const useHeaderStore = create<HeaderState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
