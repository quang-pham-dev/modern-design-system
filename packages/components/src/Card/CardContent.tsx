import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const CardContentRoot = styled.div<{
  theme: Theme;
}>`
  padding: 16px;

  &:last-child {
    padding-bottom: 24px;
  }
`;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <CardContentRoot ref={ref} theme={theme} {...props}>
        {children}
      </CardContentRoot>
    );
  },
);

CardContent.displayName = 'CardContent';

export default CardContent;
