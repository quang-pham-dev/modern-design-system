import type React from 'react';
import { forwardRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import {
  getSpacing,
  getColor,
  getBorderRadius,
  getThemeValue,
} from '@modern-design-system/utils';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Box } from '../Box';
import type { Theme } from '@modern-design-system/theme';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the toast
   * @default 'info'
   */
  variant?: ToastVariant;
  /**
   * The title of the toast
   */
  title?: string;
  /**
   * If true, the toast will show a close button
   * @default true
   */
  closable?: boolean;
  /**
   * Callback fired when the close button is clicked
   */
  onClose?: () => void;
  /**
   * The content of the toast
   */
  children: React.ReactNode;
  /**
   * The duration in milliseconds the toast should be displayed
   * @default 5000
   */
  duration?: number;
  /**
   * If true, the toast will be visible
   * @default true
   */
  isOpen?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const ToastRoot = styled.div<{
  variant: ToastVariant;
  isOpen: boolean;
  theme: Theme;
}>`
  display: flex;
  padding: ${({ theme }) => getSpacing(theme, 'md', 16)};
  border-radius: ${({ theme }) => getBorderRadius(theme, 'md', 8)};
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: ${({ theme }) => getSpacing(theme, 'md', 16)};
  position: relative;
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.3s ease-in-out
    forwards;

  ${({ variant, theme }) => {
    const variantStyles = {
      info: css`
        background-color: ${getColor(theme, ['info', 'light'], '#e3f2fd')};
        border-left: 4px solid ${getColor(theme, ['info', 'main'], '#2196f3')};
        color: ${getColor(theme, ['info', 'dark'], '#0d47a1')};
      `,
      success: css`
        background-color: ${getColor(theme, ['success', 'light'], '#e8f5e9')};
        border-left: 4px solid
          ${getColor(theme, ['success', 'main'], '#4caf50')};
        color: ${getColor(theme, ['success', 'dark'], '#1b5e20')};
      `,
      warning: css`
        background-color: ${getThemeValue(
          theme,
          ['colors', 'warning', 'light'],
          '#fff3e0',
        )};
        border-left: 4px solid
          ${getThemeValue(theme, ['colors', 'warning', 'main'], '#ff9800')};
        color: ${getThemeValue(
          theme,
          ['colors', 'warning', 'dark'],
          '#e65100',
        )};
      `,
      error: css`
        background-color: ${getThemeValue(
          theme,
          ['colors', 'error', 'light'],
          '#ffebee',
        )};
        border-left: 4px solid
          ${getThemeValue(theme, ['colors', 'error', 'main'], '#f44336')};
        color: ${getThemeValue(theme, ['colors', 'error', 'dark'], '#b71c1c')};
      `,
    };

    return variantStyles[variant];
  }}
`;

const ToastContent = styled.div`
  flex: 1;
  margin-left: ${({ theme }) => getSpacing(theme, 'sm', 8)};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => getSpacing(theme, 'xs', 4)};
  right: ${({ theme }) => getSpacing(theme, 'xs', 4)};
  padding: ${({ theme }) => getSpacing(theme, 'xs', 4)};
  color: inherit;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const getToastIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'info':
      return 'info-circle';
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-triangle';
    case 'error':
      return 'exclamation-circle';
    default:
      return 'info-circle';
  }
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      closable = true,
      onClose,
      children,
      duration = 5000,
      isOpen = true,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    useEffect(() => {
      if (isOpen && duration !== Number.POSITIVE_INFINITY && onClose) {
        const timer = setTimeout(() => {
          onClose();
        }, duration);

        return () => {
          clearTimeout(timer);
        };
      }
      return undefined;
    }, [isOpen, duration, onClose]);

    return (
      <ToastRoot
        ref={ref}
        variant={variant}
        isOpen={isOpen}
        theme={theme}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        <Box display="flex" alignItems="flex-start">
          <Icon name={getToastIcon(variant)} size="md" />
        </Box>
        <ToastContent>
          {title && (
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
          )}
          <Typography variant="body2">{children}</Typography>
        </ToastContent>
        {closable && (
          <CloseButton onClick={onClose} aria-label="Close notification">
            <Icon name="times" size="sm" />
          </CloseButton>
        )}
      </ToastRoot>
    );
  },
);

Toast.displayName = 'Toast';

export default Toast;
