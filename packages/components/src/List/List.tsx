import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type ListVariant = 'standard' | 'outlined' | 'contained';
export type ListSize = 'sm' | 'md' | 'lg';
export type ListDensity = 'default' | 'compact' | 'comfortable';

// Define a type for the props we're passing to children
export interface ListItemCommonProps {
  disableDivider?: boolean;
  size?: ListSize;
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * The variant of the list
   * @default 'standard'
   */
  variant?: ListVariant;
  /**
   * The size of the list
   * @default 'md'
   */
  size?: ListSize;
  /**
   * The density of the list
   * @default 'default'
   */
  density?: ListDensity;
  /**
   * If true, the list will have no padding
   * @default false
   */
  disablePadding?: boolean;
  /**
   * If true, the list items will not have dividers
   * @default false
   */
  disableDivider?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getListStyles = (
  variant: ListVariant,
  size: ListSize,
  density: ListDensity,
  disablePadding: boolean,
  theme: Theme,
) => {
  // Size-based styles
  const sizeStyles = {
    sm: {
      fontSize: '0.875rem',
    },
    md: {
      fontSize: '1rem',
    },
    lg: {
      fontSize: '1.125rem',
    },
  };

  // Density-based styles
  const densityStyles = {
    default: {
      padding: disablePadding ? '0' : '8px 0',
    },
    compact: {
      padding: disablePadding ? '0' : '4px 0',
    },
    comfortable: {
      padding: disablePadding ? '0' : '12px 0',
    },
  };

  // Variant-based styles
  const variantStyles = {
    standard: css`
      background-color: transparent;
    `,
    outlined: css`
      background-color: transparent;
      border: 1px solid ${getColor(theme, ['grey', '300'], '#e0e0e0')};
      border-radius: ${theme.borderRadius.sm || '4px'};
    `,
    contained: css`
      background-color: ${getColor(theme, ['grey', '100'], '#f5f5f5')};
      border-radius: ${theme.borderRadius.sm || '4px'};
    `,
  };

  return css`
    list-style: none;
    margin: 0;
    padding: ${densityStyles[density].padding};
    position: relative;
    font-family: ${theme.typography.fontFamily};
    ${sizeStyles[size]}
    ${variantStyles[variant]}
  `;
};

const ListRoot = styled.ul<{
  variant: ListVariant;
  size: ListSize;
  density: ListDensity;
  disablePadding: boolean;
  theme: Theme;
}>`
  ${({ variant, size, density, disablePadding, theme }) =>
    getListStyles(variant, size, density, disablePadding, theme)}
`;

export const List = forwardRef<HTMLUListElement, ListProps>(
  (
    {
      variant = 'standard',
      size = 'md',
      density = 'default',
      disablePadding = false,
      disableDivider = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Pass disableDivider to children with proper typing
    const childrenWithProps = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child as ReactElement<ListItemCommonProps>, {
          disableDivider,
          size,
        });
      }
      return child;
    });

    return (
      <ListRoot
        ref={ref}
        variant={variant}
        size={size}
        density={density}
        disablePadding={disablePadding}
        theme={theme}
        {...props}
      >
        {childrenWithProps}
      </ListRoot>
    );
  },
);

List.displayName = 'List';

export default List;
