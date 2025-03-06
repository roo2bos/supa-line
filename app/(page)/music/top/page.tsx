'use client';

import { useQuery } from '@tanstack/react-query';

import { getMusicBest } from '@/_services/music.service';

import MusicList from '../_components/MusicList';

export default function MusicPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['musicList', 'best'], // 쿼리 키 지정
    queryFn: () => getMusicBest(), // 비동기 함수 지정
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results.</div>;

  return (
    data && (
      <>
        <MusicList data={data} type={'card'} />
      </>
    )
  );
}
