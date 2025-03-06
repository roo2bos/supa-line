// import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getMusicBest, getMusicSearch } from '@/_services/music.service';
// import { YouTubeVideo } from '@/_types/youtube/youtube.type';
import { useVideoStore } from '@/stores/useVideoStore';

const MusicHeader = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // console.log(pathname);

  const { onPlay, onDimded } = useVideoStore();
  const searchWord = params.get('q') || '';
  // const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: bestList,
    // error,
    // isLoading,
    // refetch,
  } = useQuery({
    queryKey: ['musicList', 'best'], // 쿼리 키 지정
    queryFn: () => getMusicBest(), // 비동기 함수 지정
    // enabled: false, // 초기 실행 방지
  });

  const {
    data: searchList,
    // isLoading: isSearching,
    // refetch: refetchSearch,
    // error: searchError,
  } = useQuery({
    queryKey: ['musicList', 'search'],
    queryFn: () => getMusicSearch(searchWord),
    enabled: false, // 초기 실행 방지
  });

  // 베스트 전체 재생
  const handleBestPlayAll = () => {
    if (bestList) {
      const firstItem = bestList[0].snippet.playlistId;
      onPlay(bestList[0].snippet.resourceId.videoId, firstItem);
      onDimded(false);
      console.log({
        bestList: bestList,
        title: bestList.map((item) => item.snippet.title),
        titles: bestList
          .map((item) => item.snippet.title)
          .slice(1)
          .join(','),
      });
    }
  };
  // 검색 전체 재생
  const handleFindPlayAll = () => {
    if (!searchList || searchList.length === 0) return;
    const videoIds = searchList.map((item) => item.id.videoId);
    const videoId = videoIds[0];
    const videoList = videoIds.slice(0).join(',');
    onPlay(videoId, videoList, true); //  onPlay(첫번째 비디오 id, 검색된 영상 목록들, true)
    onDimded(false);
    // console.log('검색결과: ', {
    //   searchList: searchList,
    //   title: searchList.map((item) => item.snippet.title),
    //   titles: searchList
    //     .map((item) => item.snippet.title)
    //     .slice(1)
    //     .join(','),
    // });
  };
  return (
    <>
      <Swiper
        slidesPerView="auto"
        wrapperClass="space-x-10"
        // onSlideChange={(swiper) => {
        //   setActiveIndex(swiper.activeIndex);
        // }}
      >
        {[
          { id: 'best', tit: '이번주 베스트', path: '/music/top' },
          { id: 'fav', tit: '내 목록', path: '/music/fav' },
        ].map((item) => (
          <SwiperSlide
            key={item.id}
            className={classNames(
              'w-auto',
              item.path === pathname && 'font-bold',
            )}
          >
            <Link href={item.path}>{item.tit}</Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-between gap-10">
        <div className="flex gap-10">
          <button onClick={handleBestPlayAll}>베스트 전체제생</button>
          {params.get('q') && (
            <button onClick={handleFindPlayAll}>검색 전체제생</button>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicHeader;
