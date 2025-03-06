import { FavoriteLinkType } from '@/_types/etc.type';
import api from '@/utils/api';

// 데이터 조회 함수
export const getFavoriteLink = async (): Promise<FavoriteLinkType[]> => {
  const response = await api.get('/favoritelink');

  return response.data;
};
