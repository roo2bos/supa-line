import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiLinkAlt } from 'react-icons/bi';

const ThumbLink = ({ fileUrl }: { fileUrl: string }) => {
  // 이미지 파일인지 체크
  const isImage = /\.(jpeg|jpg|gif|png|webp|avif|svg)$/i.test(fileUrl);
  // YouTube 링크인지 체크
  const youtubeMatch = fileUrl.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i,
  );
  const youtubeThumbnail = youtubeMatch
    ? `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`
    : null;

  return (
    <div className="mt-4">
      <Link
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-flex items-center h-32 gap-5"
      >
        <BiLinkAlt />{' '}
        {isImage ? (
          <Image
            src={fileUrl}
            alt="Uploaded File"
            width={32}
            height={32}
            className="object-cover h-32 rounded-md aspect-square"
          />
        ) : youtubeThumbnail ? (
          <Image
            src={youtubeThumbnail}
            alt="YouTube Thumbnail"
            width={32}
            height={32}
            className="object-cover h-32 rounded-md aspect-square"
          />
        ) : (
          <>Link</>
        )}
      </Link>
    </div>
  );
};

export default ThumbLink;
