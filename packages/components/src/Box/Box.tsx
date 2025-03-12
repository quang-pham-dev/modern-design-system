import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { spacingProperty } from '@modern-design-system/utils';
import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';
import type { SpacingValue } from '@modern-design-system/theme';

type SpaceProps = {
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginRight?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  gap?: SpacingValue;
};

type LayoutProps = {
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  display?: string;
  overflow?: string;
  position?: string;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
};

type FlexProps = {
  flex?: number;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  alignSelf?: string;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  flexWrap?: string;
};

type StyleProps = {
  backgroundColor?: string;
  borderRadius?: string | number;
  border?: string;
  borderColor?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
  borderRight?: string;
  boxShadow?: string;
  textAlign?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
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
  position: 'position',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',

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
  borderColor: 'border-color',
  borderBottom: 'border-bottom',
  borderTop: 'border-top',
  borderLeft: 'border-left',
  borderRight: 'border-right',
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

const StyledBox = styled.div<StyledBoxProps>`
  ${(props) => css`
    ${spacingProperty('padding', props.$padding)}
    ${spacingProperty('padding-top', props.$paddingTop)}
    ${spacingProperty('padding-right', props.$paddingRight)}
    ${spacingProperty('padding-bottom', props.$paddingBottom)}
    ${spacingProperty('padding-left', props.$paddingLeft)}
    ${spacingProperty('margin', props.$margin)}
    ${spacingProperty('margin-top', props.$marginTop)}
    ${spacingProperty('margin-right', props.$marginRight)}
    ${spacingProperty('margin-bottom', props.$marginBottom)}
    ${spacingProperty('margin-left', props.$marginLeft)}
    ${spacingProperty('gap', props.$gap)}
    ${spacingProperty('width', props.$width)}
    ${spacingProperty('height', props.$height)}
    ${spacingProperty('max-width', props.$maxWidth)}
    ${spacingProperty('max-height', props.$maxHeight)}
    ${spacingProperty('top', props.$top)}
    ${spacingProperty('bottom', props.$bottom)}
    ${spacingProperty('left', props.$left)}
    ${spacingProperty('right', props.$right)}

    // Flex properties
    flex-direction: ${props.$flexDirection};
    justify-content: ${props.$justifyContent};
    align-items: ${props.$alignItems};
    align-self: ${props.$alignSelf};
    flex-grow: ${props.$grow};
    flex-shrink: ${props.$shrink};
    flex-basis: ${props.$basis};

    // Style properties
    background-color: ${props.$backgroundColor};
    border-radius: ${props.$borderRadius};
    border: ${props.$border};
    border-color: ${props.$borderColor};
    border-bottom: ${props.$borderBottom};
    border-top: ${props.$borderTop};
    border-left: ${props.$borderLeft};
    border-right: ${props.$borderRight};
    box-shadow: ${props.$boxShadow};
    text-align: ${props.$textAlign};

    display: ${props.$display};
    overflow: ${props.$overflow};
    position: ${props.$position};
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
const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { theme } = useTheme();
  const { children, ...rest } = props;

  // Transform regular props to prefixed props for the styled component
  const styledProps = Object.entries(rest).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (Object.hasOwn(propToCssProperty, key)) {
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
