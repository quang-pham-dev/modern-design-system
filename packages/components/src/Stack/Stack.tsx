import type React from 'react';
import {
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
  Fragment,
} from 'react';

import { Flex } from '../Flex';

import type { FlexProps } from '../Flex';

export interface StackProps extends Omit<FlexProps, 'direction'> {
  /**
   * The direction of the stack
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * The spacing between items
   * @default '0'
   */
  spacing?: string | number;

  /**
   * If true, each child will be wrapped in a div to ensure consistent spacing
   * @default false
   */
  shouldWrapChildren?: boolean;

  /**
   * Divider element to be rendered between items
   */
  divider?: React.ReactElement;
}

/**
 * Stack Component
 *
 * A component for stacking elements vertically or horizontally with consistent spacing.
 *
 * @example
 * ```tsx
 * <Stack direction="vertical" spacing="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      spacing = 0,
      shouldWrapChildren = false,
      divider,
      children,
      ...props
    },
    ref,
  ) => {
    // Convert direction to flex-direction
    const flexDirection = direction === 'vertical' ? 'column' : 'row';

    // Process children to add spacing and dividers
    const childrenArray = Children.toArray(children).filter(
      (child) =>
        isValidElement(child) ||
        typeof child === 'string' ||
        typeof child === 'number',
    );

    const processedChildren = childrenArray.map((child, index) => {
      // Skip processing for the last child
      if (index === childrenArray.length - 1) {
        return shouldWrapChildren && isValidElement(child) ? (
          <div key={`last-child-${index.toString()}`}>{child}</div>
        ) : (
          child
        );
      }

      // Create a fragment with child and optional divider
      const currentChild =
        shouldWrapChildren && isValidElement(child) ? (
          <div key={`child-${index.toString()}`}>{child}</div>
        ) : (
          child
        );

      // Add divider if provided
      if (divider && index < childrenArray.length - 1) {
        const clonedDivider = isValidElement(divider)
          ? cloneElement(divider, { key: `divider-${index.toString()}` })
          : null;

        return (
          <Fragment key={`stack-${index.toString()}`}>
            {currentChild}
            {clonedDivider}
          </Fragment>
        );
      }

      return currentChild;
    });

    return (
      <Flex ref={ref} direction={flexDirection} gap={spacing} {...props}>
        {processedChildren}
      </Flex>
    );
  },
);

Stack.displayName = 'Stack';

export default Stack;
