import { ReactNode } from 'react';
import classNames from 'classnames';

// import useFonts from '@/hooks/useFont';
// import { Courgette } from 'next/font/google';

// const courgette = Courgette({
//   weight: ['400'],
//   subsets: ['latin'],
// });

// const fonts = {
//   default: '',
//   courgette: courgette.className,
// };

interface TitleProps {
  label: ReactNode | string;
  level?: number;
  font?: string;
  // font?: 'oleoScript' | 'default';
  color?: 'primary' | boolean;
  className?: string;
}

export default function PageTitle({
  label,
  // font = 'default',
  font,
  level = 1,
  color,
  className,
}: TitleProps) {
  // const { courgette } = useFonts();
  // const fonts = {
  //   default: '',
  //   courgette: courgette,
  // };
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; // 현재 깊이로 태그 설정
  const sizeClass =
    level === 6
      ? 'text-sm'
      : level === 5
        ? 'text-md'
        : level === 4
          ? 'text-lg'
          : level === 3
            ? 'text-xl'
            : level === 2
              ? 'text-2xl tablet:text-3xl'
              : 'text-3xl tablet:text-4xl font-oleoScript'; // level === 1

  return (
    <Tag
      className={classNames(
        'font-bold',
        `font-${font}`,
        // fonts[font],
        sizeClass,
        (color === true || color === 'primary') && 'text-primary',
        className,
      )}
    >
      {label}
    </Tag>
  );
}
