import { Metadata } from 'next';

import { SITE_TITLE } from '@/_lib/constants/title.constant';

import ErrorPage from './_components/Error/Error';

// import ErrorPage from "./error/page";

export const metadata: Metadata = {
  title: `${SITE_TITLE} 페이지를 찾을 수 없습니다`,
};

function NotFound() {
  return <ErrorPage message={<>요청하신 페이지를 찾을수 없습니다.</>} />;
}

export default NotFound;
