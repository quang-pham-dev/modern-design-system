import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type { Theme } from '@modern-design-system/theme';
import type React from 'react';

/**
 * Available button variants that determine the visual style
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'ghost';

/**
 * Button size options that control dimensions and typography
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Color schemes available for the button
 */
export type ButtonColor = 'default' | 'success' | 'error' | 'warning';

/**
 * Button component props interface
 * @interface ButtonProps
 * @extends {ButtonBaseProps} - Inherits all props from ButtonBase
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Custom component to be rendered instead of the default button
   * Allows for component composition and custom rendering
   */
  component?: React.ElementType;

  /**
   * Ref forwarded to the root element
   */
  ref?: React.Ref<HTMLButtonElement | null>;

  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button affecting padding and font size
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Color scheme of the button
   * @default 'default'
   */
  color?: ButtonColor;

  /**
   * Whether the button is in a loading state
   * When true, the button will be disabled and show a loading indicator
   * @default false
   * @type {boolean}
   */
  loading?: boolean;

  /**
   * Whether the button should take up the full width of its container
   * @default false
   * @type {boolean}
   */
  fullWidth?: boolean;

  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode;
}

/**
 * Generates base button styles that are common across all button variants
 *
 * @param {Theme} theme - The current theme object containing design tokens
 * @returns {ReturnType<typeof css>} - Emotion CSS styles for base button appearance
 */
const getBaseStyles = (theme: Theme): ReturnType<typeof css> => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  text-decoration: none;
  outline: none;
  user-select: none;
  transition: all 0.2s ease-in-out;
  font-family: ${theme.typography.fontFamily};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary.light};
    outline-offset: 2px;
  }
`;

/**
 * Generates variant-specific button styles based on the selected variant and color
 *
 * @param {Theme} theme - The current theme object containing design tokens
 * @param {ButtonVariant} variant - The button variant (primary, secondary, outline, text)
 * @param {ButtonColor} color - The color scheme for the button
 * @returns {ReturnType<typeof css>} - Emotion CSS styles for the specific variant
 */
const getVariantStyles = (
  theme: Theme,
  variant: ButtonVariant,
  color: ButtonColor,
): ReturnType<typeof css> => {
  const colorMap = {
    default: theme.colors.primary,
    success: {
      light: '#4caf50',
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    error: theme.colors.error,
    warning: {
      light: '#ff9800',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: '#ffffff',
    },
  };

  const currentColor = colorMap[color];

  switch (variant) {
    case 'primary':
      return css`
        background-color: ${currentColor.main};
        color: ${currentColor.contrastText};
        &:hover:not(:disabled) {
          background-color: ${currentColor.dark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${currentColor.light};
        color: ${currentColor.contrastText};
        &:hover:not(:disabled) {
          background-color: ${currentColor.main};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${currentColor.main};
        border: 1px solid ${currentColor.main};
        &:hover:not(:disabled) {
          background-color: ${currentColor.light}1A;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${currentColor.main};
        &:hover:not(:disabled) {
          background-color: ${currentColor.light}1A;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${currentColor.main};
        padding: ${theme.spacing.xs}px;
        &:hover:not(:disabled) {
          background-color: ${currentColor.light}1A;
        }
      `;
    default:
      return css``;
  }
};

/**
 * Generates size-specific button styles based on the selected size
 *
 * @param {Theme} theme - The current theme object containing design tokens
 * @param {ButtonSize} size - The button size (xs, sm, md, lg)
 * @returns {ReturnType<typeof css>} - Emotion CSS styles for the specific size
 */
const getSizeStyles = (
  theme: Theme,
  size: ButtonSize,
): ReturnType<typeof css> => {
  switch (size) {
    case 'xs':
      return css`
        padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
        font-size: ${theme.typography.fontSizes.xs};
        line-height: ${theme.typography.lineHeights.normal};
        border-radius: ${theme.borderRadius.xs};
      `;
    case 'sm':
      return css`
        padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
        font-size: ${theme.typography.fontSizes.sm};
        line-height: ${theme.typography.lineHeights.normal};
        border-radius: ${theme.borderRadius.xs};
      `;
    case 'md':
      return css`
        padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
        font-size: ${theme.typography.fontSizes.base};
        line-height: ${theme.typography.lineHeights.normal};
        border-radius: ${theme.borderRadius.sm};
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.lg}px ${theme.spacing.xl}px;
        font-size: ${theme.typography.fontSizes.lg};
        line-height: ${theme.typography.lineHeights.normal};
        border-radius: ${theme.borderRadius.sm};
      `;
    default:
      return css``;
  }
};

/**
 * Styled container component for button content
 * Provides proper alignment and spacing for button children and icons
 * Adjusts gap spacing based on button size
 */
const ContainerStyled = styled.span<{ theme: Theme; size?: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => {
    switch (props.size) {
      case 'xs':
        return props.theme.spacing.xs;
      case 'sm':
        return props.theme.spacing.xs;
      case 'lg':
        return props.theme.spacing.md;
      default:
        return props.theme.spacing.sm;
    }
  }}px;
`;

/**
 * Button Component
 *
 * A versatile button component that supports multiple variants, sizes, and colors.
 * Built on top of ButtonBase with additional styling and functionality.
 *
 * Features:
 * - Multiple visual variants (primary, secondary, outline, text)
 * - Different size options (xs, sm, md, lg)
 * - Color schemes (default, success, error, warning)
 * - Support for loading state
 * - Optional start and end icons
 * - Full width option
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variants and colors
 * <Button variant="outline" color="success">Success</Button>
 *
 * // With loading state
 * <Button loading>Processing...</Button>
 *
 * // With icons
 * <Button startIcon={<Icon name="check" />} endIcon={<Icon name="arrow-right" />}>
 *   Proceed
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      color = 'default',
      loading = false,
      fullWidth = false,
      startIcon,
      endIcon,
      component: Component = 'button',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const buttonStyles = css`
      ${getBaseStyles(theme)}
      ${getVariantStyles(theme, variant, color)}
  ${getSizeStyles(theme, size)}
  ${fullWidth && 'width: 100%;'}
  ${loading && 'opacity: 0.7; cursor: not-allowed;'}
  font-weight: ${theme.typography.fontWeights.medium};
    `;

    // Props HTML valid
    const buttonProps = {
      css: buttonStyles,
      ref,
      disabled: disabled || loading,
      className,
      ...props,
    };

    return (
      <Component {...buttonProps}>
        <ContainerStyled theme={theme} size={size}>
          {startIcon && <span>{startIcon}</span>}
          {loading ? 'Loading...' : children}
          {endIcon && <span>{endIcon}</span>}
        </ContainerStyled>
      </Component>
    );
  },
);

Button.displayName = 'Button';
export default Button;
