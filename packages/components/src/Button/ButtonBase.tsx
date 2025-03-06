import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type React from 'react';

import type { Theme } from '@modern-design-system/theme';

/**
 * ButtonBaseProps interface
 * @interface ButtonBaseProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
export interface ButtonBaseProps
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
}

/**
 * Base button styles applied to all button variants
 * @param {Theme} theme - The current theme object
 * @returns {ReturnType<typeof css>} - Emotion CSS styles
 */
const buttonBaseStyles = (theme: Theme): ReturnType<typeof css> => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: none;
  text-decoration: none;
  outline: none;
  user-select: none;
  transition: all 0.2s ease-in-out;

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
 * Styled button component with theme-aware styling
 */
const StyledButtonBase = styled.button<{ theme: Theme }>`
  ${(props) => buttonBaseStyles(props.theme)}
`;

/**
 * ButtonBase Component
 *
 * A foundational button component that provides core button functionality and styling.
 * It serves as the base for all button variants in the design system.
 *
 * Features:
 * - Fully accessible and keyboard navigable
 * - Supports custom component rendering via the component prop
 * - Forwards refs to the root element
 * - Applies consistent styling across all button variants
 *
 * @example
 * ```tsx
 * <ButtonBase onClick={handleClick}>Click me</ButtonBase>
 *
 * // With custom component
 * <ButtonBase component={Link} to="/home">Home</ButtonBase>
 * ```
 */
const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ component = 'button', children, ...props }, ref) => {
    const Component = component || StyledButtonBase;

    // Check if Component is a valid element
    if (typeof Component !== 'string' && Component !== StyledButtonBase) {
      return null;
    }

    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
