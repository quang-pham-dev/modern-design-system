import { Children, forwardRef, Fragment } from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export type BreadcrumbsSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content of the component
   */
  children: React.ReactNode;
  /**
   * Custom separator between breadcrumbs
   * @default '/'
   */
  separator?: React.ReactNode;
  /**
   * Maximum number of items to display
   * @default undefined
   */
  maxItems?: number;
  /**
   * If true, the collapsed items will be shown
   * @default false
   */
  expanded?: boolean;
  /**
   * Custom collapse text
   * @default '...'
   */
  collapseText?: string;
  /**
   * The size of the breadcrumbs
   * @default 'md'
   */
  size?: BreadcrumbsSize;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

const BreadcrumbsRoot = styled.nav<{
  size: BreadcrumbsSize;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return theme.typography.fontSizes.sm;
      case 'lg':
        return theme.typography.fontSizes.lg;
      case 'md':
        return theme.typography.fontSizes.base;
      default:
        return theme.typography.fontSizes.base;
    }
  }};
  color: ${({ theme }) => getColor(theme, ['text', 'primary'], '#000000')};
`;

const BreadcrumbSeparator = styled.li<{
  size: BreadcrumbsSize;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  margin: 0
    ${({ size }) => (size === 'sm' ? '4px' : size === 'md' ? '8px' : '12px')};
  color: ${({ theme }) => getColor(theme, ['text', 'secondary'], '#666666')};
  user-select: none;
`;

const BreadcrumbItem = styled.li<{
  isLast: boolean;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  color: ${({ isLast, theme }) =>
    isLast
      ? getColor(theme, ['text', 'primary'], '#000000')
      : getColor(theme, ['text', 'secondary'], '#666666')};
  font-weight: ${({ isLast }) => (isLast ? '500' : '400')};

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: ${({ isLast }) => (isLast ? 'none' : 'underline')};
    }
  }
`;

const BreadcrumbsList = styled.ol`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CollapsedItem = styled.li<{
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => getColor(theme, ['text', 'secondary'], '#666666')};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
      separator = '/',
      maxItems,
      expanded = false,
      collapseText = '...',
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const childrenArray = Children.toArray(children).filter(Boolean);
    const itemsBeforeCollapse = 1;
    const itemsAfterCollapse = 1;

    const renderItemsBeforeAndAfter = () => {
      const allItems = childrenArray.map((child, index) => {
        const isLast = index === childrenArray.length - 1;

        return (
          <Fragment key={`breadcrumb${index.toString()}`}>
            <BreadcrumbItem isLast={isLast} theme={theme}>
              {child}
            </BreadcrumbItem>
            {!isLast && (
              <BreadcrumbSeparator aria-hidden size={size} theme={theme}>
                {separator}
              </BreadcrumbSeparator>
            )}
          </Fragment>
        );
      });

      return allItems;
    };

    const renderItemsWithCollapse = () => {
      const items = [];

      // First item
      const firstItems = childrenArray.slice(0, itemsBeforeCollapse);
      firstItems.forEach((child, index) => {
        items.push(
          <BreadcrumbItem
            key={`first-${index.toString()}`}
            isLast={false}
            theme={theme}
          >
            {child}
          </BreadcrumbItem>,
        );
        items.push(
          <BreadcrumbSeparator
            key={`first-separator-${index.toString()}`}
            aria-hidden
            size={size}
            theme={theme}
          >
            {separator}
          </BreadcrumbSeparator>,
        );
      });

      // Collapsed items
      items.push(
        <CollapsedItem key="collapsed" theme={theme}>
          {collapseText}
        </CollapsedItem>,
      );
      items.push(
        <BreadcrumbSeparator
          key="collapsed-separator"
          aria-hidden
          size={size}
          theme={theme}
        >
          {separator}
        </BreadcrumbSeparator>,
      );

      // Last items
      const lastItems = childrenArray.slice(
        childrenArray.length - itemsAfterCollapse,
        childrenArray.length,
      );
      lastItems.forEach((child, index) => {
        const isLast = index === lastItems.length - 1;

        items.push(
          <BreadcrumbItem
            key={`last-${index.toString()}`}
            isLast={isLast}
            theme={theme}
          >
            {child}
          </BreadcrumbItem>,
        );
        if (!isLast) {
          items.push(
            <BreadcrumbSeparator
              key={`last-separator-${index.toString()}`}
              aria-hidden
              size={size}
              theme={theme}
            >
              {separator}
            </BreadcrumbSeparator>,
          );
        }
      });

      return items;
    };

    const shouldRenderItemsWithCollapse =
      maxItems != null &&
      !expanded &&
      maxItems > itemsBeforeCollapse + itemsAfterCollapse &&
      maxItems < childrenArray.length;

    return (
      <BreadcrumbsRoot
        ref={ref}
        aria-label="breadcrumb"
        size={size}
        theme={theme}
        {...props}
      >
        <BreadcrumbsList>
          {shouldRenderItemsWithCollapse
            ? renderItemsWithCollapse()
            : renderItemsBeforeAndAfter()}
        </BreadcrumbsList>
      </BreadcrumbsRoot>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
