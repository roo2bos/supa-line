'use client';
// import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Body } from '@/_components';
import Link from 'next/link';
import Search from './_components/Search';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Article {
  title: string;
  body: string;
}

// const fetchArticles = async ({ pageParam = 0 }: { pageParam?: number }) => {
const getList = async ({
  pageParam = 0,
  code,
}: {
  pageParam?: number;
  code: string;
}) => {
  const response = await axios.get<Article[]>(
    `/api/stock?offset=${pageParam}&limit=24&code=${code}`,
  );
  return response.data; // 가공된 데이터 반환
};

export default function StockPage() {
  const params = useSearchParams();
  console.log(params.get('code'));
  const stockCode = params.get('code') || '005930';
  const stockName = params.get('name') || '삼성전자';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['stock', stockCode],
    queryFn: () => getList({ pageParam: 0, code: stockCode }),
    getNextPageParam: (lastPage) => {
      return lastPage.length ? (lastPage.length / 24) * 24 : undefined;
    },
    initialPageParam: 0,
    enabled: false,
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
    // retry: 0,
    // refetchOnMount: false,
    // refetchInterval: 10000,
    // refetchOnReconnect: false,
    // refetchOnFocus: false,
    // staleTime: 10000,
    // cacheTime: 10000,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [stockCode]);
  // if (isLoading) return <Body>Loading...</Body>;
  if (isError) return <Body>Error occurred!</Body>;

  return (
    <Body className="flex flex-col gap-md">
      <Search />
      <div className="flex gap-sm">
        <Link
          href={`https://m.stock.naver.com/domestic/stock/${stockCode}/discuss`}
          target="_blank"
          rel="noopener noreferrer"
        >
          네이버 종토방
        </Link>
        <Link
          href={`https://tossinvest.com/stocks/A${stockCode}/community`}
          target="_blank"
          rel="noopener noreferrer"
        >
          토스 커뮤니티
        </Link>
        <Link
          href="https://kr.investing.com/markets/south-korea"
          target="_blank"
          rel="noopener noreferrer"
        >
          인베스팅
        </Link>
      </div>
      <div className="flex-1">
        <iframe
          src={`https://m.stock.naver.com/domestic/stock/${stockCode}/discuss`}
          className="w-full h-full bg-transparent"
          allowTransparency={true}
        />
      </div>
      {/* <ul className="divide-y divide-gray-200">
          {isLoading || isFetching ? (
            <li>Loading..</li>
          ) : (
            data?.pages.map((page, pageIndex) =>
              page.map((article, index) => (
                <li
                  key={`${pageIndex}-${index}`}
                  className="py-4 border-b border-gray-200 last:border-b-0"
                >
                  <strong className="text-lg font-semibold">
                    {article.title}
                  </strong>
                  <p className="mt-2 text-gray-600">{article.body}</p>
                </li>
              )),
            )
          )}
        </ul> */}
      {/* {hasNextPage && <div>Loading more...</div>} */}
    </Body>
  );
}
