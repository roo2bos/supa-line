'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="mb-4 text-2xl font-bold">오류가 발생했습니다!</h1>
      <p className="mb-4 text-gray-500">{error.message || '알 수 없는 오류'}</p>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
        onClick={() => reset()} // 에러 복구
      >
        다시 시도하기
      </button>
    </div>
  );
}
