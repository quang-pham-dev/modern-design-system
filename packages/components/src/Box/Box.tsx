import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding applied to all sides
   */
  padding?: string | number;

  /**
   * Margin applied to all sides
   */
  margin?: string | number;

  /**
   * Width of the box
   */
  width?: string | number;

  /**
   * Height of the box
   */
  height?: string | number;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Border radius
   */
  borderRadius?: string | number;

  /**
   * Border style
   */
  border?: string;

  /**
   * Display property
   */
  display?: string;

  /**
   * Box shadow
   */
  boxShadow?: string;

  /**
   * Overflow behavior
   */
  overflow?: string;

  /**
   * Text alignment
   */
  textAlign?: string;

  /**
   * Flex grow factor
   */
  grow?: number;

  /**
   * Flex shrink factor
   */
  shrink?: number;

  /**
   * Flex basis
   */
  basis?: string | number;

  /**
   * Justify content (for flex containers)
   */
  justifyContent?: string;

  /**
   * Align items (for flex containers)
   */
  alignItems?: string;

  /**
   * Align self (for flex items)
   */
  alignSelf?: string;

  /**
   * Maximum width
   */
  maxWidth?: string | number;

  /**
   * Maximum height
   */
  maxHeight?: string | number;

  /**
   * The content of the box
   */
  children?: React.ReactNode;
}

const StyledBox = styled.div<{
  $padding?: string | number;
  $margin?: string | number;
  $width?: string | number;
  $height?: string | number;
  $backgroundColor?: string;
  $borderRadius?: string | number;
  $border?: string;
  $display?: string;
  $boxShadow?: string;
  $overflow?: string;
  $textAlign?: string;
  $grow?: number;
  $shrink?: number;
  $basis?: string | number;
  $alignSelf?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $maxWidth?: string | number;
  $maxHeight?: string | number;
}>`
  ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
  ${({ $margin }) =>
    $margin &&
    css`
      margin: ${$margin};
    `}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background-color: ${$backgroundColor};
    `}
  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `}
  ${({ $border }) =>
    $border &&
    css`
      border: ${$border};
    `}
  ${({ $display }) =>
    $display &&
    css`
      display: ${$display};
    `}
  ${({ $boxShadow }) =>
    $boxShadow &&
    css`
      box-shadow: ${$boxShadow};
    `}
  ${({ $overflow }) =>
    $overflow &&
    css`
      overflow: ${$overflow};
    `}
  ${({ $textAlign }) =>
    $textAlign &&
    css`
      text-align: ${$textAlign};
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
  ${({ $alignSelf }) =>
    $alignSelf &&
    css`
      align-self: ${$alignSelf};
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
  ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}
  ${({ $maxHeight }) =>
    $maxHeight &&
    css`
      max-height: ${$maxHeight};
    `}
`;

/**
 * Box Component
 *
 * A basic layout container that can be used to group elements and apply spacing, background, borders, etc.
 *
 * @example
 * ```tsx
 * <Box padding="1rem" backgroundColor="#f5f5f5" borderRadius="4px">
 *   Content goes here
 * </Box>
 * ```
 */
const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      padding,
      margin,
      width,
      height,
      backgroundColor,
      borderRadius,
      border,
      display,
      boxShadow,
      overflow,
      textAlign,
      grow,
      shrink,
      basis,
      alignSelf,
      justifyContent,
      alignItems,
      maxWidth,
      maxHeight,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <StyledBox
        ref={ref}
        $padding={padding}
        $margin={margin}
        $width={width}
        $height={height}
        $backgroundColor={backgroundColor}
        $borderRadius={borderRadius}
        $border={border}
        $display={display}
        $boxShadow={boxShadow}
        $overflow={overflow}
        $textAlign={textAlign}
        $grow={grow}
        $shrink={shrink}
        $basis={basis}
        $alignSelf={alignSelf}
        $justifyContent={justifyContent}
        $alignItems={alignItems}
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        theme={theme}
        {...props}
      >
        {children}
      </StyledBox>
    );
  },
);

Box.displayName = 'Box';

export default Box;
