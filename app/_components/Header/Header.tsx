'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { BsList } from 'react-icons/bs';

import { CONST } from '@/_lib/constants';
import { useLnb } from '@/stores/useLnb';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SearchBar from '../SearchBar/SearchBar';

import LogButton from './_components/LogButton';

export default function Header() {
  const { isLnbOpen, onClick } = useLnb();
  return (
    <>
      <header className="sticky top-0 border-b border-gray-300 z-header bg-white/80 backdrop-blur-sm">
        <div className="container py-xs">
          <div className="flex items-center justify-between gap-sm">
            <Button
              // icon={isLnbOpen ? <CgClose /> : <BsList />}
              icon={<BsList />}
              onClick={() => onClick(!isLnbOpen)}
              className="z-20 flex-none"
            />
            <h1
              data-text={CONST.TITLE.SITE_TITLE}
              className={classNames(
                'relative tablet:hidden flex flex-1 items-center gap-5 text-xl font-bold font-oleoScript text-primary z-20',
                // 'bg-clip-text [-webkit-text-fill-color:transparent]',
                // 'bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]',
                // 'bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#4a00ff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                // 'before:rabsolute before:inset-0 before:block before:bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#4a00ff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
              )}
            >
              <Icon
                name="logoSupa"
                className="text-white rounded-full bg-primary"
              />

              <Link
                href={`/`}
                className={classNames(
                  'relative flex items-center gap-5 text-xl font-bold font-oleoScript text-primary drop-shadow-lg',
                  'mobile-only:hidden',
                  'bg-clip-text [-webkit-text-fill-color:transparent]',
                  // 'bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]',
                  'bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#956aff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                  // 'before:rabsolute before:inset-0 before:block before:bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#4a00ff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                )}
              >
                <span
                  data-text={CONST.TITLE.SITE_TITLE}
                  className={classNames(
                    '[-webkit-text-fill-color:transparent]',
                    'before:content-[attr(data-text)] blur-sm bg-clip-text',
                    'absolute inset-0 block bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#804dff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                  )}
                />
                {CONST.TITLE.SITE_TITLE}
              </Link>
            </h1>
            <div className="flex items-end justify-end gap-sm">
              <SearchBar type="header" className="z-20" />
              <div className="relative flex items-center gap-10 z-1">
                <LogButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
