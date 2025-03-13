import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor, processSxProp } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';
import type { SerializedStyles } from '@emotion/react';

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getTableFooterStyles = (theme: Theme) => {
  return css`
    background-color: ${getColor(theme, ['grey', '50'], '#fafafa')};
  `;
};

const TableFooterRoot = styled.tfoot<{
  theme: Theme;
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}>`
  ${({ theme }) => getTableFooterStyles(theme)}
  ${({ sx }) => processSxProp(sx)}
`;

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ children, ...props }, ref) => {
  const { theme } = useTheme();

  return (
    <TableFooterRoot ref={ref} theme={theme} {...props}>
      {children}
    </TableFooterRoot>
  );
});

TableFooter.displayName = 'TableFooter';

export default TableFooter;
