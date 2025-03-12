import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const FooterRoot = styled.footer<{ theme: Theme }>`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid
    ${({ theme }) => getColor(theme, ['gray', '200'], '#E2E8F0')};
`;

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <FooterRoot ref={ref} theme={theme} {...props}>
        {children}
      </FooterRoot>
    );
  },
);

ModalFooter.displayName = 'ModalFooter';
