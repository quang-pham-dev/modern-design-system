import { useTheme } from '@modern-design-system/hooks';

import { useSelectContext } from './SelectContext';
import { OptionItem } from './styles';

import type { SelectOptionProps } from './types';
import type React from 'react';

export const SelectOption: React.FC<SelectOptionProps> = ({
  option,
  className,
}) => {
  const { theme } = useTheme();
  const { selectedValue, onChange } = useSelectContext();
  const isSelected = option.value === selectedValue;

  const handleClick = () => {
    if (!option.disabled) {
      onChange(option.value);
    }
  };

  return (
    <OptionItem
      $isSelected={isSelected}
      $isDisabled={!!option.disabled}
      theme={theme}
      className={className}
      onClick={handleClick}
      aria-selected={isSelected}
      aria-disabled={!!option.disabled}
    >
      {option.label}
    </OptionItem>
  );
};
