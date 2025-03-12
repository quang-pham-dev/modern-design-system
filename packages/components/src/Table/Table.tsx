import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';
import type { SerializedStyles } from '@emotion/react';

export type TableVariant = 'standard' | 'outlined' | 'contained';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableDensity = 'default' | 'compact' | 'comfortable';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * The variant of the table
   * @default 'standard'
   */
  variant?: TableVariant;
  /**
   * The size of the table
   * @default 'md'
   */
  size?: TableSize;
  /**
   * The density of the table
   * @default 'default'
   */
  density?: TableDensity;
  /**
   * If true, the table will have zebra striping
   * @default false
   */
  striped?: boolean;
  /**
   * If true, the table will have hover effect on rows
   * @default false
   */
  hover?: boolean;
  /**
   * If true, the table will have borders
   * @default false
   */
  bordered?: boolean;
  /**
   * If true, the table header will be sticky
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getTableStyles = (
  variant: TableVariant,
  size: TableSize,
  density: TableDensity,
  striped: boolean,
  hover: boolean,
  bordered: boolean,
  stickyHeader: boolean,
  theme: Theme,
) => {
  const sizeStyles = {
    sm: {
      fontSize: '0.875rem',
      padding: '0.5rem',
    },
    md: {
      fontSize: '1rem',
      padding: '0.75rem',
    },
    lg: {
      fontSize: '1.125rem',
      padding: '1rem',
    },
  };

  const densityStyles = {
    default: {
      cellPadding: sizeStyles[size].padding,
    },
    compact: {
      cellPadding: `calc(${sizeStyles[size].padding} * 0.75)`,
    },
    comfortable: {
      cellPadding: `calc(${sizeStyles[size].padding} * 1.25)`,
    },
  };

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
      background-color: ${getColor(theme, ['grey', '50'], '#fafafa')};
      border-radius: ${theme.borderRadius.sm || '4px'};
    `,
  };

  return css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: ${theme.typography.fontFamily};
    font-size: ${sizeStyles[size].fontSize};
    ${variantStyles[variant]}

    th, td {
      padding: ${densityStyles[density].cellPadding};
      text-align: left;
      ${bordered &&
      css`
        border: 1px solid ${getColor(theme, ['grey', '300'], '#e0e0e0')};
      `}
    }

    th {
      font-weight: 600;
      color: ${getColor(theme, ['grey', '800'], '#424242')};
      background-color: ${getColor(theme, ['grey', '100'], '#f5f5f5')};
      ${!bordered &&
      css`
        border-bottom: 2px solid ${getColor(theme, ['grey', '300'], '#e0e0e0')};
      `}
      ${stickyHeader &&
      css`
        position: sticky;
        top: 0;
        z-index: 2;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      `}
    }

    tbody {
      tr {
        ${striped &&
        css`
          &:nth-of-type(odd) {
            background-color: ${getColor(theme, ['grey', '50'], '#fafafa')};
          }
        `}

        ${hover &&
        css`
          &:hover {
            background-color: ${getColor(theme, ['primary', '50'], '#e3f2fd')};
          }
        `}

        ${!bordered &&
        css`
          &:not(:last-child) td {
            border-bottom: 1px solid
              ${getColor(theme, ['grey', '200'], '#eeeeee')};
          }
        `}
      }
    }
  `;
};

const TableRoot = styled.table<{
  variant: TableVariant;
  size: TableSize;
  density: TableDensity;
  striped: boolean;
  hover: boolean;
  bordered: boolean;
  stickyHeader: boolean;
  theme: Theme;
}>`
  ${({
    variant,
    size,
    density,
    striped,
    hover,
    bordered,
    stickyHeader,
    theme,
  }) =>
    getTableStyles(
      variant,
      size,
      density,
      striped,
      hover,
      bordered,
      stickyHeader,
      theme,
    )}
`;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'standard',
      size = 'md',
      density = 'default',
      striped = false,
      hover = false,
      bordered = false,
      stickyHeader = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <TableRoot
        ref={ref}
        variant={variant}
        size={size}
        density={density}
        striped={striped}
        hover={hover}
        bordered={bordered}
        stickyHeader={stickyHeader}
        theme={theme}
        data-variant={variant}
        data-size={size}
        data-density={density}
        data-striped={striped ? 'true' : undefined}
        data-hover={hover ? 'true' : undefined}
        data-bordered={bordered ? 'true' : undefined}
        data-sticky-header={stickyHeader ? 'true' : undefined}
        {...props}
      >
        {children}
      </TableRoot>
    );
  },
);

Table.displayName = 'Table';

export default Table;
