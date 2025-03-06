/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'], // 스토리 파일 경로
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs', // Next.js용 프레임워크
    options: {},
  },
  docs: {
    autodocs: true, // 자동 문서 생성
  },
};

module.exports = config;