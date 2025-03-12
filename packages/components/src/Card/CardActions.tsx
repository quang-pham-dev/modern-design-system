import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the actions will be placed at the end of the card
   * @default false
   */
  disableSpacing?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const CardActionsRoot = styled.div<{
  disableSpacing: boolean;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  padding: 8px ${({ disableSpacing }) => (disableSpacing ? '0' : '8px')};

  & > * {
    margin: ${({ disableSpacing }) => (disableSpacing ? '0' : '0 4px')};
  }
`;

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ disableSpacing = false, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <CardActionsRoot
        ref={ref}
        disableSpacing={disableSpacing}
        theme={theme}
        {...props}
      >
        {children}
      </CardActionsRoot>
    );
  },
);

CardActions.displayName = 'CardActions';

export default CardActions;
