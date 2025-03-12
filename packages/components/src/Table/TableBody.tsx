import { forwardRef } from 'react';
import styled from '@emotion/styled';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { processSxProp } from './helper';

type SxProp = React.CSSProperties | SerializedStyles | Record<string, unknown>;

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: SxProp;
}

const TableBodyRoot = styled.tbody<{
  sx?: SxProp;
}>`
  ${({ sx }) => processSxProp(sx)}
`;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <TableBodyRoot ref={ref} {...props}>
        {children}
      </TableBodyRoot>
    );
  },
);

TableBody.displayName = 'TableBody';

export default TableBody;
