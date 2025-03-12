import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';
import type { SerializedStyles } from '@emotion/react';
import { processSxProp } from './helper';

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * If true, the row will be highlighted as selected
   * @default false
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

interface TableRowRootProps {
  selected: boolean;
  theme: Theme;
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getTableRowStyles = (selected: boolean, theme: Theme) => {
  return css`
    ${selected &&
    css`
      background-color: ${getColor(
        theme,
        ['primary', '50'],
        '#e3f2fd',
      )} !important;
    `}
  `;
};

const TableRowRoot = styled.tr<TableRowRootProps>`
  ${({ selected, theme }) => getTableRowStyles(selected, theme)}
  ${({ sx }) => processSxProp(sx)}
`;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ selected = false, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <TableRowRoot ref={ref} selected={selected} theme={theme} {...props}>
        {children}
      </TableRowRoot>
    );
  },
);

TableRow.displayName = 'TableRow';

export default TableRow;
