// components/TranslateForm.tsx
'use client';

import { useState } from 'react';

import { Body, Button, PageTitle } from '@/_components';

const TranslateForm = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/translate-ggl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      setError('An error occurred during translation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <PageTitle label={'Google Translate API 사용하기'} />
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        placeholder="Enter text to translate"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="px-4 py-2 mt-2 bg-green-500 rounded"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </Button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {translatedText && (
        <div className="mt-4">
          <h3 className="font-semibold">Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </Body>
  );
};

export default TranslateForm;
