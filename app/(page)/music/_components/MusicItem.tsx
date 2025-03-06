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

  // videoId: string;
  // imgPath: string;
  // title: string;
  // desc: string;
  // onPlay: (id: string | null) => void; // 수정된 부분;
}
export default function MusicItem(props: ItemProps) {
  const { type = 'card', info /* videoId, imgPath, title, desc */ } = props;
  const decodedTitle = he.decode(info.title);
  const decodedDesc = he.decode(info.desc);
  const Item =
    type === 'card' ? (
      <MusicItemCard
        {...props}
        // info={info}
        info={{ ...info, title: decodedTitle }}
        // title={decodedTitle} // 디코딩된 제목
      />
    ) : (
      <MusicItemBar
        {...props}
        // info={info}
        info={{ ...info, title: decodedTitle, desc: decodedDesc }}
        // title={decodedTitle} // 디코딩된 제목
        // desc={decodedDesc} // 디코딩된 설명
      />
    );
  return Item;
}
