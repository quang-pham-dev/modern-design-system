import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { keyframes, css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type LinearProgressVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error';

export interface LinearProgressProps
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
  variant?: LinearProgressVariant;
  /**
   * If true, the progress indicator will be indeterminate
   * @default false
   */
  indeterminate?: boolean;
  /**
   * The thickness of the progress bar in pixels
   * @default 4
   */
  thickness?: number;
  /**
   * If true, the progress indicator will have rounded corners
   * @default true
   */
  rounded?: boolean;
  /**
   * If true, the progress indicator will be displayed with a buffer
   * @default false
   */
  buffer?: boolean;
  /**
   * The value of the buffer (0-100)
   * @default 0
   */
  bufferValue?: number;

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const indeterminateAnimation = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminateAnimation2 = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`;

const ProgressContainer = styled.div<{
  thickness: number;
  rounded: boolean;
  theme: Theme;
}>`
  position: relative;
  overflow: hidden;
  height: ${({ thickness }) => thickness}px;
  width: 100%;
  background-color: ${({ theme }) =>
    getColor(theme, ['grey', '200'], '#e0e0e0')};
  border-radius: ${({ rounded, thickness }) => (rounded ? thickness / 2 : 0)}px;
`;

const ProgressBar = styled.div<{
  value: number;
  variant: LinearProgressVariant;
  indeterminate: boolean;
  theme: Theme;
}>`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.4s linear;
  transform-origin: left;
  width: 100%;
  transform: ${({ value, indeterminate }) =>
    indeterminate ? 'none' : `translateX(${value - 100}%)`};
  background-color: ${({ variant, theme }) =>
    getColor(theme, [variant, 'main'], '#1976d2')};

  ${({ indeterminate }) =>
    indeterminate &&
    css`
      animation: ${indeterminateAnimation} 2.1s
        cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `}
`;

const SecondaryBar = styled.div<{
  indeterminate: boolean;
  theme: Theme;
  variant: LinearProgressVariant;
}>`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.4s linear;
  transform-origin: left;
  width: 100%;
  background-color: ${({ variant, theme }) =>
    getColor(theme, [variant, 'main'], '#1976d2')};
  opacity: 0.4;

  ${({ indeterminate }) =>
    indeterminate &&
    css`
      animation: ${indeterminateAnimation2} 2.1s
        cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `}
`;

const BufferBar = styled.div<{
  bufferValue: number;
  theme: Theme;
}>`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.4s linear;
  transform-origin: left;
  width: 100%;
  transform: translateX(${({ bufferValue }) => bufferValue - 100}%);
  background-color: ${({ theme }) =>
    getColor(theme, ['grey', '300'], '#e0e0e0')};
`;

export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  (
    {
      value = 0,
      variant = 'primary',
      indeterminate = false,
      thickness = 4,
      rounded = true,
      buffer = false,
      bufferValue = 0,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const clampedValue = Math.min(100, Math.max(0, value));
    const clampedBufferValue = Math.min(100, Math.max(0, bufferValue));

    return (
      <ProgressContainer
        ref={ref}
        thickness={thickness}
        rounded={rounded}
        theme={theme}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        {...props}
      >
        {buffer && !indeterminate && (
          <BufferBar bufferValue={clampedBufferValue} theme={theme} />
        )}
        <ProgressBar
          value={clampedValue}
          variant={variant}
          indeterminate={indeterminate}
          theme={theme}
        />
        {indeterminate && (
          <SecondaryBar
            indeterminate={indeterminate}
            theme={theme}
            variant={variant}
          />
        )}
      </ProgressContainer>
    );
  },
);

LinearProgress.displayName = 'LinearProgress';
