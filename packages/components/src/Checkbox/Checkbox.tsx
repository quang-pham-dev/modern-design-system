import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * If true, the checkbox will be checked
   */
  checked?: boolean;

  /**
   * If true, the checkbox will be in an indeterminate state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * If true, the checkbox will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the checkbox will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * The label for the checkbox
   */
  label?: React.ReactNode;

  /**
   * Ref forwarded to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}

const getSizeStyles = (size: CheckboxSize) => {
  const sizeMap = {
    sm: {
      checkboxSize: 16,
      fontSize: 14,
    },
    md: {
      checkboxSize: 20,
      fontSize: 16,
    },
    lg: {
      checkboxSize: 24,
      fontSize: 18,
    },
  };

  return sizeMap[size];
};

const CheckboxContainer = styled.label<{
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

const CheckboxControl = styled.div<{
  $size: CheckboxSize;
  $checked: boolean;
  $indeterminate: boolean;
  $disabled: boolean;
  $error: boolean;
  theme: Theme;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => getSizeStyles(props.$size).checkboxSize}px;
  height: ${(props) => getSizeStyles(props.$size).checkboxSize}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  border: 2px solid
    ${(props) =>
      props.$error
        ? props.theme.colors.error.main
        : props.$checked || props.$indeterminate
          ? props.theme.colors.primary.main
          : props.theme.colors.primary.light};
  background-color: ${(props) =>
    props.$checked || props.$indeterminate
      ? props.$disabled
        ? props.theme.colors.primary.light
        : props.theme.colors.primary.main
      : 'transparent'};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${(props) =>
      !props.$disabled &&
      (props.$error
        ? props.theme.colors.error.dark
        : props.theme.colors.primary.main)};
  }
`;

const CheckIcon = styled.svg<{
  $size: CheckboxSize;
}>`
  color: white;
  width: ${(props) => getSizeStyles(props.$size).checkboxSize * 0.6}px;
  height: ${(props) => getSizeStyles(props.$size).checkboxSize * 0.6}px;
`;

const IndeterminateIcon = styled.div<{
  $size: CheckboxSize;
}>`
  width: ${(props) => getSizeStyles(props.$size).checkboxSize * 0.6}px;
  height: ${(props) => getSizeStyles(props.$size).checkboxSize * 0.2}px;
  background-color: white;
  border-radius: 1px;
`;

const LabelText = styled.span<{
  $size: CheckboxSize;
  $disabled: boolean;
  theme: Theme;
}>`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${(props) => getSizeStyles(props.$size).fontSize}px;
  color: ${(props) =>
    props.$disabled
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.primary};
`;

/**
 * Checkbox Component
 *
 * A checkbox component for selecting options.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox checked={isChecked} onChange={handleChange} />
 * ```
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      checked = false,
      indeterminate = false,
      disabled = false,
      error = false,
      label,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Handle the indeterminate property which isn't a standard HTML attribute
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    // Merge refs
    const handleRef = (element: HTMLInputElement | null) => {
      inputRef.current = element;

      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <CheckboxContainer $disabled={disabled} className={className}>
        <HiddenInput
          type="checkbox"
          ref={handleRef}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        <CheckboxControl
          $size={size}
          $checked={checked}
          $indeterminate={indeterminate}
          $disabled={disabled}
          $error={error}
          theme={theme}
        >
          {indeterminate ? (
            <IndeterminateIcon $size={size} />
          ) : checked ? (
            <CheckIcon
              $size={size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                fill="currentColor"
              />
            </CheckIcon>
          ) : null}
        </CheckboxControl>
        {label && (
          <LabelText $size={size} $disabled={disabled} theme={theme}>
            {label}
          </LabelText>
        )}
      </CheckboxContainer>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
