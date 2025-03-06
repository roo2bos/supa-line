import type { CSSProperties } from 'react';
import classNames from 'classnames';

import LogoSupa from './icons/logo.svg';

interface IconProps {
  name: keyof typeof iconTypes;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: CSSProperties;
}

export const iconTypes = {
  logoSupa: LogoSupa,
};
export default function Icon({
  name,
  width=24,
  height=24,
  className,
  ...props
}: IconProps) {
  const IconComponent = iconTypes[name];
  return (
    <span
      className={classNames('inline-flex align-middle', className)}
      {...props}
    >
      <IconComponent
        width={width}
        height={height}
        className="h-auto max-w-full"
      />
    </span>
  );
}
