import { create } from 'zustand';

interface VideoState {
  videoId: string | null;
  playlistId?: string | null;
  dimded?: boolean;
  searchResult: boolean;
  onPlay: (
    videoId: string | null,
    playlistId?: string | null,
    searchResult?: boolean,
  ) => void;
  // onClose: (false) => void;
  onDimded: (dimded: boolean) => void;
  // onPlaylistId: (id: string | null) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoId: null,
  playlistId: null,
  dimded: false,
  searchResult: false,
  onPlay: (videoId, playlistId = null, searchResult = false) =>
    set({ videoId, playlistId, searchResult }),
  onDimded: (dimded = false) => set({ dimded }),
}));
