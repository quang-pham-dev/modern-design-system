import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { processSxProp } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

// Define the props for the styled component
interface TableHeadRootProps {
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const TableHeadRoot = styled.thead<TableHeadRootProps>`
  ${({ sx }) => processSxProp(sx)}
`;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <TableHeadRoot ref={ref} {...props}>
        {children}
      </TableHeadRoot>
    );
  },
);

TableHead.displayName = 'TableHead';

export default TableHead;
