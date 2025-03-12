import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * The variant of the avatar
   * @default 'circular'
   */
  variant?: AvatarVariant;
  /**
   * The image source
   */
  src?: string;
  /**
   * The alt text for the image
   */
  alt?: string;
  /**
   * The content to display when image fails to load or no image provided
   */
  children?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const getAvatarStyles = (
  size: AvatarSize,
  variant: AvatarVariant,
  theme: Theme,
) => {
  const dimensions = size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px';
  const fontSize =
    size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : '1.5rem';
  const borderRadius =
    variant === 'circular'
      ? '50%'
      : variant === 'rounded'
        ? theme.borderRadius.xs || '4px'
        : '0';

  return css`
    width: ${dimensions};
    height: ${dimensions};
    font-size: ${fontSize};
    border-radius: ${borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    user-select: none;
    color: ${getColor(theme, ['grey', '100'], '#ffffff')};
    background-color: ${getColor(theme, ['primary', 'main'], '#1976d2')};
    font-family: ${theme.typography.fontFamily};
  `;
};

const AvatarRoot = styled.div<{
  size: AvatarSize;
  variant: AvatarVariant;
  theme: Theme;
}>`
  ${({ size, variant, theme }) => getAvatarStyles(size, variant, theme)}
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
`;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { size = 'md', variant = 'circular', src, alt, children, ...props },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <AvatarRoot
        ref={ref}
        size={size}
        variant={variant}
        theme={theme}
        {...props}
      >
        {src ? (
          <AvatarImg
            src={src}
            alt={alt}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          children
        )}
      </AvatarRoot>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
