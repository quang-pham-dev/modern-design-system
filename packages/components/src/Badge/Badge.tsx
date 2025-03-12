import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type BadgeVariant = 'standard' | 'dot';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgePosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * The content to be displayed within the badge
   */
  content?: React.ReactNode;
  /**
   * If true, the badge will be invisible
   * @default false
   */
  invisible?: boolean;
  /**
   * The color of the badge
   * @default 'primary'
   */
  color?: BadgeColor;
  /**
   * The variant of the badge
   * @default 'standard'
   */
  variant?: BadgeVariant;
  /**
   * The size of the badge
   * @default 'md'
   */
  size?: BadgeSize;
  /**
   * The position of the badge
   * @default 'top-right'
   */
  position?: BadgePosition;
  /**
   * If true, the badge will have a small dot appearance
   * @default false
   */
  dot?: boolean;
  /**
   * Maximum count to show
   * @default 99
   */
  max?: number;
  /**
   * If true, the badge will be displayed as a standalone badge
   * @default false
   */
  standalone?: boolean;
  /**
   * If true, the badge will show zero value
   * @default false
   */
  showZero?: boolean;
  /**
   * The shape of the badge overlap
   * @default 'rectangular'
   */
  overlap?: 'rectangular' | 'circular';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getBadgeStyles = (
  variant: BadgeVariant,
  color: BadgeColor,
  size: BadgeSize,
  position: BadgePosition,
  standalone: boolean,
  theme: Theme,
) => {
  // Size-based styles
  const sizeStyles = {
    sm: {
      height: '16px',
      minWidth: '16px',
      fontSize: '0.65rem',
      padding: '0 4px',
    },
    md: {
      height: '20px',
      minWidth: '20px',
      fontSize: '0.75rem',
      padding: '0 6px',
    },
    lg: {
      height: '24px',
      minWidth: '24px',
      fontSize: '0.85rem',
      padding: '0 8px',
    },
  };

  // Position-based styles
  const positionStyles = {
    'top-right': {
      top: '0',
      right: '0',
      transform: 'translate(50%, -50%)',
    },
    'top-left': {
      top: '0',
      left: '0',
      transform: 'translate(-50%, -50%)',
    },
    'bottom-right': {
      bottom: '0',
      right: '0',
      transform: 'translate(50%, 50%)',
    },
    'bottom-left': {
      bottom: '0',
      left: '0',
      transform: 'translate(-50%, 50%)',
    },
  };

  // Base styles for the badge
  const baseStyles = css`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.fontWeights.medium};
    line-height: 1;
    border-radius: ${theme.borderRadius.full || '10px'};
    white-space: nowrap;
    transition: all 0.2s ease-in-out;

    ${!standalone
      ? css`
          position: absolute;
          z-index: 1;
          ${positionStyles[position]}
        `
      : css`
          position: relative;
        `}

    ${sizeStyles[size]}
  `;

  // Dot variant styles
  if (variant === 'dot') {
    return css`
      ${baseStyles}
      min-width: ${size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'};
      height: ${size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px'};
      padding: 0;
      border-radius: 50%;
      background-color: ${getColor(theme, [color, 'main'], '#1976d2')};
    `;
  }

  // Standard variant styles
  return css`
    ${baseStyles}
    background-color: ${getColor(theme, [color, 'main'], '#1976d2')};
    color: ${getColor(theme, [color, 'contrastText'], '#ffffff')};
  `;
};

const BadgeRoot = styled.span`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

const BadgeContent = styled.span<{
  variant: BadgeVariant;
  color: BadgeColor;
  size: BadgeSize;
  position: BadgePosition;
  standalone: boolean;
  invisible: boolean;
  theme: Theme;
}>`
  ${({ variant, color, size, position, standalone, theme }) =>
    getBadgeStyles(variant, color, size, position, standalone, theme)}

  ${({ invisible }) =>
    invisible &&
    css`
      display: none;
    `}
`;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      content,
      invisible = false,
      color = 'primary',
      variant = 'standard',
      size = 'md',
      position = 'top-right',
      max = 99,
      dot = false,
      standalone = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Determine if badge should be invisible
    const shouldBeInvisible = invisible || (content === undefined && !dot);

    // Format content based on max value
    const displayContent = dot
      ? null
      : typeof content === 'number' && content > max
        ? `${max}+`
        : content;

    // Use dot variant if dot prop is true
    const badgeVariant = dot ? 'dot' : variant;

    return standalone ? (
      <BadgeContent
        ref={ref}
        variant={badgeVariant}
        color={color}
        size={size}
        position={position}
        standalone={true}
        invisible={shouldBeInvisible}
        theme={theme}
        {...props}
      >
        {displayContent}
      </BadgeContent>
    ) : (
      <BadgeRoot ref={ref}>
        {children}
        <BadgeContent
          variant={badgeVariant}
          color={color}
          size={size}
          position={position}
          standalone={false}
          invisible={shouldBeInvisible}
          theme={theme}
          {...props}
        >
          {displayContent}
        </BadgeContent>
      </BadgeRoot>
    );
  },
);

Badge.displayName = 'Badge';
