'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { YouTubeVideo } from '@/_types/youtube/youtube.type';

import MusicItem from '../../_components/MusicItem';

export default function MusicList({ params }: { params: { seq: string } }) {
  const {
    data: searchList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['searchResults', params.seq],
    queryFn: async () => {
      const { data } = await axios.get<YouTubeVideo[]>(
        `/api/music/search?query=${params.seq}`,
      );
      return data;
    },
    enabled: !!params.seq, // `seq`가 있을 때만 실행
  });
  console.log({ searchList: searchList });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading search results.</div>;

  return (
    <ul className="grid grid-cols-1 gap-10 pt-20 mt-20 border-t tablet:grid-cols-2 desktop:grid-cols-3">
      {searchList?.map((item, i) => (
        <MusicItem
          key={item.id.videoId}
          index={i}
          type={'bar'}
          info={{
            videoId: item.id.videoId,
            imgPath: item.snippet.thumbnails.high.url,
            title: item.snippet.title,
            desc: item.snippet.description,
          }}
        />
      ))}
    </ul>
  );
}
