import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';
import { processSxProp } from '@modern-design-system/utils';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';
import { Icon } from '../Icon';

export type TagSize = 'sm' | 'md' | 'lg';
export type TagVariant = 'solid' | 'outline' | 'subtle';
export type TagColorScheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'grey';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The label of the tag
   */
  label: string;
  /**
   * The size of the tag
   * @default 'md'
   */
  size?: TagSize;
  /**
   * The variant of the tag
   * @default 'solid'
   */
  variant?: TagVariant;
  /**
   * The color scheme of the tag
   * @default 'primary'
   */
  colorScheme?: TagColorScheme;
  /**
   * If true, the tag will be rounded
   * @default false
   */
  isRounded?: boolean;
  /**
   * If true, the tag will have a close button
   * @default false
   */
  isClosable?: boolean;
  /**
   * The icon to display before the label
   */
  leftIcon?: string;
  /**
   * The icon to display after the label
   */
  rightIcon?: string;
  /**
   * Callback when the close button is clicked
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const TagRoot = styled.span<{
  size: TagSize;
  variant: TagVariant;
  colorScheme: TagColorScheme;
  isRounded: boolean;
  theme: Theme;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  vertical-align: middle;
  font-weight: 500;
  line-height: 1.2;
  outline: none;
  transition: all 0.2s ease-in-out;

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 24px;
          font-size: 0.75rem;
          padding: 0 8px;
        `;
      case 'lg':
        return css`
          height: 32px;
          font-size: 1rem;
          padding: 0 12px;
        `;
      default: // md
        return css`
          height: 28px;
          font-size: 0.875rem;
          padding: 0 10px;
        `;
    }
  }}

  ${({ isRounded }) =>
    isRounded
      ? css`
          border-radius: 9999px;
        `
      : css`
          border-radius: 4px;
        `}

  ${({ variant, colorScheme, theme }) => {
    const color = theme.colors[colorScheme] || theme.colors.grey;

    // Handle grey color scheme differently since it has a different structure
    const mainColor = 'main' in color ? color.main : color[500];
    const lightColor = 'light' in color ? color.light : color[100];
    const darkColor = 'dark' in color ? color.dark : color[700];
    const contrastTextColor =
      'contrastText' in color ? color.contrastText : '#ffffff';

    switch (variant) {
      case 'outline':
        return css`
          background-color: transparent;
          border: 1px solid ${mainColor};
          color: ${mainColor};
        `;
      case 'subtle':
        return css`
          background-color: ${lightColor};
          color: ${darkColor};
        `;
      default: // solid
        return css`
          background-color: ${mainColor};
          color: ${contrastTextColor};
        `;
    }
  }}
`;

const TagLabel = styled.span`
  margin: 0 4px;
`;

const TagCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  margin-left: 4px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      label,
      size = 'md',
      variant = 'solid',
      colorScheme = 'primary',
      isRounded = false,
      isClosable = false,
      leftIcon,
      rightIcon,
      onClose,
      sx,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.(event);
    };

    return (
      <TagRoot
        ref={ref}
        size={size}
        variant={variant}
        colorScheme={colorScheme}
        isRounded={isRounded}
        theme={theme}
        css={processSxProp(sx)}
        data-testid="tag"
        data-variant={variant}
        data-color-scheme={colorScheme}
        {...props}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14}
            color="inherit"
            data-testid="tag-left-icon"
          />
        )}
        <TagLabel data-testid="tag-label">{label}</TagLabel>
        {rightIcon && (
          <Icon
            name={rightIcon}
            size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14}
            color="inherit"
            data-testid="tag-right-icon"
          />
        )}
        {isClosable && (
          <TagCloseButton onClick={handleClose} data-testid="tag-close-button">
            <Icon
              name="times"
              size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12}
              color="inherit"
            />
          </TagCloseButton>
        )}
      </TagRoot>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
