'use client';

import Image from 'next/image';

type TeamLogoProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export default function TeamLogo({
  src,
  alt,
  size = 28,
  className,
}: TeamLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      // sombra para logos blancos
      style={{ filter: 'drop-shadow(0 0 0.5px rgba(0, 0, 0, 1))' }}
    />
  );
}
