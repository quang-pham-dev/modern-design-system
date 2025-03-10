import { useTheme } from '@modern-design-system/hooks';

import { useSelectContext } from './SelectContext';
import { SelectValue, ChevronIcon, SelectContainer } from './styles';

import type { SelectTriggerProps } from './types';
import type React from 'react';

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  placeholder,
  size = 'md',
  variant = 'outlined',
  error = false,
  fullWidth = false,
  disabled = false,
  className,
}) => {
  const { theme } = useTheme();
  const { isOpen, options, selectedValue, setIsOpen } = useSelectContext();

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SelectContainer
      $size={size}
      $variant={variant}
      $error={error}
      $fullWidth={fullWidth}
      $disabled={disabled}
      theme={theme}
      className={className}
      onClick={handleToggle}
    >
      <SelectValue $hasValue={!!selectedOption} theme={theme}>
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
          <title id="selectIconTitle">
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
    </SelectContainer>
  );
};
