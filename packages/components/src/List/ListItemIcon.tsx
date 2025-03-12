import { forwardRef } from 'react';
import styled from '@emotion/styled';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface ListItemIconProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const ListItemIconRoot = styled.div`
  min-width: 56px;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: inherit;
`;

export const ListItemIcon = forwardRef<HTMLDivElement, ListItemIconProps>(
  (props, ref) => {
    return <ListItemIconRoot ref={ref} {...props} />;
  },
);

ListItemIcon.displayName = 'ListItemIcon';

export default ListItemIcon;
