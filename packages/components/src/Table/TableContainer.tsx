import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { processSxProp } from './helper';

type SxProp = React.CSSProperties | SerializedStyles | Record<string, unknown>;

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum height of the table container
   */
  maxHeight?: string | number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: SxProp;
}

const TableContainerRoot = styled.div<{
  maxHeight?: string | number;
  sx?: SxProp;
}>`
  width: 100%;
  overflow-x: auto;
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${typeof maxHeight === 'number'
        ? `${maxHeight}px`
        : maxHeight};
      overflow-y: auto;
    `}
  ${({ sx }) => processSxProp(sx)}
`;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ maxHeight, children, ...props }, ref) => {
    return (
      <TableContainerRoot ref={ref} maxHeight={maxHeight} {...props}>
        {children}
      </TableContainerRoot>
    );
  },
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
