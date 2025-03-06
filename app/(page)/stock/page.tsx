'use client';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Body } from '@/_components';

import Search from './_components/Search';

export default function StockPage() {
  const params = useSearchParams();
  console.log(params.get('code'));
  const stockCode = params.get('code') || '005930';

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
        />
      </div>
    </Body>
  );
}
