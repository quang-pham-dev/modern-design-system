import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Box } from '../Box';

import type { Theme } from '@modern-design-system/theme';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * The title of the alert
   */
  title?: string;
  /**
   * If true, the alert will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If true, the alert will show a close button
   * @default false
   */
  closable?: boolean;
  /**
   * Callback fired when the close button is clicked
   */
  onClose?: () => void;
  /**
   * The content of the alert
   */
  children: React.ReactNode;
}

const AlertRoot = styled.div<{
  variant: AlertVariant;
  fullWidth: boolean;
  theme: Theme;
}>`
  display: flex;
  padding: ${({ theme }) => `${theme.spacing.md}px`};
  border-radius: ${({ theme }) => `${theme.borderRadius.md}px`};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;

  ${({ variant, theme }) => {
    const variantStyles = {
      info: css`
        background-color: ${theme.colors.info.light};
        border-left: 4px solid ${theme.colors.info.main};
        color: ${theme.colors.info.dark};
      `,
      success: css`
        background-color: ${theme.colors.success.light};
        border-left: 4px solid ${theme.colors.success.main};
        color: ${theme.colors.success.dark};
      `,
      warning: css`
        background-color: ${theme.colors.warning.light};
        border-left: 4px solid ${theme.colors.warning.main};
        color: ${theme.colors.warning.dark};
      `,
      error: css`
        background-color: ${theme.colors.error.light};
        border-left: 4px solid ${theme.colors.error.main};
        color: ${theme.colors.error.dark};
      `,
    };

    return variantStyles[variant];
  }}
`;

const AlertContent = styled.div<{
  theme: Theme;
}>`
  flex: 1;
  margin-left: ${({ theme }) => `${theme.spacing.sm}px`};
`;

const CloseButton = styled.button<{
  theme: Theme;
}>`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => `${theme.spacing.xs}px`};
  right: ${({ theme }) => `${theme.spacing.xs}px`};
  padding: ${({ theme }) => `${theme.spacing.xs}px`};
  color: inherit;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const getAlertIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'info':
      return 'info-circle';
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-triangle';
    case 'error':
      return 'exclamation-circle';
    default:
      return 'info-circle';
  }
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      fullWidth = false,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <AlertRoot
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        theme={theme}
        role="alert"
        {...props}
      >
        <Box display="flex" alignItems="flex-start">
          <Icon name={getAlertIcon(variant)} size="md" />
        </Box>
        <AlertContent theme={theme}>
          {title && (
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          )}
          <Typography variant="body2">{children}</Typography>
        </AlertContent>
        {closable && (
          <CloseButton onClick={onClose} aria-label="Close alert" theme={theme}>
            <Icon name="times" size="sm" />
          </CloseButton>
        )}
      </AlertRoot>
    );
  },
);

Alert.displayName = 'Alert';

export default Alert;
