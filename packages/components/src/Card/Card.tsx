import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type CardVariant = 'outlined' | 'elevated' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the card
   * @default 'elevated'
   */
  variant?: CardVariant;
  /**
   * The size of the card
   * @default 'md'
   */
  size?: CardSize;
  /**
   * If true, the card will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If true, the card will have no padding
   * @default false
   */
  noPadding?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getCardStyles = (
  variant: CardVariant,
  size: CardSize,
  fullWidth: boolean,
  noPadding: boolean,
  theme: Theme,
) => {
  const padding = noPadding
    ? '0'
    : size === 'sm'
      ? '12px'
      : size === 'md'
        ? '16px'
        : '24px';

  const borderRadius = theme.borderRadius.sm || '4px';

  const baseStyles = css`
    display: flex;
    flex-direction: column;
    width: ${fullWidth ? '100%' : 'auto'};
    padding: ${padding};
    border-radius: ${borderRadius};
    transition: all 0.2s ease-in-out;
    font-family: ${theme.typography.fontFamily};
  `;

  if (variant === 'outlined') {
    return css`
      ${baseStyles}
      border: 1px solid ${getColor(theme, ['grey', '300'], '#e0e0e0')};
      background-color: ${getColor(theme, ['background', 'paper'], '#ffffff')};
    `;
  }

  if (variant === 'filled') {
    return css`
      ${baseStyles}
      background-color: ${getColor(theme, ['grey', '100'], '#f5f5f5')};
    `;
  }

  // elevated variant (default)
  return css`
    ${baseStyles}
    background-color: ${getColor(theme, ['background', 'paper'], '#ffffff')};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }
  `;
};

const CardRoot = styled.div<{
  variant: CardVariant;
  size: CardSize;
  fullWidth: boolean;
  noPadding: boolean;
  theme: Theme;
}>`
  ${({ variant, size, fullWidth, noPadding, theme }) =>
    getCardStyles(variant, size, fullWidth, noPadding, theme)}
`;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      size = 'md',
      fullWidth = false,
      noPadding = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <CardRoot
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        noPadding={noPadding}
        theme={theme}
        {...props}
      >
        {children}
      </CardRoot>
    );
  },
);

Card.displayName = 'Card';

export default Card;
