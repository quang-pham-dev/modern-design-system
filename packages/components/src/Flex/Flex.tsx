import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Box } from '../Box';

import type { BoxProps } from '../Box';

export interface FlexProps extends BoxProps {
  /**
   * Defines the direction of the flex items
   * @default 'row'
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Defines how items are aligned along the main axis
   * @default 'flex-start'
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  /**
   * Defines how items are aligned along the cross axis
   * @default 'stretch'
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

  /**
   * Defines the ability for a flex item to grow if necessary
   */
  grow?: number;

  /**
   * Defines the ability for a flex item to shrink if necessary
   */
  shrink?: number;

  /**
   * Defines the default size of an element before the remaining space is distributed
   */
  basis?: string | number;

  /**
   * Defines the spacing between flex items
   */
  gap?: string | number;

  /**
   * Defines if the flex items should wrap
   * @default 'nowrap'
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

const StyledFlex = styled(Box)<{
  $direction?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $grow?: number;
  $shrink?: number;
  $basis?: string | number;
  $gap?: string | number;
  $wrap?: string;
}>`
  display: flex;
  ${({ $direction }) =>
    $direction &&
    css`
      flex-direction: ${$direction};
    `}
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `}
  ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `}
  ${({ $grow }) =>
    $grow !== undefined &&
    css`
      flex-grow: ${$grow};
    `}
  ${({ $shrink }) =>
    $shrink !== undefined &&
    css`
      flex-shrink: ${$shrink};
    `}
  ${({ $basis }) =>
    $basis &&
    css`
      flex-basis: ${$basis};
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
  ${({ $wrap }) =>
    $wrap &&
    css`
      flex-wrap: ${$wrap};
    `}
`;

/**
 * Flex Component
 *
 * A flexbox container for creating flexible layouts.
 *
 * @example
 * ```tsx
 * <Flex direction="row" justifyContent="space-between" alignItems="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      justifyContent = 'flex-start',
      alignItems = 'stretch',
      grow,
      shrink,
      basis,
      gap,
      wrap = 'nowrap',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledFlex
        ref={ref}
        $direction={direction}
        $justifyContent={justifyContent}
        $alignItems={alignItems}
        $grow={grow}
        $shrink={shrink}
        $basis={basis}
        $gap={gap}
        $wrap={wrap}
        display="flex"
        {...props}
      >
        {children}
      </StyledFlex>
    );
  },
);

Flex.displayName = 'Flex';

export default Flex;
