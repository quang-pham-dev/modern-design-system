import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export type CircularProgressVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';
export type CircularProgressSize = 'sm' | 'md' | 'lg';

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value of the progress indicator (0-100)
   * @default 0
   */
  value?: number;
  /**
   * The variant of the progress indicator
   * @default 'primary'
   */
  variant?: CircularProgressVariant;
  /**
   * If true, the progress indicator will be indeterminate
   * @default false
   */
  indeterminate?: boolean;
  /**
   * The size of the progress indicator
   * @default 'md'
   */
  size?: CircularProgressSize;
  /**
   * The thickness of the progress circle in pixels
   * @default 3.6
   */
  thickness?: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -125;
  }
`;

export const getSizeValue = (size: CircularProgressSize): number => {
  switch (size) {
    case 'sm':
      return 24;
    case 'md':
      return 40;
    case 'lg':
      return 56;
    default:
      return 40;
  }
};

const CircularProgressRoot = styled.div<{
  size: number;
  indeterminate: boolean;
}>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  ${({ indeterminate }) =>
    indeterminate &&
    `
    animation: ${rotateAnimation} 1.4s linear infinite;
  `}
`;

const CircularProgressSvg = styled.svg`
  display: block;
`;

const CircularProgressCircle = styled.circle<{
  variant: CircularProgressVariant;
  indeterminate: boolean;
  theme: Theme;
}>`
  stroke: ${({ variant, theme }) =>
    getColor(theme, [variant, 'main'], '#1976d2')};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;

  ${({ indeterminate }) =>
    indeterminate &&
    `
    animation: ${dashAnimation} 1.4s ease-in-out infinite;
  `}
`;

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      value = 0,
      variant = 'primary',
      indeterminate = false,
      size = 'md',
      thickness = 3.6,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const sizeValue = getSizeValue(size);
    const clampedValue = Math.min(100, Math.max(0, value));

    // SVG parameters
    const radius = (sizeValue - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = ((100 - clampedValue) / 100) * circumference;

    return (
      <CircularProgressRoot
        ref={ref}
        size={sizeValue}
        indeterminate={indeterminate}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <CircularProgressSvg
          viewBox={`0 0 ${sizeValue} ${sizeValue}`}
          width={sizeValue}
          height={sizeValue}
        >
          <CircularProgressCircle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            strokeWidth={thickness}
            variant={variant}
            indeterminate={indeterminate}
            theme={theme}
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
          />
        </CircularProgressSvg>
      </CircularProgressRoot>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';
