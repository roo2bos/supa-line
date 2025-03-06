import he from 'he';

import MusicItemBar from './MusicItemBar';
import MusicItemCard from './MusicItemCard';
interface ItemProps {
  type: 'card' | 'bar';
  index: number;
  info: {
    videoId: string;
    imgPath: string;
    title: string;
    desc: string;
  };
}
export default function MusicItem(props: ItemProps) {
  const { type = 'card', info } = props;
  const decodedTitle = he.decode(info.title);
  const decodedDesc = he.decode(info.desc);
  const Item =
    type === 'card' ? (
      <MusicItemCard {...props} info={{ ...info, title: decodedTitle }} />
    ) : (
      <MusicItemBar
        {...props}
        info={{ ...info, title: decodedTitle, desc: decodedDesc }}
      />
    );
  return Item;
}
