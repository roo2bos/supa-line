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
  //   videoId: string;
  //   imgPath: string;
  //   title: string;
  //   desc: string;
}
export default function MusicItemCard({
  index,
  info,
  // videoId,
  // imgPath,
  // title,
  // desc,
}: ItemProps) {
  const { onPlay, onDimded } = useVideoStore();

  return (
    <li
      key={info.videoId}
      className="grid grid-cols-[80px_auto] relative gap-10 items-end bg-white rounded-lg p-sm"
    >
      <button
        className="relative flex-0 overflow-hidden group  after:bg-[linear-gradient(to_top,rgba(255,255,255,1)_30%,rgba(255,255,255,0)_110%)] after:absolute after:inset-0 after:translate-x-[-20%] after:translate-y-[-62%] after:rotate-[153deg] after:scale-[1.5]"
        onClick={() => (onPlay(info.videoId), onDimded(true))}
      >
        <div className="relative flex items-center justify-center w-full overflow-hidden rounded-lg group aspect-square after:absolute after:inset-0 group-hover:after:bg-black/40">
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
      <div className="flex-1 h-full overflow-hidden">
        <Link
          href={`https://www.youtube.com/watch?v=${info.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex flex-col w-full grid-rows-2 group"
        >
          <div className="grid grid-cols-[1fr_20px]">
            <b className="block text-primary">#{index + 1}</b>
            <div className="transition-all rotate-45 opacity-0 text-primary group-hover:opacity-100 group-hover:rotate-0">
              <CgArrowTopRight />
            </div>
          </div>
          <strong
            title={info.title}
            className="line-clamp-1 group-hover:underline"
          >
            {info.title}
          </strong>
          {/* <BiWindows className="hidden w-20 h-20 group-hover:block" /> */}
          {info.desc && (
            <p title={info.desc} className="w-full text-xs line-clamp-2">
              {info.desc}
            </p>
          )}
        </Link>
      </div>
    </li>
  );
}
