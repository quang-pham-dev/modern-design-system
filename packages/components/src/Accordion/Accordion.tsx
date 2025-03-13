import {
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  useMemo,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';
import { getColor, processSxProp } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

/**
 * Available variants for the Accordion component
 */
export type AccordionVariant = 'outlined' | 'filled' | 'elevated';

/**
 * Available sizes for the Accordion component
 */
export type AccordionSize = 'sm' | 'md' | 'lg';

/**
 * Context for the Accordion component
 */
interface AccordionContextType {
  /**
   * Array of expanded item indices
   */
  expandedItems: number[];
  /**
   * Function to toggle an item's expanded state
   */
  toggleItem: (index: number) => void;
  /**
   * Whether multiple items can be expanded simultaneously
   */
  allowMultiple: boolean;
  /**
   * The variant of the accordion
   */
  variant: AccordionVariant;
  /**
   * The size of the accordion
   */
  size: AccordionSize;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

/**
 * Hook to access the Accordion context
 */
export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion component');
  }
  return context;
};

export interface AccordionProps {
  /**
   * The children of the accordion
   */
  children: React.ReactNode;
  /**
   * Default expanded item indices
   * @default []
   */
  defaultExpandedItems?: number[];
  /**
   * Whether multiple items can be expanded simultaneously
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * The variant of the accordion
   * @default 'outlined'
   */
  variant?: AccordionVariant;
  /**
   * The size of the accordion
   * @default 'md'
   */
  size?: AccordionSize;
  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
  /**
   * Additional class name
   */
  className?: string;
}

const AccordionContainer = styled.div<{
  variant: AccordionVariant;
  theme: Theme;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'filled':
        return css`
          background-color: ${getColor(theme, ['gray', '100'], '#F7FAFC')};
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.md};
        `;
      case 'outlined':
        return css`
          border: 1px solid ${getColor(theme, ['gray', '200'], '#E2E8F0')};
        `;
      default:
        return;
    }
  }}
`;

/**
 * Accordion Component
 *
 * A component that displays collapsible content panels for presenting information in a limited space.
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem title="Section 1">
 *     Content for section 1
 *   </AccordionItem>
 *   <AccordionItem title="Section 2">
 *     Content for section 2
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = ({
  children,
  defaultExpandedItems = [],
  allowMultiple = false,
  variant = 'outlined',
  size = 'md',
  sx,
  className,
}: AccordionProps) => {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] =
    useState<number[]>(defaultExpandedItems);

  const toggleItem = useCallback(
    (index: number) => {
      setExpandedItems((prevExpandedItems) => {
        if (prevExpandedItems.includes(index)) {
          return prevExpandedItems.filter((item) => item !== index);
        }
        return allowMultiple ? [...prevExpandedItems, index] : [index];
      });
    },
    [allowMultiple],
  );

  const contextValue = useMemo(() => {
    return {
      expandedItems,
      toggleItem,
      allowMultiple,
      variant,
      size,
    };
  }, [allowMultiple, expandedItems, size, toggleItem, variant]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionContainer
        variant={variant}
        theme={theme}
        className={className}
        css={processSxProp(sx)}
      >
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              ...{ index },
              ...(child.props as object),
            });
          }
          return child;
        })}
      </AccordionContainer>
    </AccordionContext.Provider>
  );
};

export default Accordion;
