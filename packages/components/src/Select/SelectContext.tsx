import { createContext, useContext, useState } from 'react';

import type React from 'react';
import type { SelectOption, SelectContextType } from './types';

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const SelectProvider: React.FC<{
  children: React.ReactNode;
  value: SelectContextType;
}> = ({ children, value }) => {
  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

export const useSelect = (
  options: SelectOption[],
  value?: string,
  onChange?: (value: string) => void,
  disabled?: boolean,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [internalValue, setInternalValue] = useState(value);

  // Handle controlled vs uncontrolled
  const selectedValue = value ?? internalValue;

  const handleChange = (newValue: string) => {
    if (disabled) return;

    if (value === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
    setIsOpen(false);
  };

  return {
    isOpen,
    options: options || [],
    disabled,
    selectedValue,
    containerWidth,
    setIsOpen,
    setContainerWidth,
    onChange: handleChange,
  };
};
