import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';
import { processSxProp } from '@modern-design-system/utils';
import type { Theme } from '@modern-design-system/theme';
import type { SerializedStyles } from '@emotion/react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
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
  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
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
  line-height: 1;

  ${({ size }) => {
    if (typeof size === 'number') {
      return css`
        width: ${size}px;
        height: ${size}px;
      `;
    }

    const sizeMap = {
      xs: '12px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
    };

    return css`
      width: ${sizeMap[size]};
      height: ${sizeMap[size]};
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
    css`
      animation: icon-spin 2s infinite linear;

      @keyframes icon-spin {
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
    css`
      animation: icon-pulse 1s infinite steps(8);

      @keyframes icon-pulse {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

// SVG paths for icons (viewBox="0 0 24 24" format)
const iconSvgPaths: Record<string, string> = {
  'chevron-down': 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  'chevron-up': 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z',
  'chevron-left': 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  'chevron-right': 'M10.59 6L12 7.41 16.59 12 12 16.59 10.59 18l6-6z',
  'info-circle':
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  'check-circle':
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'exclamation-triangle': 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  'exclamation-circle':
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v10z',
  times:
    'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  spinner: 'M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z',
  check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  'times-circle':
    'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
  bell: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
  envelope:
    'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  cog: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  search:
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  trash:
    'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  upload: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',
  plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  minus: 'M19 13H5v-2h14v2z',
  'book-open':
    'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
  puzzle:
    'M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z',
  palette:
    'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
};

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      name,
      size = 'md',
      color = 'inherit',
      spin = false,
      pulse = false,
      sx,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const iconPath = iconSvgPaths[name] || '';

    return (
      <IconRoot
        ref={ref}
        size={size}
        color={color}
        spin={spin}
        pulse={pulse}
        theme={theme}
        aria-hidden="true"
        css={processSxProp(sx)}
        {...props}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>{iconPath}</title>
          <path d={iconPath} />
        </svg>
      </IconRoot>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
