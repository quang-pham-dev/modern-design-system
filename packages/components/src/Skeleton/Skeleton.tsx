import type React from 'react';
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor, getBorderRadius } from '@modern-design-system/utils';
import type { Theme } from '@modern-design-system/theme';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';
export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the skeleton
   * @default 'text'
   */
  variant?: SkeletonVariant;
  /**
   * The animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation;
  /**
   * The width of the skeleton
   */
  width?: number | string;
  /**
   * The height of the skeleton
   */
  height?: number | string;
}

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

// Animation style helpers
const getAnimationStyles = (animation: SkeletonAnimation) => {
  switch (animation) {
    case 'pulse':
      return css`
        animation: ${pulseAnimation} 1.5s ease-in-out 0.5s infinite;
      `;
    case 'wave':
      return css`
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: ${waveAnimation} 1.6s linear 0.5s infinite;
        }
      `;
    case 'none':
      return css``;
    default:
      return css``;
  }
};

const getWidthValue = (width?: number | string): string => {
  if (width === undefined) {
    return '100%';
  }
  return typeof width === 'number' ? `${width}px` : width;
};

const SkeletonRoot = styled.div<{
  variant: SkeletonVariant;
  animation: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  theme: Theme;
}>`
  display: block;
  background-color: ${({ theme }) =>
    getColor(theme, ['grey', '200'], '#e0e0e0')};
  position: relative;
  overflow: hidden;

  width: ${({ width }) => getWidthValue(width)};
  height: ${({ height, variant }) => {
    if (height !== undefined) {
      return typeof height === 'number' ? `${height}px` : height;
    }
    return variant === 'text' ? '1em' : '100%';
  }};

  border-radius: ${({ variant, theme }) => {
    switch (variant) {
      case 'text':
        return getBorderRadius(theme, 'sm', 4);
      case 'rectangular':
        return '0px';
      case 'rounded':
        return getBorderRadius(theme, 'md', 8);
      case 'circular':
        return '50%';
      default:
        return getBorderRadius(theme, 'sm', 4);
    }
  }};

  ${({ animation }) => getAnimationStyles(animation)}
`;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', animation = 'pulse', width, height, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <SkeletonRoot
        ref={ref}
        variant={variant}
        animation={animation}
        width={width}
        height={height}
        theme={theme}
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
