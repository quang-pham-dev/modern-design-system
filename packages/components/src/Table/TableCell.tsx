import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';
import type { SerializedStyles } from '@emotion/react';
import { processSxProp } from './helper';

export type TableCellAlign = 'left' | 'center' | 'right';

type SxProp = React.CSSProperties | SerializedStyles | Record<string, unknown>;

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * If true, the cell will be rendered as a header cell (th)
   * @default false
   */
  header?: boolean;
  /**
   * The alignment of the cell content
   * @default 'left'
   */
  align?: TableCellAlign;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: SxProp;
}

const getCellStyles = (align: TableCellAlign) => {
  return css`
    text-align: ${align};
  `;
};

const CellRoot = styled.td<{
  align: TableCellAlign;
  theme: Theme;
  sx?: SxProp;
}>`
  ${({ align }) => getCellStyles(align)}
  ${({ sx }) => processSxProp(sx)}
`;

const HeaderCellRoot = styled.th<{
  align: TableCellAlign;
  theme: Theme;
}>`
  ${({ align }) => getCellStyles(align)}
`;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ header = false, align = 'left', children, ...props }, ref) => {
    const { theme } = useTheme();

    if (header) {
      return (
        <HeaderCellRoot
          ref={ref}
          align={align}
          theme={theme}
          data-align={align}
          {...props}
        >
          {children}
        </HeaderCellRoot>
      );
    }

    return (
      <CellRoot
        ref={ref}
        align={align}
        theme={theme}
        data-align={align}
        {...props}
      >
        {children}
      </CellRoot>
    );
  },
);

TableCell.displayName = 'TableCell';

export default TableCell;
