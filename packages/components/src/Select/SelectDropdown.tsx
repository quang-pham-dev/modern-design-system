import { useTheme } from '@modern-design-system/hooks';

import { useSelectContext } from './SelectContext';
import { SelectOption } from './SelectOption';
import { DropdownContainer } from './styles';

import type { SelectDropdownProps } from './types';
import type React from 'react';

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  className,
}) => {
  const { theme } = useTheme();
  const { containerWidth, options } = useSelectContext();

  return (
    <DropdownContainer
      $width={containerWidth}
      theme={theme}
      className={className}
    >
      {options.map((option) => (
        <SelectOption key={option.value} option={option} />
      ))}
    </DropdownContainer>
  );
};
