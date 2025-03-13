import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor, processSxProp } from '@modern-design-system/utils';
import { useAccordion } from './Accordion';
import { Icon } from '../Icon';
import { Box } from '../Box';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export interface AccordionItemProps {
  /**
   * The title of the accordion item
   */
  title: React.ReactNode;
  /**
   * The content of the accordion item
   */
  children: React.ReactNode;
  /**
   * The index of the accordion item (automatically provided by Accordion)
   */
  index?: number;
  /**
   * Whether the accordion item is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Icon to display before the title
   */
  icon?: React.ReactNode;
  /**
   * Additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
  /**
   * Additional class name
   */
  className?: string;
}

interface StyledHeaderProps {
  theme: Theme;
  isExpanded: boolean;
  isDisabled: boolean;
  size: 'sm' | 'md' | 'lg';
  variant: 'outlined' | 'filled' | 'elevated';
}

interface StyledContentProps {
  theme: Theme;
  isExpanded: boolean;
  size: 'sm' | 'md' | 'lg';
}

const StyledHeader = styled.button<StyledHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: background-color 0.2s ease;
  outline: none;

  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
          font-size: ${theme.typography.fontSizes.sm};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing.lg}px ${theme.spacing.xl}px;
          font-size: ${theme.typography.fontSizes.lg};
        `;
      case 'md':
        return css`
          padding: ${theme.spacing.md}px ${theme.spacing.md}px;
          font-size: ${theme.typography.fontSizes.base};
        `;
      default:
        return css`
          padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
          font-size: ${theme.typography.fontSizes.base};
        `;
    }
  }}

  ${({ variant, theme, isExpanded }) => {
    switch (variant) {
      case 'filled':
        return css`
          background-color: ${isExpanded
            ? getColor(theme, ['gray', '200'], '#E2E8F0')
            : getColor(theme, ['gray', '100'], '#F7FAFC')};
          &:hover:not(:disabled) {
            background-color: ${getColor(theme, ['gray', '200'], '#E2E8F0')};
          }
        `;
      case 'elevated':
        return css`
          background-color: ${isExpanded
            ? getColor(theme, ['gray', '100'], '#F7FAFC')
            : 'white'};
          &:hover:not(:disabled) {
            background-color: ${getColor(theme, ['gray', '100'], '#F7FAFC')};
          }
        `;
      case 'outlined':
        return css`
          background-color: white;
          border-bottom: 1px solid
            ${getColor(theme, ['gray', '200'], '#E2E8F0')};
          &:hover:not(:disabled) {
            background-color: ${getColor(theme, ['gray', '50'], '#F9FAFB')};
          }
        `;
      default:
        return css`
          background-color: white;
          ${getColor(theme, ['gray', '200'], '#E2E8F0')};
          &:hover:not(:disabled) {
            background-color: ${getColor(theme, ['gray', '50'], '#F9FAFB')};
          }
        `;
    }
  }}

  &:focus {
    outline: 2px solid
      ${({ theme }) => getColor(theme, ['blue', '300'], '#63B3ED')};
    outline-offset: -2px;
  }
`;

const StyledContent = styled.div<StyledContentProps>`
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  max-height: ${({ isExpanded }) => (isExpanded ? '1000px' : '0')};
  padding: ${({ isExpanded, size, theme }) => {
    if (!isExpanded) return '0';

    switch (size) {
      case 'sm':
        return `${theme.spacing.sm}px ${theme.spacing.md}px`;
      case 'lg':
        return `${theme.spacing.lg}px ${theme.spacing.xl}px`;
      case 'md':
        return `${theme.spacing.md}px ${theme.spacing.lg}px`;
      default:
        return `${theme.spacing.xl}px ${theme.spacing['2xl']}px`;
    }
  }};
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
        return theme.typography.fontSizes.xl;
    }
  }};
  color: ${({ theme }) => getColor(theme, ['gray', '700'], '#4A5568')};
  border-bottom: ${({ isExpanded, theme }) =>
    isExpanded
      ? `1px solid ${getColor(theme, ['gray', '200'], '#E2E8F0')}`
      : 'none'};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

/**
 * AccordionItem Component
 *
 * A collapsible section within an Accordion component.
 *
 * @example
 * ```tsx
 * <AccordionItem title="Section Title" icon={<Icon name="info" />}>
 *   This is the content of the accordion item.
 * </AccordionItem>
 * ```
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { title, children, index = 0, isDisabled = false, icon, sx, className },
    ref,
  ) => {
    const { theme } = useTheme();
    const { expandedItems, toggleItem, size = 'md', variant } = useAccordion();

    const isExpanded = expandedItems.includes(index);

    const handleToggle = () => {
      if (!isDisabled) {
        toggleItem(index);
      }
    };

    return (
      <Box ref={ref} className={className} css={processSxProp(sx)}>
        <StyledHeader
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-disabled={isDisabled}
          isExpanded={isExpanded}
          isDisabled={isDisabled}
          theme={theme}
          size={size}
          variant={variant}
          data-testid={`accordion-header-${index}`}
        >
          <TitleContainer>
            {icon}
            {title}
          </TitleContainer>
          <IconContainer isExpanded={isExpanded}>
            <Icon name="chevron-down" size={size} />
          </IconContainer>
        </StyledHeader>
        <StyledContent
          isExpanded={isExpanded}
          theme={theme}
          size={size}
          aria-hidden={!isExpanded}
          data-testid={`accordion-content-${index}`}
        >
          {children}
        </StyledContent>
      </Box>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
