import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * The color of the divider
   */
  color?: string;

  /**
   * The thickness of the divider
   * @default '1px'
   */
  thickness?: string | number;

  /**
   * The width of the divider (for horizontal orientation)
   * @default '100%'
   */
  width?: string | number;

  /**
   * The height of the divider (for vertical orientation)
   * @default '100%'
   */
  height?: string | number;

  /**
   * The margin around the divider
   */
  margin?: string | number;
}

type StyledDividerProps = {
  $orientation: 'horizontal' | 'vertical';
  $color: string;
  $thickness: string | number;
  $width?: string | number;
  $height?: string | number;
  $margin?: string | number;
};

const StyledDivider = styled.div<StyledDividerProps>`
  display: inline-block;
  flex-shrink: 0;
  background-color: ${(props) => props.$color};

  ${(props) =>
    props.$orientation === 'horizontal'
      ? `
    width: ${props.$width || '100%'};
    height: ${props.$thickness};
    margin: ${props.$margin || '0'};
  `
      : `
    width: ${props.$thickness};
    height: ${props.$height || '100%'};
    margin: ${props.$margin || '0'};
  `}
`;

/**
 * Divider Component
 *
 * A visual separator between content sections.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" height="24px" />
 * ```
 */
const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { theme } = useTheme();
  const {
    orientation = 'horizontal',
    color,
    thickness = '1px',
    width,
    height,
    margin,
    ...rest
  } = props;

  const dividerColor = color || theme?.colors?.divider || '#e0e0e0';

  return (
    <StyledDivider
      as="hr"
      ref={ref}
      $orientation={orientation}
      $color={dividerColor}
      $thickness={thickness}
      $width={width}
      $height={height}
      $margin={margin}
      aria-orientation={orientation}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
