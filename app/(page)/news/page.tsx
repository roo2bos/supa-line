'use client';

import { useState, useEffect } from 'react';

export default function NewsPage() {
  const [articles, setArticles] = useState<{ title: string }[]>([]);

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/scrape');
      const data = await res.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Scraped News Articles</h1>
      <ul className="pl-5 list-disc">
        {articles.map((article, index) => (
          <li key={index} className="mb-2">
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
