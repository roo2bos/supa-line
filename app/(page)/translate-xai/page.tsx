'use client';

import { useState } from 'react';
import axios from 'axios';
import { Body, Button, PageTitle } from '@/_components';

const TranslateXAI = () => {
  const [question, setQuestion] = useState('What is the meaning of life?');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/translate-xai', { question });
      console.log(response);
      if (response.status === 200) {
        setAnswer(response.data.answer);
      } else {
        console.error('Error from server:', response.data.error);
        setAnswer(response.data.answer.error || 'Unknown error occurred.');
      }
    } catch (error: any) {
      console.error('Client Error:', error.message);
      setAnswer('Error fetching response from server');
    }
  };

  return (
    <Body>
      <PageTitle label={'xAi Grok 2 API 사용하기'} />
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask Grok something..."
          className="w-full p-2 border rounded"
        />
        <Button type="submit" variant="contained" color='primary' className="px-4 py-2 mt-2 bg-green-500 rounded">
          Submit Query
        </Button>
      </form>
      {answer && <p>{answer}</p>}
    </Body>
  );
};

export default TranslateXAI;
