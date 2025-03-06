'use client';
import classNames from 'classnames';

function Dimmed({
  isShow,
  className,
  onClick,
  transparent = false,
}: {
  isShow: boolean;
  transparent?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={classNames(
        'fixed left-0 top-0 z-10 inset-y-0 right-0 opacity-0',
        'pointer-events-none',
        {
          'opacity-100 pointer-events-auto bg-black/20': isShow,
        },

        // {'!bg-transparent w-screen h-screen hidden' : isShow && transparent },
        transparent && '!bg-transparent w-screen h-screen',
        isShow && transparent ? 'block' : 'hidden',
        className,
      )}
      onClick={onClick}
    />
  );
}

export default Dimmed;
