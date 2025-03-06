import type React from 'react';
import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';

/**
 * Available typography variants
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

/**
 * Available text alignment options
 */
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Typography component props interface
 */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The component used for the root node
   * @default 'p'
   */
  component?: React.ElementType;

  /**
   * Ref forwarded to the root element
   */
  ref?: React.Ref<HTMLElement | null>;

  /**
   * Typography variant to use
   * @default 'body1'
   */
  variant?: TypographyVariant;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TypographyAlign;

  /**
   * If true, the text will not wrap, but instead will truncate with an ellipsis
   * @default false
   */
  noWrap?: boolean;

  /**
   * If true, the text will have a bottom margin
   * @default false
   */
  gutterBottom?: boolean;

  /**
   * The color of the component
   */
  color?: string;
}

/**
 * Get variant styles based on the typography variant
 */
const getVariantStyles = (theme: Theme, variant: TypographyVariant) => {
  const variantMap = {
    h1: css`
      font-size: 2.5rem;
      font-weight: ${theme.typography.fontWeights.bold};
      line-height: ${theme.typography.lineHeights.tight};
    `,
    h2: css`
      font-size: ${theme.typography.fontSizes['4xl']};
      font-weight: ${theme.typography.fontWeights.bold};
      line-height: ${theme.typography.lineHeights.tight};
    `,
    h3: css`
      font-size: ${theme.typography.fontSizes['3xl']};
      font-weight: ${theme.typography.fontWeights.semibold};
      line-height: 1.3;
    `,
    h4: css`
      font-size: ${theme.typography.fontSizes['2xl']};
      font-weight: ${theme.typography.fontWeights.semibold};
      line-height: 1.3;
    `,
    h5: css`
      font-size: ${theme.typography.fontSizes.xl};
      font-weight: ${theme.typography.fontWeights.semibold};
      line-height: 1.4;
    `,
    h6: css`
      font-size: ${theme.typography.fontSizes.lg};
      font-weight: ${theme.typography.fontWeights.semibold};
      line-height: 1.4;
    `,
    subtitle1: css`
      font-size: ${theme.typography.fontSizes.base};
      font-weight: ${theme.typography.fontWeights.medium};
      line-height: ${theme.typography.lineHeights.normal};
    `,
    subtitle2: css`
      font-size: ${theme.typography.fontSizes.xs};
      font-weight: ${theme.typography.fontWeights.medium};
      line-height: ${theme.typography.lineHeights.normal};
    `,
    body1: css`
      font-size: ${theme.typography.fontSizes.base};
      font-weight: ${theme.typography.fontWeights.normal};
      line-height: ${theme.typography.lineHeights.normal};
    `,
    body2: css`
      font-size: ${theme.typography.fontSizes.xs};
      font-weight: ${theme.typography.fontWeights.normal};
      line-height: ${theme.typography.lineHeights.normal};
    `,
    caption: css`
      font-size: ${theme.typography.fontSizes.xs};
      font-weight: ${theme.typography.fontWeights.normal};
      line-height: ${theme.typography.lineHeights.normal};
    `,
    overline: css`
      font-size: ${theme.typography.fontSizes.xs};
      font-weight: ${theme.typography.fontWeights.normal};
      line-height: ${theme.typography.lineHeights.normal};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    `,
  };

  return variantMap[variant];
};

/**
 * Get alignment styles based on the alignment prop
 */
const getAlignStyles = (align: TypographyAlign) => {
  return css`
    text-align: ${align};
  `;
};

/**
 * Get styles for noWrap option
 */
const getNoWrapStyles = () => {
  return css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};

/**
 * Get styles for gutterBottom option
 */
const getGutterBottomStyles = () => {
  return css`
    margin-bottom: 0.35em;
  `;
};

const getFontFamilyStyles = (theme: Theme) => {
  return css`
    font-family: ${theme.typography.fontFamily};
  `;
};

/**
 * Styled component for Typography
 */
const StyledTypography = styled.p<{
  $variant: TypographyVariant;
  $align: TypographyAlign;
  $noWrap: boolean;
  $gutterBottom: boolean;
  $color?: string;
}>`
  margin: 0;
  font-family: ${({ theme }) => getFontFamilyStyles(theme as Theme)};
  ${({ theme, $variant }) => getVariantStyles(theme as Theme, $variant)};
  ${({ $align }) => getAlignStyles($align)};
  ${({ $noWrap }) => $noWrap && getNoWrapStyles()};
  ${({ $gutterBottom }) => $gutterBottom && getGutterBottomStyles()};
  ${({ $color }) => $color && `color: ${$color};`};
`;

/**
 * Typography Component
 *
 * A versatile text component for displaying content with various styles.
 * Supports different variants, alignments, and styling options.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1" align="center">Centered text</Typography>
 * <Typography variant="caption" color="gray">Small gray text</Typography>
 * ```
 */
const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    {
      component,
      variant = 'body1',
      align = 'left',
      noWrap = false,
      gutterBottom = false,
      color,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Determine the component to use based on variant if not explicitly provided
    const defaultComponent = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'h6',
      subtitle2: 'h6',
      body1: 'p',
      body2: 'p',
      caption: 'span',
      overline: 'span',
    }[variant] as React.ElementType;

    return (
      <StyledTypography
        as={component || defaultComponent}
        ref={ref}
        $variant={variant}
        $align={align}
        $noWrap={noWrap}
        $gutterBottom={gutterBottom}
        $color={color}
        theme={theme}
        {...props}
      >
        {children}
      </StyledTypography>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
