import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';

// Define property groups for better organization
type SpaceProps = {
  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  gap?: string | number;
};

type LayoutProps = {
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  display?: string;
  overflow?: string;
};

type FlexProps = {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  grow?: number;
  shrink?: number;
  basis?: string | number;
};

type StyleProps = {
  backgroundColor?: string;
  borderRadius?: string | number;
  border?: string;
  boxShadow?: string;
  textAlign?: string;
};

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    LayoutProps,
    FlexProps,
    StyleProps {
  children?: React.ReactNode;
}

// Create a mapping of prop names to CSS property names
const propToCssProperty = {
  // Space properties
  padding: 'padding',
  paddingTop: 'padding-top',
  paddingRight: 'padding-right',
  paddingBottom: 'padding-bottom',
  paddingLeft: 'padding-left',
  margin: 'margin',
  marginTop: 'margin-top',
  marginRight: 'margin-right',
  marginBottom: 'margin-bottom',
  marginLeft: 'margin-left',
  gap: 'gap',

  // Layout properties
  width: 'width',
  height: 'height',
  maxWidth: 'max-width',
  maxHeight: 'max-height',
  display: 'display',
  overflow: 'overflow',

  // Flex properties
  flexDirection: 'flex-direction',
  justifyContent: 'justify-content',
  alignItems: 'align-items',
  alignSelf: 'align-self',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: 'flex-basis',

  // Style properties
  backgroundColor: 'background-color',
  borderRadius: 'border-radius',
  border: 'border',
  boxShadow: 'box-shadow',
  textAlign: 'text-align',
} as const;

// Create a type from the keys of propToCssProperty
type StylePropName = keyof typeof propToCssProperty;

// Define a type for CSS property values
type CSSPropertyValue = string | number | undefined;

// Create a type for the prefixed props
type PrefixedProps = {
  [K in StylePropName as `$${string & K}`]?: CSSPropertyValue;
};

// Create a type for the styled component props
type StyledBoxProps = PrefixedProps & {
  theme?: ReturnType<typeof useTheme>['theme'];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>;

// Function to transform props to CSS
const transformProps = (
  props: StyledBoxProps,
): Record<string, CSSPropertyValue> => {
  const cssProps: Record<string, CSSPropertyValue> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('$') && value !== undefined) {
      const propName = key.substring(1) as StylePropName;
      const cssKey = propToCssProperty[propName];
      if (cssKey) {
        cssProps[cssKey] = value;
      }
    }
  }

  return cssProps;
};

const StyledBox = styled.div<StyledBoxProps>`
  ${(props) => {
    const cssProps = transformProps(props);
    return Object.entries(cssProps).map(
      ([property, value]) => css`
        ${property}: ${value};
      `,
    );
  }}
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
const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { theme } = useTheme();
  const { children, ...rest } = props;

  // Transform regular props to prefixed props for the styled component
  const styledProps = Object.entries(rest).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (Object.prototype.hasOwnProperty.call(propToCssProperty, key)) {
        acc[`$${key}`] = value;
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  return (
    <StyledBox ref={ref} theme={theme} {...(styledProps as StyledBoxProps)}>
      {children}
    </StyledBox>
  );
});

Box.displayName = 'Box';

export default Box;
