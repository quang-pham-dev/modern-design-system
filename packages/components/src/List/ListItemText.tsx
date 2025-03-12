import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export interface ListItemTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The primary text
   */
  primary?: React.ReactNode;
  /**
   * The secondary text
   */
  secondary?: React.ReactNode;
  /**
   * If true, the primary text will be displayed in a single line
   * @default false
   */
  noWrap?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const ListItemTextRoot = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const Primary = styled.span<{
  noWrap: boolean;
  theme: Theme;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  color: ${({ theme }) =>
    getColor(theme, ['text', 'primary'], 'rgba(0, 0, 0, 0.87)')};

  ${({ noWrap }) =>
    noWrap &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

const Secondary = styled.span<{
  noWrap: boolean;
  theme: Theme;
}>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: 0.875rem;
  line-height: 1.43;
  display: block;
  color: ${({ theme }) =>
    getColor(theme, ['text', 'secondary'], 'rgba(0, 0, 0, 0.6)')};

  ${({ noWrap }) =>
    noWrap &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(
  ({ primary, secondary, noWrap = false, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <ListItemTextRoot ref={ref} {...props}>
        {primary && (
          <Primary noWrap={noWrap} theme={theme}>
            {primary}
          </Primary>
        )}
        {secondary && (
          <Secondary noWrap={noWrap} theme={theme}>
            {secondary}
          </Secondary>
        )}
      </ListItemTextRoot>
    );
  },
);

ListItemText.displayName = 'ListItemText';

export default ListItemText;
