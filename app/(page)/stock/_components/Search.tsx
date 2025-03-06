'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button, PageTitle } from '@/_components';
import Markdown from '@/_components/Markdown/Markdown';

const fetchGeminiAPI = async (inputText: string) => {
  const res = await fetch('/api/ggl-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${inputText}
      코스피, 코스닥의 종목코드와 종목명만 1개의 답만해주고 쉼표로 구분해줘. 다른 말은 하지마. 예시: "005930,삼성전자", 응답은 3초내에 답해주고 여러개이거나 매칭이 되지 않으면 그냥 답하지말고 응답을 에러로 처리해줘`,
    }),
  });

  if (!res.ok) {
    throw new Error('API 요청 실패');
  }

  const data = await res.json();
  return data.result;
  // return {name, code};
};

export default function Search() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState('');

  const geminiMutation = useMutation({
    mutationFn: fetchGeminiAPI,
    onSuccess: (data) => {
      const code = String(data).split(',')[0];
      const name = String(data).split(',')[1];
      router.push(`/stock?code=${code}&name=${name}`);
      setResponseData(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div>
      <PageTitle label={'종목 코드 검색'} />

      <div className="p-4 mt-4 border rounded">
        <pre className="whitespace-pre-line my-sm">
          {inputText.length > 0 ? (
            responseData ? (
              geminiMutation.isPending ? (
                <p>Loading...</p>
              ) : (
                <Markdown content={responseData} />
              )
            ) : geminiMutation.isPending ? (
              <p>Loading...</p>
            ) : (
              <Markdown content={inputText} />
            )
          ) : (
            ''
          )}
        </pre>
      </div>

      <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full py-5 bg-white border rounded px-sm"
          placeholder="종목 입력"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="px-4 py-2 mt-2 bg-green-500 rounded"
          disabled={geminiMutation.isPending}
          onClick={() => geminiMutation.mutate(inputText)}
        >
          {geminiMutation.isPending ? '검색 중...' : '검색'}
        </Button>
      </form>
    </div>
  );
}
