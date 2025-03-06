'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { YouTubeVideo } from '@/_types/youtube/youtube.type';
import api from '@/utils/api';

import MusicList from '../_components/MusicList';

export default function SearchMusicList() {
  const params = useSearchParams();
  const query = params.get('q');
  const { data, isLoading, error } = useQuery({
    queryKey: ['musicList', 'search'],
    queryFn: async () => {
      const { data } = await api.get<YouTubeVideo[]>(
        `/music/search?query=${query}`,
      );
      return data;
    },
    enabled: !!query, // `q`가 있을 때만 실행
  });
  // useEffect(() => {
  //   console.log(data);
  //   refetch();
  // }, [query]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results.</div>;

  return (
    data && (
      <>
        <MusicList data={data} type={'bar'} />
      </>
    )
  );
}
