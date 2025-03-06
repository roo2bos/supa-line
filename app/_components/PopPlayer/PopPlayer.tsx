'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { MdMinimize } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';

import { Button } from '@/_components';
import { useVideoStore } from '@/stores/useVideoStore';

export default function PopPlayer() {
  const [isMin, setIsMin] = useState(false);
  const { videoId, playlistId, searchResult, dimded, onPlay } = useVideoStore(); // Zustand에서 videoId 가져오기

  const POSITION_BASE = {
    dimmed: 'inset-0 bg-black/70',
    normal: 'tablet:h-0',
  };

  const MIN_BASE = {
    dimmed: {
      min: 'justify-end items-end pb-sm pr-sm',
      max: 'grid-cols-1 tablet:p-md justify-center items-end tablet:items-center',
    },
    normal: {
      min: 'right-sm bottom-sm justify-end items-end grid-cols-1',
      max: 'w-full tablet:px-md grid-cols-1 tablet:w-full tablet:right-0 bottom-0 tablet:bottom-1/2 justify-center items-center',
    },
  };

  const positionBase = dimded ? POSITION_BASE.dimmed : POSITION_BASE.normal;
  const minBase = dimded
    ? isMin
      ? MIN_BASE.dimmed.min
      : MIN_BASE.dimmed.max
    : isMin
      ? MIN_BASE.normal.min
      : MIN_BASE.normal.max;

  const btnHover = dimded
    ? 'text-white hover:text-white/30'
    : 'text-black hover:text-black/30';

  const videoUrl = playlistId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&loop=1&playsinline=1&${searchResult ? 'playlist' : 'list'}=${playlistId}`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&loop=1&playsinline=1`;

  return (
    <>
      {videoId && (
        <div
          className={classNames(
            'fixed grid z-[2000]',
            `${positionBase} ${minBase}`,
            // dimded && 'pt-20',
          )}
        >
          <div
            className={classNames(
              'relative flex flex-col mx-auto w-full tablet:max-w-1280 [@media_(max-height:765px)]:tablet:w-auto [@media_(max-height:765px)]:tablet:max-w-[clamp(0px,calc(100vw-45px),100%)] [@media_(max-height:765px)]:tablet:h-[clamp(0px,calc(100vh-45px),765px)] [@media_(max-height:765px)]:tablet:aspect-video',
              isMin
                ? 'w-[clamp(0px,calc(100vw-32px),266px)] tablet:-translate-y-full'
                : '',
              // dimded ? 'mx-auto w-[calc(100vw-48px)] max-w-1280' : 'max-w-1280',
              dimded
                ? 'mx-auto w-full tablet:translate-y-0'
                : 'tablet:-translate-y-1/2',
              // : 'tablet:-translate-y-1/2  max-w-1280 aspect-video',
            )}
          >
            <div className="flex items-end justify-end">
              <Button
                icon={<MdMinimize className="mb-5" />}
                size="lg"
                className={`${btnHover}`}
                onClick={() => setIsMin(!isMin)}
              />
              <Button
                icon={<RiCloseLine />}
                size="lg"
                className={btnHover}
                onClick={() => onPlay(null)}
              />
            </div>
            <div
              className={classNames(
                // "relative w-full aspect-video flex-1 bg-black border-2 border-white",
                'relative w-full aspect-video flex-1 bg-black',
                ' shadow-[0_0_50px_10px_rgb(0_0_0/30%)]',
                'after:pointer-events-none after:inset-0 after:absolute',
                // "after:shadow-[0px_0px_10px_10px_rgba(0,_102,_204,_0.14)_inset,_0px_0px_50px_45px_rgba(0,_102,_204,_0.14)_inset,_0px_0px_0px_2px_rgba(153,_204,_255,_0.2)_inset]",
                'after:shadow-[0px_0px_10px_10px_rgba(0,_102,_204,_0.18)_inset,_0px_0px_50px_45px_rgba(0,_102,_204,_0.30)_inset,_0px_0px_0px_2px_rgba(153,_204,_255,_0.44)_inset]',
                'after:shadow-[0px_0px_10px_10px_rgba(23,23,23,0.18)_inset,_0px_0px_50px_45px_rgba(23,23,23,0.30)_inset,_0px_0px_0px_2px_rgba(153,_204,_255,_0.44)_inset]',
              )}
            >
              <iframe
                src={videoUrl}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
