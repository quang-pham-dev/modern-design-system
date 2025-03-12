import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const HeaderRoot = styled.header<{ theme: Theme }>`
  padding: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  border-bottom: 1px solid
    ${({ theme }) => getColor(theme, ['gray', '200'], '#E2E8F0')};
`;

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <HeaderRoot ref={ref} theme={theme} {...props}>
        {children}
      </HeaderRoot>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';
