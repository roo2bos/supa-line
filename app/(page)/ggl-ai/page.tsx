'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

import { Body, Button, PageTitle } from '@/_components';
import Markdown from '@/_components/Markdown/Markdown';

const test = `샘플:

**첫 번째 문단 요약:** 다트 선수 케빈은 다트 던지기 어려움을 겪는 다트염(Dartitis)으로 고생하고 있으며, 이는 부상이 아닌 스트레스와 불안 때문입니다. 그는 심리 치료와 최면 치료를 받고 있으며, 다른 선수인 잭 또한 같은 문제를 겪었지만 극복했습니다. 이러한 사례를 통해 심리적인 문제에 대한 이야기 나누기가 선수들에게 도움이 될 수 있음을 보여줍니다.

**문장별 정리:**
1.  **Dartitis is a problem that makes it hard for dart players to throw their darts. Kevin, a darts champion, couldn’t let go of his dart during a game.**
    (다트염은 다트 선수들이 다트를 던지기 어렵게 만드는 문제입니다. 다트 챔피언인 케빈은 경기 중에 다트를 놓지 못했습니다.)
2.  **This problem is not because of a hurt arm but because of stress and worry.**
    (이 문제는 팔 부상 때문이 아니라 스트레스와 걱정 때문입니다.)`;

const fetchGeminiAPI = async (inputText: string) => {
  const res = await fetch('/api/ggl-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${inputText}
      나는 영어의 초급이고 위의 내용을 한국어로 번역해줘.
      전체 내용은 크게 2개의 문단으로 나눌꺼고 
      첫번째 문단은 내용 전체를 번역한 문단이야.
      두번째 문단은 문장 각각을 짧게 살펴 원문(강조 표시)과 번역된 문장을 줄바꿈한 후 괄호로 구분 해줘`,
    }),
  });

  if (!res.ok) {
    throw new Error('API 요청 실패');
  }

  const data = await res.json();
  return data.result;
};

const fetchUrlTranslateAPI = async (inputText: string) => {
  const res = await fetch('/api/ggl-ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${inputText}
      이 사이트의 본문 내용을 간단하게 원문과 한국어로 번역하여 요약해줘`,
    }),
  });

  if (!res.ok) {
    throw new Error('API 요청 실패');
  }

  const data = await res.json();
  return data.result;
};

export default function TranslateComponent() {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState('');

  const geminiMutation = useMutation({
    mutationFn: fetchGeminiAPI,
    onSuccess: (data) => {
      setResponseData(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const urlTranslateMutation = useMutation({
    mutationFn: fetchUrlTranslateAPI,
    onSuccess: (data) => {
      setResponseData(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Body>
      <PageTitle label={'Gemini 2.0 API 사용하기'} />
      <div>
        <Link
          href="https://englishdiary.net/category/english-newsroom/english-newsroom-level-1-beginner/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          초급 영어기사
        </Link>
      </div>

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
            <Markdown content={test} />
          )}
        </pre>
      </div>

      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="번역할 문장을 입력하세요..."
        />
        <div className="flex justify-end gap-10">
          <Button
            type="button"
            variant="contained"
            color="dark"
            className="px-4 py-2 mt-2 bg-green-500 rounded"
            onClick={() => urlTranslateMutation.mutate(inputText)}
            disabled={urlTranslateMutation.isPending}
          >
            {urlTranslateMutation.isPending ? '요약 중...' : 'URL 번역'}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="px-4 py-2 mt-2 bg-green-500 rounded"
            disabled={geminiMutation.isPending}
            onClick={() => geminiMutation.mutate(inputText)}
          >
            {geminiMutation.isPending ? '번역 중...' : '번역 요청'}
          </Button>
        </div>
      </div>
    </Body>
  );
}
