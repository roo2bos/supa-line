import { PropsWithChildren } from 'react';
import classNames from 'classnames';

interface BodyProps {
  /**
   * @default 'pt-40 desktop:pt-60'
   */
  paddingTop?: string;
  /**
   * @default 'pb-64 desktop:pb-100'
   */
  paddingBottom?: string;
  /**
   * @default 'white'
   */
  backgroundColor?: 'white' | 'dark' | 'slate';
  /**
   * @default 'none'
   */
  container?: 'default' | 'sm' | 'full' | 'none';
  className?: string;
}

const backgroundColors = {
  white: 'bg-white',
  dark: 'bg-dark',
  slate: 'bg-slate-100',
};

const containers = {
  default: 'container mx-auto',
  sm: 'container-sm',
  full: 'container-full',
  none: '',
};

function Body({
  paddingTop = 'pt-40 desktop:pt-60',
  paddingBottom = 'pb-64 desktop:pb-100',
  backgroundColor = 'slate',
  container = 'default',
  className,
  children,
}: PropsWithChildren<BodyProps>) {
  const backgroundColorClass = backgroundColors[backgroundColor];
  const containerClass = containers[container];

  return (
    <main
      className={classNames(
        'relative flex-1',
        // 'after:block after:absolute after:-z-10 after:inset-x-0 after:-bottom-56 after:h-100 after:bg-inherit after:content-[""] after:pointer-events-none tablet:after:-bottom-64 desktop:after:-bottom-100',
        paddingTop,
        paddingBottom,
        backgroundColorClass,
        container !== 'none' && containerClass,
        className,
      )}
    >
      <>{children}</>
      {/* {container !== "none" ? (
        <div className={classNames(containerClass)}>{children}</div>
      ) : (
        <>{children}</>
      )} */}
    </main>
  );
}

export default Body;
