import { NEXT_PUBLIC_GOOGLE_API_KEY, NEXT_PUBLIC_GOOGLE_CHANNEL_ID } from '@/_lib/constants/url.constant';
import { YouTubeVideo } from '@/_types/youtube/youtube.type';
import api from '@/utils/api';
import axios from 'axios';

// 데이터 조회 함수
export const getMusicSearch = async (query: string) => {
  const { data } = await api.get<YouTubeVideo[]>(
    `/music/search?query=${encodeURIComponent(query)}`,
  );
  return data;
};

export const getMusicBest = async () => {
  const { data } = await api.get<YouTubeVideo[]>('/music/top');
  return data;
};

export const getMusicFav = async () => {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${NEXT_PUBLIC_GOOGLE_CHANNEL_ID}&key=${NEXT_PUBLIC_GOOGLE_API_KEY}`,
  );
  return data.items;
}
