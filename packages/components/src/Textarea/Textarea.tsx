import type React from 'react';
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaVariant = 'outlined' | 'filled' | 'standard';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The size of the textarea
   * @default 'md'
   */
  size?: TextareaSize;

  /**
   * The variant of the textarea
   * @default 'outlined'
   */
  variant?: TextareaVariant;

  /**
   * If true, the textarea will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the textarea will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * If true, the textarea will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If true, the textarea will automatically adjust its height based on content
   * @default false
   */
  autoResize?: boolean;

  /**
   * Minimum number of rows to display
   * @default 3
   */
  minRows?: number;

  /**
   * Maximum number of rows before scrolling
   * @default undefined
   */
  maxRows?: number;

  /**
   * Ref forwarded to the textarea element
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}

const getSizeStyles = (theme: Theme, size: TextareaSize) => {
  const sizeMap = {
    sm: css`
      padding: 8px 12px;
      font-size: ${theme.typography.fontSizes.xs};
    `,
    md: css`
      padding: 10px 14px;
      font-size: ${theme.typography.fontSizes.sm};
    `,
    lg: css`
      padding: 12px 16px;
      font-size: ${theme.typography.fontSizes.base};
    `,
  };

  return sizeMap[size];
};

const getVariantStyles = (
  theme: Theme,
  variant: TextareaVariant,
  error: boolean,
) => {
  const borderColor = error
    ? theme.colors.error.main
    : theme.colors.primary.light;
  const focusBorderColor = error
    ? theme.colors.error.main
    : theme.colors.primary.main;

  const variantMap = {
    outlined: css`
      border: 1px solid ${borderColor};
      background-color: transparent;

      &:focus {
        border-color: ${focusBorderColor};
        box-shadow: 0 0 0 2px
          ${error ? theme.colors.error.light : theme.colors.primary.light}20;
      }
    `,
    filled: css`
      border: 1px solid transparent;
      border-bottom: 1px solid ${borderColor};
      background-color: rgba(0, 0, 0, 0.05);

      &:focus {
        background-color: rgba(0, 0, 0, 0.02);
        border-bottom-color: ${focusBorderColor};
      }
    `,
    standard: css`
      border: none;
      border-bottom: 1px solid ${borderColor};
      background-color: transparent;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;

      &:focus {
        border-bottom: 2px solid ${focusBorderColor};
        margin-bottom: -1px;
      }
    `,
  };

  return variantMap[variant];
};

const StyledTextarea = styled.textarea<{
  $size: TextareaSize;
  $variant: TextareaVariant;
  $error: boolean;
  $fullWidth: boolean;
  $minRows: number;
  theme: Theme;
}>`
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  min-height: ${(props) => props.$minRows * 1.5}em;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  transition: all 0.2s ease-in-out;
  outline: none;
  resize: vertical;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ theme, $size }) => getSizeStyles(theme, $size)}
  ${({ theme, $variant, $error }) => getVariantStyles(theme, $variant, $error)}
`;

/**
 * Textarea Component
 *
 * A versatile textarea component for collecting multi-line user input.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message" />
 * <Textarea variant="filled" error={true} />
 * <Textarea minRows={5} maxRows={10} />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      variant = 'outlined',
      disabled = false,
      error = false,
      fullWidth = false,
      minRows = 3,
      maxRows,
      autoResize = false,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && e.target) {
        e.target.style.height = 'auto';
        let newHeight = e.target.scrollHeight;

        if (maxRows) {
          const lineHeight = Number.parseFloat(
            getComputedStyle(e.target).lineHeight,
          );
          const maxHeight = maxRows * lineHeight;
          newHeight = Math.min(newHeight, maxHeight);
        }

        e.target.style.height = `${newHeight}px`;
      }

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <StyledTextarea
        ref={ref}
        $size={size}
        $variant={variant}
        $error={error}
        $fullWidth={fullWidth}
        $minRows={minRows}
        disabled={disabled}
        onChange={autoResize ? handleChange : onChange}
        theme={theme}
        className={className}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
