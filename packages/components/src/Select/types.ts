import type React from 'react';

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

export interface SelectTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface SelectDropdownProps {
  className?: string;
}

export interface SelectOptionProps {
  option: SelectOption;
  className?: string;
}

// Add the SelectContextType export
export interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedValue?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  containerWidth: number;
  setContainerWidth: (width: number) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}
