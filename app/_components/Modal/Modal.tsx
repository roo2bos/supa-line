import React from 'react';
import classNames from 'classnames';

import Dimmed from '../Dimmed/Dimmed';

function Modal({
  onClick,
  children,
  title,
  isShow = false,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
  isShow: boolean;
  className?: string;
}) {
  return (
    isShow && (
      <div
        className={classNames(
          'flex items-center justify-center modal',
          className,
        )}
      >
        {title && (
          <h3 className="text-lg font-bold desktop:text-xl">{title}</h3>
        )}
        <Dimmed isShow={true} onClick={onClick} />
        <div className="relative z-10 w-full bg-white rounded-lg shadow-lg max-w-375 tablet:max-w-500 p-sm">
          {children}
        </div>
      </div>
    )
  );
}

export default Modal;
