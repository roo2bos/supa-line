'use client';

import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { UrlObject } from 'url';
// import Icon, { iconTypes } from '@/_components/Icon/Icon';

export interface ButtonProps {
  /**
   * @default 'button'
   */
  type?: 'button' | 'submit';
  /**
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text';
  /**
   * @default 'center'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * @default 'primary'
   */
  color?: 'primary' | 'dark' | 'light' | 'white' | 'none';
  /**
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /**
   * @default false
   */
  full?: boolean;
  /**
   * @default 'sm'
   */
  rounded?: 'sm' | 'none' | 'full';
  /**
   * @default false
   */
  disabled?: boolean;
  // icon?: {
  //   name: keyof typeof iconTypes;
  //   position?: 'left' | 'right';
  //   size?: number | string;
  // };

  icon?: React.ReactElement<JSX.IntrinsicElements['svg']>;
  href?: UrlObject | string;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
  children?: React.ReactNode;
}

const variants = {
  contained: 'btn',
  outlined: 'btn-outlined',
  text: `btn-text`,
};

const sizes = {
  xs: 'px-12 h-22 text-xs',
  sm: 'px-16 h-32 text-sm',
  md: 'px-16 h-38 text-sm',
  lg: 'px-16 h-42 tablet:w-392',
  xl: 'px-32 h-58 tablet:w-392',
  '2xl': 'w-280 h-52 text-lg',
  '3xl': 'max-w-320 h-60 text-lg desktop:max-w-338',
};

const colors = {
  primary: {
    contained:
      'bg-primary border-primary text-white hover:bg-primary/80 hover:border-primary/80 active:bg-primary/80 active:border-primary/80',
    outlined:
      'border-primary text-primary hover:border-primary/50 active:border-primary/50',
    text: 'text-primary',
  },
  dark: {
    contained:
      'bg-dark border-dark text-white hover:bg-dark/90 hover:border-dark/90 active:bg-dark/90 active:border-dark/90',
    outlined: 'border-gray-800 hover:border-gray-600 active:border-gray-600',
    text: 'text-dark',
  },
  light: {
    contained:
      'bg-gray-200 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-100 active:bg-gray-100 active:border-gray-100',
    outlined: 'border-gray-400 hover:border-gray-600 active:border-gray-600',
    text: 'text-gray-600',
  },
  white: {
    contained:
      'bg-white border-white text-gray-800 hover:bg-white/90 active:bg-white/90',
    outlined:
      'border-white text-white bg-transparent hover:border-white/80 active:border-white/80',
    text: 'text-white',
  },
};

const aligns = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const roundeds = {
  sm: 'rounded-sm',
  none: '',
  full: 'rounded-full',
};

function Button({
  type = 'button',
  variant = 'text',
  align = 'center',
  color = 'dark',
  size = 'md',
  disabled = false,
  full = false,
  rounded = 'sm',
  icon,
  href,
  target,
  className,
  children,
  onClick,
}: Readonly<ButtonProps>) {
  const variantClasses = variants[variant];
  const alignClasses = aligns[align];
  const sizeClasses = variant !== 'text' && sizes[size];
  const colorClasses = !disabled && color !== 'none' && colors[color][variant];
  const roundedClasses = roundeds[rounded];
  // const iconSize = icon?.size
  //   ? icon.size
  //   : size === 'sm' || size === 'xs'
  //     ? 16
  //     : 20;

  const iconClassName = classNames('w-full h-full', icon?.props.className);
  // const widthClass = size && !full && `w-${size}`; // 예: `w-24`
  const widthClass = icon && `w-${size}`; // 예: `w-24`

  const commonClasses = classNames(
    variantClasses,
    alignClasses,
    sizeClasses,
    colorClasses,
    roundedClasses,
    {
      'w-full': full,
      'text-gray-500 cursor-default pointer-events-none': disabled,
      'bg-gray-300 border-gray-300': disabled && variant !== 'text',
    },
    className,
  );

  // const iconElement = icon && (
  //   <Icon
  //     name={icon.name}
  //     width={iconSize}
  //     height={iconSize}
  //     className={classNames({
  //       'mr-8': icon.position !== 'right',
  //       'order-last ml-8': icon.position === 'right',
  //     })}
  //   />
  // );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={commonClasses}
        onClick={onClick}
      >
        {icon && React.isValidElement(icon)
          ? React.cloneElement(icon, { className: iconClassName })
          : children}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        disabled={disabled}
        className={classNames(commonClasses, widthClass)}
        onClick={onClick}
      >
        {icon && React.isValidElement(icon)
          ? React.cloneElement(icon, { className: iconClassName })
          : children}
      </button>
    );
  }
}

export default Button;
