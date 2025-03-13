import { forwardRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';
import { processSxProp } from '@modern-design-system/utils';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImageVariant = 'default' | 'rounded' | 'circle';
export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The source URL of the image
   */
  src: string;
  /**
   * The alt text for the image
   */
  alt: string;
  /**
   * The fallback image to display when the main image fails to load
   */
  fallbackSrc?: string;
  /**
   * The placeholder image to display while the main image is loading
   */
  placeholderSrc?: string;
  /**
   * The object-fit property for the image
   * @default 'cover'
   */
  fit?: ImageFit;
  /**
   * The variant of the image
   * @default 'default'
   */
  variant?: ImageVariant;
  /**
   * If true, the image will be lazy loaded
   * @default false
   */
  lazy?: boolean;
  /**
   * If true, the image will be blurred while loading
   * @default false
   */
  blurOnLoad?: boolean;
  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const ImageRoot = styled.div<{
  fit: ImageFit;
  variant: ImageVariant;
  status: ImageLoadingStatus;
  blurOnLoad: boolean;
  theme: Theme;
}>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  ${({ variant }) => {
    switch (variant) {
      case 'rounded':
        return css`
          border-radius: 8px;
        `;
      case 'circle':
        return css`
          border-radius: 50%;
        `;
      default:
        return '';
    }
  }}

  ${({ status, blurOnLoad }) =>
    status === 'loading' && blurOnLoad
      ? css`
          img {
            filter: blur(8px);
            transition: filter 0.3s ease-in-out;
          }
        `
      : ''}
`;

const StyledImage = styled.img<{
  fit: ImageFit;
  variant: ImageVariant;
  status: ImageLoadingStatus;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${({ fit }) => fit};
  opacity: ${({ status }) => (status === 'loaded' ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  ${({ variant }) => {
    switch (variant) {
      case 'rounded':
        return css`
          border-radius: 8px;
        `;
      case 'circle':
        return css`
          border-radius: 50%;
        `;
      default:
        return '';
    }
  }}
`;

const Placeholder = styled.div<{
  status: ImageLoadingStatus;
  theme: Theme;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  opacity: ${({ status }) => (status === 'loaded' ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const ErrorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  color: ${({ theme }) => theme.colors.error.main};
`;

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      placeholderSrc,
      fit = 'cover',
      variant = 'default',
      lazy = false,
      blurOnLoad = false,
      sx,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [status, setStatus] = useState<ImageLoadingStatus>('idle');
    const [currentSrc, setCurrentSrc] = useState<string>(src);

    useEffect(() => {
      setStatus('loading');
      setCurrentSrc(src);
    }, [src]);

    const handleLoad = () => {
      setStatus('loaded');
    };

    const handleError = () => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      } else {
        setStatus('error');
      }
    };

    return (
      <ImageRoot
        css={processSxProp(sx)}
        fit={fit}
        variant={variant}
        status={status}
        blurOnLoad={blurOnLoad}
        theme={theme}
        data-testid="image-root"
      >
        <StyledImage
          ref={ref}
          src={currentSrc}
          alt={alt}
          fit={fit}
          variant={variant}
          status={status}
          loading={lazy ? 'lazy' : undefined}
          onLoad={handleLoad}
          onError={handleError}
          data-testid="image"
          data-fit={fit}
          {...props}
        />
        {status !== 'loaded' && (
          <Placeholder
            status={status}
            theme={theme}
            data-testid="image-placeholder"
          >
            {placeholderSrc && (
              <img src={placeholderSrc} alt="Loading placeholder" />
            )}
          </Placeholder>
        )}
        {status === 'error' && (
          <ErrorOverlay theme={theme} data-testid="image-error">
            <span>Failed to load image</span>
          </ErrorOverlay>
        )}
      </ImageRoot>
    );
  },
);

Image.displayName = 'Image';

export default Image;
