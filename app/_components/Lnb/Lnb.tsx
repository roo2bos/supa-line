import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineStock } from 'react-icons/ai';
import { BiMessageX } from 'react-icons/bi';
import { BiChat } from 'react-icons/bi';
import { BsMusicNote } from 'react-icons/bs';
import { GiPolarStar } from 'react-icons/gi';
import { HiOutlineStar } from 'react-icons/hi';
import { IoIosListBox } from 'react-icons/io';
import { MdOutlineGTranslate } from 'react-icons/md';
// import { MdLibraryMusic } from 'react-icons/md';

import { CONST } from '@/_lib/constants';
import { useLnb } from '@/stores/useLnb';

import Footer from '../Footer/Footer';
import Icon from '../Icon/Icon';

const Lnb = () => {
  const { isLnbOpen, onClick } = useLnb();
  const nav = [
    {
      tit: '게시판',
      href: '/posts',
      icon: <IoIosListBox className="w-24 h-24" />,
    },
    {
      tit: '주식',
      href: '/stock',
      icon: <AiOutlineStock className="w-24 h-24" />,
    },
    {
      tit: '음악',
      href: '/music',
      icon: <BsMusicNote className="w-24 h-24" />,
    },
    // {
    //   tit: '음악 TOP 12',
    //   href: '/music/top',
    //   icon: <MdLibraryMusic className="w-24 h-24" />,
    // },
    {
      tit: '영어(gemini-ai)',
      href: '/ggl-ai',
      icon: <GiPolarStar className="w-24 h-24" />,
    },
    {
      tit: '영어(GGL)',
      href: '/translate-ggl',
      icon: <MdOutlineGTranslate className="w-24 h-24" />,
    },
    {
      tit: '영어(GPT)',
      href: '/translate-gpt',
      icon: <BiChat className="w-24 h-24" />,
    },
    {
      tit: '영어(grok2-xAi)',
      href: '/translate-xai',
      icon: <BiMessageX className="w-24 h-24" />,
    },
    {
      tit: 'Favorite Link',
      href: '/favoritelink',
      icon: <HiOutlineStar className="w-24 h-24" />,
    },
  ];
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <>
      <aside
        className={classNames(
          'fixed left-0 z-[900] flex flex-col gap-xs h-screen -translate-x-full bg-white border-r border-gray-300 tablet:static tablet:translate-x-0 w-290 mobile-only:duration-300',
          { 'translate-x-0 tablet:w-60': isLnbOpen },
        )}
      >
        <div
          className={classNames(
            'flex items-center justify-center p-sm tablet:justify-start',
          )}
        >
          <h1
            data-text={CONST.TITLE.SITE_TITLE}
            className={classNames(
              'relative flex items-center gap-5 text-xl font-bold px-sm font-oleoScript text-primary',
              { 'tablet:p-0 mobile-only:opacity-0': isLnbOpen },
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
                'bg-clip-text [-webkit-text-fill-color:transparent]',
                // 'bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]',
                'bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#956aff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                // 'before:rabsolute before:inset-0 before:block before:bg-[linear-gradient(90deg,#ff00d3_4%,color-mix(in_oklch,#ff00d3,#ff5861)_22%,#4a00ff_45%,color-mix(in_oklch,#4a00ff,#00d7c0)_67%,#00d7c0_100.2%)]',
                { 'tablet:hidden': isLnbOpen },
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
        </div>
        <div
          className={classNames(
            'px-sm flex-1 overflow-x-hidden overflow-y-auto body-scrollbar',
            { 'tablet:px-0': isLnbOpen },
          )}
        >
          <nav className="flex flex-col items-center gap-5 uppercase tablet:px-4">
            {nav.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    'flex items-center w-full gap-4 rounded-md p-sm hover:bg-blue-light',
                    { 'bg-blue-light': pathname.includes(item.href) },
                  )}
                  onClick={() => onClick(false)}
                >
                  {item.icon}
                  <span className={classNames(isLnbOpen && 'tablet:hidden')}>
                    {item.tit}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Footer isLnbOpen={isLnbOpen} />
      </aside>
    </>
  );
};

export default Lnb;
