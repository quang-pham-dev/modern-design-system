import type React from 'react';
import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputVariant = 'outlined' | 'filled' | 'standard';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The size of the input
   * @default 'md'
   */
  inputSize?: InputSize;

  /**
   * The variant of the input
   * @default 'outlined'
   */
  variant?: InputVariant;

  /**
   * If true, the input will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the input will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * If true, the input will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Element to be rendered before the input
   */
  startAdornment?: React.ReactNode;

  /**
   * Element to be rendered after the input
   */
  endAdornment?: React.ReactNode;

  /**
   * Ref forwarded to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}

const getSizeStyles = (theme: Theme, size: InputSize) => {
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
  variant: InputVariant,
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

const InputContainer = styled.div<{
  $fullWidth: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  position: relative;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};
`;

const StyledInput = styled.input<{
  $inputSize: InputSize;
  $variant: InputVariant;
  $error: boolean;
  $hasStartAdornment: boolean;
  $hasEndAdornment: boolean;
  theme: Theme;
}>`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  transition: all 0.2s ease-in-out;
  outline: none;
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${({ theme, $inputSize }) => getSizeStyles(theme, $inputSize)}
  ${({ theme, $variant, $error }) => getVariantStyles(theme, $variant, $error)}
  
  ${({ $hasStartAdornment }) => $hasStartAdornment && 'padding-left: 36px;'}
  ${({ $hasEndAdornment }) => $hasEndAdornment && 'padding-right: 36px;'}
`;

const Adornment = styled.div<{
  $position: 'start' | 'end';
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => ($position === 'start' ? 'left: 12px;' : 'right: 12px;')}
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

/**
 * Input Component
 *
 * A versatile input component for collecting user input.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your name" />
 * <Input variant="filled" error={true} />
 * <Input startAdornment={<SearchIcon />} />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = 'md',
      variant = 'outlined',
      disabled = false,
      error = false,
      fullWidth = false,
      startAdornment,
      endAdornment,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <InputContainer
        $fullWidth={fullWidth}
        $disabled={disabled}
        className={className}
      >
        {startAdornment && (
          <Adornment $position="start">{startAdornment}</Adornment>
        )}
        <StyledInput
          ref={ref}
          $inputSize={inputSize}
          $variant={variant}
          $error={error}
          $hasStartAdornment={!!startAdornment}
          $hasEndAdornment={!!endAdornment}
          disabled={disabled}
          theme={theme}
          {...props}
        />
        {endAdornment && <Adornment $position="end">{endAdornment}</Adornment>}
      </InputContainer>
    );
  },
);

Input.displayName = 'Input';

export default Input;
