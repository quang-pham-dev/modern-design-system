import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import type { Theme } from '@modern-design-system/theme';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The name of the icon
   */
  name: string;
  /**
   * The size of the icon
   * @default 'md'
   */
  size?: IconSize;
  /**
   * The color of the icon
   * @default 'inherit'
   */
  color?: IconColor;
  /**
   * If true, the icon will spin
   * @default false
   */
  spin?: boolean;
  /**
   * If true, the icon will pulse
   * @default false
   */
  pulse?: boolean;
}

const IconRoot = styled.span<{
  size: IconSize;
  color: IconColor;
  spin: boolean;
  pulse: boolean;
  theme: Theme;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;

  ${({ size, theme }) => {
    const sizeMap = {
      xs: theme.typography.fontSizes.xs,
      sm: theme.typography.fontSizes.sm,
      md: theme.typography.fontSizes.base,
      lg: '1.25rem',
      xl: '1.5rem',
    };

    return `
      font-size: ${sizeMap[size]};
      line-height: 1;
    `;
  }}

  ${({ color, theme }) => {
    if (color === 'inherit') {
      return 'color: inherit;';
    }

    return `color: ${theme.colors[color].main};`;
  }}
  
  ${({ spin }) =>
    spin &&
    `
    animation: fa-spin 2s infinite linear;
    
    @keyframes fa-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
  
  ${({ pulse }) =>
    pulse &&
    `
    animation: fa-pulse 1s infinite steps(8);
    
    @keyframes fa-pulse {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`;

// Map of icon names to their unicode values
const iconMap: Record<string, string> = {
  'info-circle': '\uf05a',
  'check-circle': '\uf058',
  'exclamation-triangle': '\uf071',
  'exclamation-circle': '\uf06a',
  times: '\uf00d',
  spinner: '\uf110',
  check: '\uf00c',
  'times-circle': '\uf057',
  bell: '\uf0f3',
  envelope: '\uf0e0',
  user: '\uf007',
  cog: '\uf013',
  search: '\uf002',
  home: '\uf015',
  trash: '\uf1f8',
  edit: '\uf044',
  download: '\uf019',
  upload: '\uf093',
  plus: '\uf067',
  minus: '\uf068',
};

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color = 'inherit',
      spin = false,
      pulse = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const iconContent = iconMap[name] || '';

    return (
      <IconRoot
        ref={ref}
        size={size}
        color={color}
        spin={spin}
        pulse={pulse}
        theme={theme}
        aria-hidden="true"
        {...props}
      >
        {iconContent}
      </IconRoot>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
