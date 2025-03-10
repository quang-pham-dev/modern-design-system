import { forwardRef, useRef, useEffect } from 'react';

import { Box } from '../Box';
import { SelectProvider, useSelect } from './SelectContext';
import { SelectTrigger } from './SelectTrigger';
import { SelectDropdown } from './SelectDropdown';
import type { SelectProps } from './types';

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
    const containerRef = useRef<HTMLDivElement>(null);
    // Use our custom hook to manage select state
    const selectState = useSelect(options, value, onChange, disabled);

    // Merge refs
    const handleRef = (element: HTMLDivElement | null) => {
      containerRef.current = element;

      // Update container width for dropdown positioning
      if (element) {
        selectState.setContainerWidth(element.offsetWidth);
      }

      // Forward the ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          selectState.setIsOpen(false);
        }
      };

      if (selectState.isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectState.isOpen, selectState.setIsOpen]);

    return (
      <SelectProvider value={selectState}>
        <Box
          ref={handleRef}
          className={className}
          position="relative"
          data-fullwidth={fullWidth ? 'true' : 'false'}
          aria-expanded={selectState.isOpen}
          aria-disabled={disabled ? 'true' : 'false'}
          {...props}
        >
          <SelectTrigger
            placeholder={placeholder}
            size={size}
            variant={variant}
            error={error}
            fullWidth={fullWidth}
            disabled={disabled}
          />

          {selectState.isOpen && <SelectDropdown />}
        </Box>
      </SelectProvider>
    );
  },
);

Select.displayName = 'Select';

export default Select;
