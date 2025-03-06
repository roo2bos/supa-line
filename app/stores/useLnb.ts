import { create } from 'zustand';

interface VideoState {
  isLnbOpen: boolean;
  onClick: (isLnbOpen: boolean) => void;
}

export const useLnb = create<VideoState>((set) => ({
  isLnbOpen: false,
  onClick: (isLnbOpen) => set({ isLnbOpen }),
}));
