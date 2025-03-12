import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationVariant = 'filled' | 'outlined' | 'text';
export type PaginationShape = 'rounded' | 'circular' | 'square';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The total number of pages
   */
  count: number;
  /**
   * The current page
   * @default 1
   */
  page?: number;
  /**
   * Callback fired when the page is changed
   */
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  /**
   * If true, the component is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The size of the pagination component
   * @default 'md'
   */
  size?: PaginationSize;
  /**
   * The shape of the pagination items
   * @default 'circular'
   */
  shape?: PaginationShape;
  /**
   * The variant to use
   * @default 'outlined'
   */
  variant?: PaginationVariant;
  /**
   * If true, hide the next-page button
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If true, hide the previous-page button
   * @default false
   */
  hidePrevButton?: boolean;
  /**
   * If true, hide the first-page button
   * @default false
   */
  hideFirstButton?: boolean;
  /**
   * If true, hide the last-page button
   * @default false
   */
  hideLastButton?: boolean;
  /**
   * Number of always visible pages at the beginning and end
   * @default 1
   */
  boundaryCount?: number;
  /**
   * Number of always visible pages before and after the current page
   * @default 1
   */
  siblingCount?: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const PaginationRoot = styled.nav<{
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const getItemStyles = (
  variant: PaginationVariant,
  size: PaginationSize,
  shape: PaginationShape,
  selected: boolean,
  disabled: boolean,
  theme: Theme,
) => {
  const baseSize = size === 'sm' ? '30px' : size === 'md' ? '36px' : '42px';
  const fontSize =
    size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : '1rem';
  const borderRadius =
    shape === 'circular' ? '50%' : shape === 'rounded' ? '4px' : '0';

  const baseStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${baseSize};
    height: ${baseSize};
    font-size: ${fontSize};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.5 : 1};
    transition: all 0.2s ease;
    margin: 0 2px;
    border-radius: ${borderRadius};
    user-select: none;
  `;

  if (variant === 'filled') {
    return css`
      ${baseStyles}
      background-color: ${selected
        ? getColor(theme, ['primary', 'main'], '#1976d2')
        : 'transparent'};
      color: ${selected
        ? getColor(theme, ['primary', 'contrastText'], '#ffffff')
        : getColor(theme, ['text', 'primary'], '#000000')};

      &:hover {
        background-color: ${disabled || selected
          ? undefined
          : getColor(theme, ['grey', '200'], '#eeeeee')};
      }
    `;
  }

  if (variant === 'outlined') {
    return css`
      ${baseStyles}
      border: 1px solid ${selected
        ? getColor(theme, ['primary', 'main'], '#1976d2')
        : getColor(theme, ['grey', '300'], '#e0e0e0')};
      color: ${selected
        ? getColor(theme, ['primary', 'main'], '#1976d2')
        : getColor(theme, ['text', 'primary'], '#000000')};

      &:hover {
        background-color: ${disabled
          ? undefined
          : getColor(theme, ['grey', '100'], '#f5f5f5')};
      }
    `;
  }

  // text variant
  return css`
    ${baseStyles}
    color: ${selected
      ? getColor(theme, ['primary', 'main'], '#1976d2')
      : getColor(theme, ['text', 'primary'], '#000000')};
    font-weight: ${selected ? '600' : '400'};

    &:hover {
      background-color: ${disabled
        ? undefined
        : getColor(theme, ['grey', '100'], '#f5f5f5')};
    }
  `;
};

const PaginationItem = styled.li<{
  variant: PaginationVariant;
  size: PaginationSize;
  shape: PaginationShape;
  selected: boolean;
  disabled: boolean;
  theme: Theme;
}>`
  ${({ variant, size, shape, selected, disabled, theme }) =>
    getItemStyles(variant, size, shape, selected, disabled, theme)}
`;

const Ellipsis = styled.li<{
  size: PaginationSize;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) =>
    size === 'sm' ? '30px' : size === 'md' ? '36px' : '42px'};
  height: ${({ size }) =>
    size === 'sm' ? '30px' : size === 'md' ? '36px' : '42px'};
  font-size: ${({ size }) =>
    size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : '1rem'};
  color: ${({ theme }) => getColor(theme, ['text', 'secondary'], '#666666')};
  user-select: none;
`;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      count,
      page = 1,
      onChange,
      disabled = false,
      size = 'md',
      shape = 'circular',
      variant = 'outlined',
      hideNextButton = false,
      hidePrevButton = false,
      hideFirstButton = false,
      hideLastButton = false,
      boundaryCount = 1,
      siblingCount = 1,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const handleClick = (
      event: React.MouseEvent<HTMLLIElement>,
      value: number,
    ) => {
      if (disabled) return;
      if (onChange) {
        onChange(event as unknown as React.ChangeEvent<unknown>, value);
      }
    };

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(
      Math.max(count - boundaryCount + 1, boundaryCount + 1),
      count,
    );

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? (endPages[0] ?? 1) - 2 : count - 1,
    );

    const itemList = [
      ...(hideFirstButton ? [] : ['first']),
      ...(hidePrevButton ? [] : ['previous']),
      ...startPages,
      ...(siblingsStart > boundaryCount + 2
        ? ['start-ellipsis']
        : boundaryCount + 1 < count - boundaryCount
          ? [boundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < count - boundaryCount - 1
        ? ['end-ellipsis']
        : count - boundaryCount > boundaryCount
          ? [count - boundaryCount]
          : []),
      ...endPages,
      ...(hideNextButton ? [] : ['next']),
      ...(hideLastButton ? [] : ['last']),
    ];

    return (
      <PaginationRoot
        ref={ref as React.RefObject<HTMLElement>}
        theme={theme}
        {...props}
      >
        <PaginationList>
          {itemList.map((item, index) => {
            if (item === 'first') {
              return (
                <PaginationItem
                  key={`first-${index.toString()}`}
                  variant={variant}
                  size={size}
                  shape={shape}
                  selected={false}
                  disabled={disabled || page === 1}
                  theme={theme}
                  onClick={(e) => handleClick(e, 1)}
                  aria-label="Go to first page"
                >
                  {'<<'}
                </PaginationItem>
              );
            }

            if (item === 'previous') {
              return (
                <PaginationItem
                  key={`previous-${index.toString()}`}
                  variant={variant}
                  size={size}
                  shape={shape}
                  selected={false}
                  disabled={disabled || page === 1}
                  theme={theme}
                  onClick={(e) => handleClick(e, page - 1)}
                  aria-label="Go to previous page"
                >
                  {'<'}
                </PaginationItem>
              );
            }

            if (item === 'start-ellipsis' || item === 'end-ellipsis') {
              return (
                <Ellipsis
                  key={`ellipsis-${index.toString()}`}
                  size={size}
                  theme={theme}
                >
                  {'...'}
                </Ellipsis>
              );
            }

            if (item === 'next') {
              return (
                <PaginationItem
                  key={`next-${index.toString()}`}
                  variant={variant}
                  size={size}
                  shape={shape}
                  selected={false}
                  disabled={disabled || page === count}
                  theme={theme}
                  onClick={(e) => handleClick(e, page + 1)}
                  aria-label="Go to next page"
                >
                  {'>'}
                </PaginationItem>
              );
            }

            if (item === 'last') {
              return (
                <PaginationItem
                  key={`last-${index.toString()}`}
                  variant={variant}
                  size={size}
                  shape={shape}
                  selected={false}
                  disabled={disabled || page === count}
                  theme={theme}
                  onClick={(e) => handleClick(e, count)}
                  aria-label="Go to last page"
                >
                  {'>>'}
                </PaginationItem>
              );
            }

            return (
              <PaginationItem
                key={`page-${item}`}
                variant={variant}
                size={size}
                shape={shape}
                selected={page === item}
                disabled={disabled}
                theme={theme}
                onClick={(e) => handleClick(e, item as number)}
                aria-label={`Go to page ${item}`}
                aria-current={page === item ? 'page' : undefined}
              >
                {item}
              </PaginationItem>
            );
          })}
        </PaginationList>
      </PaginationRoot>
    );
  },
);

Pagination.displayName = 'Pagination';

export default Pagination;
