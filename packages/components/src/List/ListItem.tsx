import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';
import type { ListSize } from './List';

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * If true, the list item will be disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the list item will be a button
   * @default false
   */
  button?: boolean;
  /**
   * If true, the list item will not have a divider
   * @default false
   */
  disableDivider?: boolean;
  /**
   * If true, the list item will have dense padding
   * @default false
   */
  dense?: boolean;
  /**
   * The size of the list item
   * @default 'md'
   */
  size?: ListSize;
  /**
   * If true, the list item will be selected
   * @default false
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getListItemStyles = (
  button: boolean,
  disabled: boolean,
  disableDivider: boolean,
  dense: boolean,
  size: ListSize,
  selected: boolean,
  theme: Theme,
) => {
  // Size-based styles
  const sizeStyles = {
    sm: {
      padding: dense ? '4px 16px' : '6px 16px',
      minHeight: dense ? '32px' : '40px',
    },
    md: {
      padding: dense ? '6px 16px' : '8px 16px',
      minHeight: dense ? '40px' : '48px',
    },
    lg: {
      padding: dense ? '8px 16px' : '10px 16px',
      minHeight: dense ? '48px' : '56px',
    },
  };

  return css`
    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    padding: ${sizeStyles[size].padding};
    min-height: ${sizeStyles[size].minHeight};
    box-sizing: border-box;
    text-decoration: none;
    color: ${getColor(theme, ['text', 'primary'], 'rgba(0, 0, 0, 0.87)')};

    ${!disableDivider &&
    css`
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: ${getColor(theme, ['grey', '200'], '#eeeeee')};
      }
    `}

    ${button &&
    css`
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &:hover {
        background-color: ${getColor(
          theme,
          ['action', 'hover'],
          'rgba(0, 0, 0, 0.04)',
        )};
      }

      &:active {
        background-color: ${getColor(
          theme,
          ['action', 'selected'],
          'rgba(0, 0, 0, 0.08)',
        )};
      }
    `}
    
    ${disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
    
    ${selected &&
    css`
      background-color: ${getColor(
        theme,
        ['action', 'selected'],
        'rgba(0, 0, 0, 0.08)',
      )};
    `}
  `;
};

const ListItemRoot = styled.li<{
  button: boolean;
  disabled: boolean;
  disableDivider: boolean;
  dense: boolean;
  size: ListSize;
  selected: boolean;
  theme: Theme;
}>`
  ${({ button, disabled, disableDivider, dense, size, selected, theme }) =>
    getListItemStyles(
      button,
      disabled,
      disableDivider,
      dense,
      size,
      selected,
      theme,
    )}
`;

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      button = false,
      disabled = false,
      disableDivider = false,
      dense = false,
      size = 'md',
      selected = false,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <ListItemRoot
        ref={ref}
        button={button}
        disabled={disabled}
        disableDivider={disableDivider}
        dense={dense}
        size={size}
        selected={selected}
        theme={theme}
        {...props}
      >
        {children}
      </ListItemRoot>
    );
  },
);

ListItem.displayName = 'ListItem';

export default ListItem;
