import type React from 'react';
import { forwardRef, useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectVariant = 'outlined' | 'filled' | 'standard';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The size of the select
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * The variant of the select
   * @default 'outlined'
   */
  variant?: SelectVariant;

  /**
   * If true, the select will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the select will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * If true, the select will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * The options to display in the select dropdown
   */
  options: SelectOption[];

  /**
   * The currently selected value
   */
  value?: string;

  /**
   * Callback fired when the value changes
   */
  onChange?: (value: string) => void;

  /**
   * Ref forwarded to the select element
   */
  ref?: React.Ref<HTMLDivElement>;
}

const getSizeStyles = (theme: Theme, size: SelectSize) => {
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
  variant: SelectVariant,
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

      &:focus-within {
        border-color: ${focusBorderColor};
        box-shadow: 0 0 0 2px
          ${error ? theme.colors.error.light : theme.colors.primary.light}20;
      }
    `,
    filled: css`
      border: 1px solid transparent;
      border-bottom: 1px solid ${borderColor};
      background-color: rgba(0, 0, 0, 0.05);

      &:focus-within {
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

      &:focus-within {
        border-bottom: 2px solid ${focusBorderColor};
        margin-bottom: -1px;
      }
    `,
  };

  return variantMap[variant];
};

const SelectContainer = styled.div<{
  $size: SelectSize;
  $variant: SelectVariant;
  $error: boolean;
  $fullWidth: boolean;
  $disabled: boolean;
  theme: Theme;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  transition: all 0.2s ease-in-out;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme, $size }) => getSizeStyles(theme, $size)}
  ${({ theme, $variant, $error }) => getVariantStyles(theme, $variant, $error)}
`;

const SelectValue = styled.div<{
  $hasValue: boolean;
}>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $hasValue }) =>
    $hasValue ? 'inherit' : theme.colors.text.secondary};
  opacity: ${(props) => (props.$hasValue ? 1 : 0.7)};
`;

const ChevronIcon = styled.div<{
  $isOpen: boolean;
}>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease-in-out;
  pointer-events: none;

  svg {
    display: block;
  }
`;

const DropdownContainer = styled.div<{
  $width: number;
  theme: Theme;
}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.$width}px;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
`;

const OptionItem = styled.div<{
  $isSelected: boolean;
  $isDisabled: boolean;
  theme: Theme;
}>`
  padding: 10px 14px;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) =>
    props.$isSelected
      ? `${props.theme.colors.primary.light}20`
      : 'transparent'};
  color: ${(props) =>
    props.$isDisabled
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.primary};
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      !props.$isDisabled && !props.$isSelected
        ? 'rgba(0, 0, 0, 0.04)'
        : props.$isSelected
          ? `${props.theme.colors.primary.light}20`
          : 'transparent'};
  }
`;

/**
 * Select Component
 *
 * A dropdown select component for selecting a value from a list of options.
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   placeholder="Select an option"
 * />
 * ```
 */
const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      size = 'md',
      variant = 'outlined',
      disabled = false,
      error = false,
      fullWidth = false,
      placeholder,
      options,
      value,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Merge refs
    const handleRef = (element: HTMLDivElement | null) => {
      containerRef.current = element;

      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Get the selected option label
    const selectedOption = options.find((option) => option.value === value);

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Update container width for dropdown positioning
    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, []);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (optionValue: string, isDisabled = false) => {
      if (!disabled && !isDisabled) {
        onChange?.(optionValue);
        setIsOpen(false);
      }
    };

    return (
      <SelectContainer
        ref={handleRef}
        $size={size}
        $variant={variant}
        $error={error}
        $fullWidth={fullWidth}
        $disabled={disabled}
        theme={theme}
        className={className}
        onClick={handleToggle}
        {...props}
      >
        <SelectValue $hasValue={!!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </SelectValue>

        <ChevronIcon $isOpen={isOpen}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="sendIconTitle">
              {selectedOption ? selectedOption.label : placeholder}
            </title>
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ChevronIcon>

        {isOpen && (
          <DropdownContainer $width={containerWidth} theme={theme}>
            {options.map((option) => (
              <OptionItem
                key={option.value}
                $isSelected={option.value === value}
                $isDisabled={!!option.disabled}
                theme={theme}
                onClick={() => handleOptionClick(option.value, option.disabled)}
              >
                {option.label}
              </OptionItem>
            ))}
          </DropdownContainer>
        )}
      </SelectContainer>
    );
  },
);

Select.displayName = 'Select';

export default Select;
