'use client';

import React, { useState } from 'react';

import { Body, PageTitle } from '@/_components';

const TranslateGPT = () => {
  const [inputText, setInputText] = useState('hello');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslatedText('');

    try {
      const response = await fetch('/api/translate-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputText }),
      });

      const data = await response.json();

      if (data.success) {
        setTranslatedText(data.data); // 결과 저장
      } else {
        setTranslatedText('번역에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during translation:', error);
      setTranslatedText('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <PageTitle label={'Chat GPT API 사용하기'} />
      <div>
        <label>
          <strong>입력:</strong>
        </label>
        <br />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        />
      </div>
      <button
        onClick={handleTranslate}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? '번역 중...' : '번역'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <label>
          <strong>결과:</strong>
        </label>
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
            minHeight: '50px',
            fontSize: '16px',
          }}
        >
          {typeof translatedText === 'object' ? (
            <pre>{JSON.stringify(translatedText, null, 2)}</pre>
          ) : (
            translatedText || '번역 결과가 여기에 표시됩니다.'
          )}
        </div>
      </div>
    </Body>
  );
};

export default TranslateGPT;
