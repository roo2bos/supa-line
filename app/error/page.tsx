'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CONST } from '@/_lib/constants';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Error 발생:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="mb-6 font-bold">{CONST.TITLE.SITE_TITLE}</h1>
      <p className="text-red-500">
        {error.message || '알 수 없는 오류가 발생했습니다.'}
      </p>
      <p className="mt-2 text-gray-500">
        문제가 계속된다면 <br />
        <a href="mailto:roo2bos@gmail.com" className="underline">
          roo2bos@gmail.com
        </a>{' '}
        으로 문의해 주세요.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          뒤로가기
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          메인
        </Link>
      </div>
    </div>
  );
}
