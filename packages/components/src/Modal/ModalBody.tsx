import { forwardRef } from 'react';
import styled from '@emotion/styled';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const BodyRoot = styled.div`
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
`;

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <BodyRoot ref={ref} {...props}>
        {children}
      </BodyRoot>
    );
  },
);

ModalBody.displayName = 'ModalBody';
