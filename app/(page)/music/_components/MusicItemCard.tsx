import Image from 'next/image';
import Link from 'next/link';
import { BsPlayCircleFill } from 'react-icons/bs';
import { CgArrowTopRight } from 'react-icons/cg';

import { useVideoStore } from '@/stores/useVideoStore';
interface ItemProps {
  index: number;
  info: {
    videoId: string;
    imgPath: string;
    title: string;
    desc?: string;
  };
}
export default function MusicItemCard({ index, info }: ItemProps) {
  const { onPlay, onDimded } = useVideoStore();

  return (
    <li
      key={info.videoId}
      className="relative flex flex-col items-end gap-10 bg-white rounded-lg p-sm"
    >
      <button
        className="relative w-full overflow-hidden group  after:bg-[linear-gradient(to_top,rgba(255,255,255,1)_30%,rgba(255,255,255,0)_110%)] after:absolute after:inset-0 after:translate-x-[-20%] after:translate-y-[-62%] after:rotate-[153deg] after:scale-[1.5]"
        onClick={() => (onPlay(info.videoId), onDimded(true))}
      >
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-lg group aspect-video after:absolute after:inset-0 group-hover:after:bg-black/40">
          <Image
            src={info.imgPath}
            alt={info.title}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover duration-300 group-hover:scale-125"
          />
          <div className="z-10 flex items-center text-white duration-300 scale-0 group-hover:scale-100">
            <BsPlayCircleFill className="h-25 w-25" />
          </div>
        </div>
      </button>
      <Link
        href={`https://www.youtube.com/watch?v=${info.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 w-full grid-rows-2 gap-10"
      >
        <div className=" group grid grid-cols-[1fr_20px]">
          <b className="block text-primary">#{index + 1}</b>
          <div className="text-primary">
            <CgArrowTopRight className="w-20" />
          </div>
        </div>
        <strong className="font-normal line-clamp-2">{info.title}</strong>
      </Link>
    </li>
  );
}
