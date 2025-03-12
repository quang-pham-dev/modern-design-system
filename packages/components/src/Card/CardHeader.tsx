import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The title of the card
   */
  title?: React.ReactNode;
  /**
   * The subtitle of the card
   */
  subtitle?: React.ReactNode;
  /**
   * The action to display in the card header
   */
  action?: React.ReactNode;
  /**
   * The avatar to display in the card header
   */
  avatar?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const CardHeaderRoot = styled.div<{
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  padding: 16px;

  &:first-of-type {
    padding-top: 16px;
  }

  &:last-child {
    padding-bottom: 16px;
  }
`;

const CardHeaderAvatar = styled.div`
  display: flex;
  margin-right: 16px;
`;

const CardHeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardHeaderTitle = styled.div<{
  theme: Theme;
}>`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg || '1.25rem'};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium || 500};
  color: ${({ theme }) => getColor(theme, ['text', 'primary'], '#000000')};
  margin: 0;
`;

const CardHeaderSubtitle = styled.div<{
  theme: Theme;
}>`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm || '0.875rem'};
  color: ${({ theme }) => getColor(theme, ['text', 'secondary'], '#666666')};
  margin: 0;
  margin-top: 4px;
`;

const CardHeaderAction = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, avatar, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <CardHeaderRoot ref={ref} theme={theme} {...props}>
        {avatar && <CardHeaderAvatar>{avatar}</CardHeaderAvatar>}
        <CardHeaderContent>
          {title && <CardHeaderTitle theme={theme}>{title}</CardHeaderTitle>}
          {subtitle && (
            <CardHeaderSubtitle theme={theme}>{subtitle}</CardHeaderSubtitle>
          )}
          {children}
        </CardHeaderContent>
        {action && <CardHeaderAction>{action}</CardHeaderAction>}
      </CardHeaderRoot>
    );
  },
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
