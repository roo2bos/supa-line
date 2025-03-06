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
        // docExpansion="full" // 기본적으로 모든 섹션을 접은 상태로 표시
        deepLinking={true} // ✅ URL 해시로 이동 가능
        // showExtensions={true} // ✅ 확장 필드 표시
        // showCommonExtensions={true} // ✅ 공통 확장 필드 표시
        // tryItOutEnabled={true} // ✅ "Try it out" 기본 활성화
        defaultModelsExpandDepth={-1} // ✅ 스키마 항상 펼치기
        // defaultModelRendering="example"
        // responseInterceptor={(response) => {
        //   if (response && response.body) {
        //     response.body = JSON.stringify(response.body, null, 2); // 예쁘게 포맷
        //   }
        //   return response;
        // }}

        // responseInterceptor={(response) => {
        //   if (response && response.body) {
        //     response.body = JSON.stringify(response.body, null, 2); // 예쁘게 포맷
        //   }
        //   return response;
        // }}
        // onComplete={() => {
        //   // Swagger UI의 컴포넌트가 완전히 렌더링된 후에 응답 스타일링 적용
        //   const preElements = document.querySelectorAll('pre');
        //   preElements.forEach((pre) => {
        //     pre.classList.add("bg-gray-200", "p-4", "rounded-lg", "text-sm", "overflow-auto");
        //   });
        // }}
      />
    </>
  );
}
