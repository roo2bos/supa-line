'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import classNames from 'classnames';

import { /* Footer, */ Header, PopPlayer } from '@/_components';
import { AuthProvider } from '@/_components/AuthContext/AuthContext';
import Dimmed from '@/_components/Dimmed/Dimmed';
import Lnb from '@/_components/Lnb/Lnb';
import { useLnb } from '@/stores/useLnb';

const queryClient = new QueryClient();

export default function GlobalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLnbOpen, onClick } = useLnb();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex h-screen overflow-hidden">
          <Dimmed
            isShow={isLnbOpen}
            className={classNames(
              'mobile-only:duration-300 tablet:static tablet:-translate-x-full',
              'mobile-only:opacity-0 mobile-only:pointer-events-none',
              {
                'tablet:translate-x-0 inset-0 mobile-only:opacity-100 mobile-only:pointer-events-auto bg-black/20':
                  isLnbOpen,
              },
            )}
            onClick={() => onClick(false)}
          />

          {/* <div
            className={classNames(
              'mobile-only:duration-300 fixed left-0 z-10 inset-y-0 right-0 border-r border-gray-300 tablet:static tablet:-translate-x-full',
              'mobile-only:opacity-0 mobile-only:pointer-events-none',
              {
                'tablet:translate-x-0 inset-0 mobile-only:opacity-100 mobile-only:pointer-events-auto bg-black/20':
                  isLnbOpen,
              },
            )}
            onClick={() => onClick(false)}
          /> */}
          <Lnb />
          <div
            className={classNames(
              'flex flex-col flex-1 overflow-x-hidden body-scrollbar',
              {
                // 'overflow-y-hidden': isLnbOpen,
              },
            )}
          >
            <Header />
            {children}
            <PopPlayer />
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
