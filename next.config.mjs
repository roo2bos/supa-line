/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Exporsed to the client
    APP_ENV: process.env.APP_ENV,
  },
  images: {
    // domains: ['i.ytimg.com','ykxqljvkwzrpzeuqsupf.supabase.co'], // ✅ 여기에 Supabase 도메인 추가
    unoptimized: true,
  },
  webpack(config) {
    // SVG 파일을 @svgr/webpack으로 처리하도록 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // 필요한 경우 추가 옵션을 설정할 수 있습니다.
          },
        },
      ],
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/intro', // 루트로 접속시 첫 페이지를 intro로 설정
      },
      {
        source: '/api/:slug*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:slug*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/music',
        destination: '/music/top',
        permanent: true,
      },
      // {
      //   source: '/(Contents|CeoArticle|BookLearning|CeoForum|Main)(.*)',
      //   destination: '/',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
