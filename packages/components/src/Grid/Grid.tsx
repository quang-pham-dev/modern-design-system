import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Box } from '../Box';

import type { BoxProps } from '../Box';

export interface GridProps extends BoxProps {
  /**
   * Defines the columns of the grid
   * @example "1fr 1fr 1fr" or "repeat(3, 1fr)"
   */
  templateColumns?: string;

  /**
   * Defines the rows of the grid
   * @example "auto auto" or "repeat(2, 100px)"
   */
  templateRows?: string;

  /**
   * Defines the size of the gap between columns
   */
  columnGap?: string | number;

  /**
   * Defines the size of the gap between rows
   */
  rowGap?: string | number;

  /**
   * Shorthand for both columnGap and rowGap
   */
  gap?: string | number;

  /**
   * Defines how the auto-placed items are aligned along the row axis
   */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';

  /**
   * Defines how the auto-placed items are aligned along the column axis
   */
  alignItems?: 'start' | 'end' | 'center' | 'stretch';

  /**
   * Defines how the content is distributed within the grid container along the row axis
   */
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

  /**
   * Defines how the content is distributed within the grid container along the column axis
   */
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'stretch'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';

  /**
   * Defines named grid areas
   */
  templateAreas?: string;

  /**
   * Defines the number of columns in the grid (auto-fill)
   * @example "repeat(auto-fill, minmax(200px, 1fr))"
   */
  autoColumns?: string;

  /**
   * Defines the number of rows in the grid (auto-fill)
   * @example "repeat(auto-fill, minmax(100px, 1fr))"
   */
  autoRows?: string;
}

const StyledGrid = styled(Box)<{
  $templateColumns?: string;
  $templateRows?: string;
  $columnGap?: string | number;
  $rowGap?: string | number;
  $gap?: string | number;
  $justifyItems?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $alignContent?: string;
  $templateAreas?: string;
  $autoColumns?: string;
  $autoRows?: string;
}>`
  display: grid;
  ${({ $templateColumns }) =>
    $templateColumns &&
    css`
      grid-template-columns: ${$templateColumns};
    `}
  ${({ $templateRows }) =>
    $templateRows &&
    css`
      grid-template-rows: ${$templateRows};
    `}
  ${({ $columnGap }) =>
    $columnGap &&
    css`
      column-gap: ${$columnGap};
    `}
  ${({ $rowGap }) =>
    $rowGap &&
    css`
      row-gap: ${$rowGap};
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
  ${({ $justifyItems }) =>
    $justifyItems &&
    css`
      justify-items: ${$justifyItems};
    `}
  ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `}
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `}
  ${({ $alignContent }) =>
    $alignContent &&
    css`
      align-content: ${$alignContent};
    `}
  ${({ $templateAreas }) =>
    $templateAreas &&
    css`
      grid-template-areas: ${$templateAreas};
    `}
  ${({ $autoColumns }) =>
    $autoColumns &&
    css`
      grid-auto-columns: ${$autoColumns};
    `}
  ${({ $autoRows }) =>
    $autoRows &&
    css`
      grid-auto-rows: ${$autoRows};
    `}
`;

/**
 * Grid Component
 *
 * A CSS grid container for creating two-dimensional layouts.
 *
 * @example
 * ```tsx
 * <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      templateColumns,
      templateRows,
      columnGap,
      rowGap,
      gap,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      templateAreas,
      autoColumns,
      autoRows,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledGrid
        ref={ref}
        $templateColumns={templateColumns}
        $templateRows={templateRows}
        $columnGap={columnGap}
        $rowGap={rowGap}
        $gap={gap}
        $justifyItems={justifyItems}
        $alignItems={alignItems}
        $justifyContent={justifyContent}
        $alignContent={alignContent}
        $templateAreas={templateAreas}
        $autoColumns={autoColumns}
        $autoRows={autoRows}
        display="grid"
        {...props}
      >
        {children}
      </StyledGrid>
    );
  },
);

Grid.displayName = 'Grid';

export default Grid;
