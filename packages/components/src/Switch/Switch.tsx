import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import { adjustAlpha } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

/**
 * Available switch sizes
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Switch component props interface
 */
export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The size of the switch
   * @default 'md'
   */
  size?: SwitchSize;

  /**
   * If true, the switch will be checked
   */
  checked?: boolean;

  /**
   * If true, the switch will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the switch will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * The label for the switch
   */
  label?: React.ReactNode;

  /**
   * Custom background color when switch is checked
   */
  checkedColor?: string;

  /**
   * Custom background color when switch is unchecked
   */
  uncheckedColor?: string;

  /**
   * Ref forwarded to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}

const getSizeStyles = (size: SwitchSize) => {
  const sizeMap = {
    sm: {
      width: 32,
      height: 16,
      thumbSize: 12,
      fontSize: 14,
    },
    md: {
      width: 44,
      height: 22,
      thumbSize: 16,
      fontSize: 16,
    },
    lg: {
      width: 56,
      height: 28,
      thumbSize: 20,
      fontSize: 18,
    },
  };

  return sizeMap[size];
};

// Helper function to determine track background color
const getTrackBackgroundColor = (props: {
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  $checkedColor?: string;
  $uncheckedColor?: string;
  theme: Theme;
}) => {
  if (props.$disabled) {
    return props.theme.colors.grey[300];
  }

  if (props.$checked) {
    if (props.$error) {
      return props.theme.colors.error.main;
    }
    return props.$checkedColor ?? props.theme.colors.primary.main;
  }

  return props.$uncheckedColor ?? props.theme.colors.grey[300];
};

// Helper function to determine hover background color
const getHoverBackgroundColor = (props: {
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  $checkedColor?: string;
  $uncheckedColor?: string;
  theme: Theme;
}) => {
  if (props.$checked) {
    if (props.$error) {
      return props.theme.colors.error.dark;
    }
    // Darken custom color if provided
    return props.$checkedColor
      ? adjustAlpha(props.$checkedColor, 0.8)
      : props.theme.colors.primary.dark;
  }

  // Darken unchecked color if provided
  return props.$uncheckedColor
    ? adjustAlpha(props.$uncheckedColor, 0.8)
    : props.theme.colors.grey[400];
};

// Helper function to determine thumb background color
const getThumbBackgroundColor = (props: {
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  theme: Theme;
}) => {
  if (props.$disabled) {
    return props.theme.colors.grey[100];
  }

  if (props.$error && props.$checked) {
    return adjustAlpha(props.theme.colors.error.light, 0.9);
  }

  return props.theme.colors.common.white;
};

const SwitchContainer = styled.label<{
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

const SwitchTrack = styled.div<{
  $size: SwitchSize;
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  $checkedColor?: string;
  $uncheckedColor?: string;
  theme: Theme;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${(props) => getSizeStyles(props.$size).width}px;
  height: ${(props) => getSizeStyles(props.$size).height}px;
  padding: 2px;
  border-radius: ${(props) => getSizeStyles(props.$size).height}px;
  background-color: ${getTrackBackgroundColor};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      !props.$disabled ? getHoverBackgroundColor(props) : undefined};
  }
`;

const SwitchThumb = styled.div<{
  $size: SwitchSize;
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  theme: Theme;
}>`
  position: absolute;
  width: ${(props) => getSizeStyles(props.$size).thumbSize}px;
  height: ${(props) => getSizeStyles(props.$size).thumbSize}px;
  background-color: ${getThumbBackgroundColor};
  border-radius: 50%;
  transition:
    transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  transform: translateX(
    ${(props) =>
      props.$checked
        ? `${getSizeStyles(props.$size).width - getSizeStyles(props.$size).thumbSize - 4}px`
        : '2px'}
  );
  box-shadow: ${(props) =>
    props.$disabled ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.2)'};
`;

const LabelText = styled.span<{
  $size: SwitchSize;
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
 * Switch Component
 *
 * A toggle switch component for binary choices.
 *
 * @example
 * ```tsx
 * <Switch label="Enable notifications" />
 * <Switch checked={isEnabled} onChange={handleChange} />
 * <Switch checkedColor="#ff5722" uncheckedColor="#e0e0e0" label="Custom Colors" />
 * ```
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = 'md',
      checked = false,
      disabled = false,
      error = false,
      label,
      className,
      onChange,
      checkedColor,
      uncheckedColor,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <SwitchContainer $disabled={disabled} className={className}>
        <HiddenInput
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <SwitchTrack
          $size={size}
          $checked={checked}
          $disabled={disabled}
          $error={error}
          $checkedColor={checkedColor}
          $uncheckedColor={uncheckedColor}
          theme={theme}
        >
          <SwitchThumb
            $size={size}
            $checked={checked}
            $disabled={disabled}
            $error={error}
            theme={theme}
          />
        </SwitchTrack>
        {label && (
          <LabelText $size={size} $disabled={disabled} theme={theme}>
            {label}
          </LabelText>
        )}
      </SwitchContainer>
    );
  },
);

Switch.displayName = 'Switch';
export default Switch;
