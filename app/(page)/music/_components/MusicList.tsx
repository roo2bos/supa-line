import { YouTubeVideo } from '@/_types/youtube/youtube.type';

import MusicItem from './MusicItem';

export default function MusicList({
  data,
  type,
}: {
  data: YouTubeVideo[];
  type: 'card' | 'bar';
}) {
  return (
    <>
      {type === 'bar' ? (
        <ul className="grid grid-cols-1 gap-10 pt-20 mt-20 border-t tablet:grid-cols-2 desktop:grid-cols-3">
          {data.map((item, i) => (
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
      ) : (
        <ul className="grid grid-cols-2 gap-10 pt-20 mt-20 border-t micro-only:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-5">
          {data.map((item, i) => (
            <MusicItem
              key={i}
              index={i}
              type={'card'}
              info={{
                videoId: item.snippet.resourceId.videoId,
                imgPath: item.snippet.thumbnails.high.url,
                title: item.snippet.title,
                desc: item.snippet.description,
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
}
