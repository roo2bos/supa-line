'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Icon } from '@/_components';

import 'swagger-ui-react/swagger-ui.css'; // ✅ CSS 추가

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch('/api/docs')
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) return <p className="text-center">Loading Swagger...</p>;

  return (
    <>
      <Link href="/" target="_blank" className="absolute -top-2 left-20">
        <Icon name="logoSupa" />
      </Link>
      <SwaggerUI
        spec={spec}
        deepLinking={true} // ✅ URL 해시로 이동 가능
        defaultModelsExpandDepth={-1} // ✅ 스키마 항상 펼치기
      />
    </>
  );
}
