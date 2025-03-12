import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image URL
   */
  image?: string;
  /**
   * The alt text for the image
   */
  alt?: string;
  /**
   * The height of the media
   */
  height?: string | number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const CardMediaRoot = styled.div<{
  image?: string;
  height?: string | number;
  theme: Theme;
}>`
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : (height ?? '0')};
  display: block;
  width: 100%;
`;

const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ image, alt, height = 200, children, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <CardMediaRoot
        ref={ref}
        image={image}
        height={height}
        theme={theme}
        role={image ? 'img' : undefined}
        aria-label={alt}
        {...props}
      >
        {children}
      </CardMediaRoot>
    );
  },
);

CardMedia.displayName = 'CardMedia';

export default CardMedia;
