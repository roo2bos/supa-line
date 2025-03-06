'use client';

import { useQuery } from '@tanstack/react-query';

import { getMusicFav } from '@/_services/music.service';

import MusicList from '../_components/MusicList';

export default function FavPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['musicList', 'fav'],
    queryFn: getMusicFav,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No data found.</div>;
  }

  return (
    data && (
      <>
        <MusicList data={data} type={'card'} />
      </>
    )
  );
}
