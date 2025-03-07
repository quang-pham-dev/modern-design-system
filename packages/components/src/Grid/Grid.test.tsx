import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Grid } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Grid Component', () => {
  beforeEach(() => {
    // Setup default mock implementation
    (useTheme as jest.Mock).mockReturnValue({
      theme: {},
    });
  });

  test('renders with default props', () => {
    render(<Grid data-testid="grid">Grid Content</Grid>);
    const element = screen.getByTestId('grid');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Grid Content');
    expect(element).toHaveStyle('display: grid');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref}>Ref Test</Grid>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  test('applies templateColumns style', () => {
    render(
      <Grid data-testid="grid" templateColumns="1fr 1fr 1fr">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('grid-template-columns: 1fr 1fr 1fr');
  });

  test('applies templateRows style', () => {
    render(
      <Grid data-testid="grid" templateRows="auto auto">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('grid-template-rows: auto auto');
  });

  test('applies columnGap style', () => {
    render(
      <Grid data-testid="grid" columnGap="10px">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('column-gap: 10px');
  });

  test('applies rowGap style', () => {
    render(
      <Grid data-testid="grid" rowGap="15px">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('row-gap: 15px');
  });

  test('applies gap style', () => {
    render(
      <Grid data-testid="grid" gap="20px">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('gap: 20px');
  });

  test('applies justifyItems style', () => {
    render(
      <Grid data-testid="grid" justifyItems="center">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('justify-items: center');
  });

  test('applies alignItems style', () => {
    render(
      <Grid data-testid="grid" alignItems="center">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('align-items: center');
  });

  test('applies justifyContent style', () => {
    render(
      <Grid data-testid="grid" justifyContent="space-between">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('justify-content: space-between');
  });

  test('applies alignContent style', () => {
    render(
      <Grid data-testid="grid" alignContent="space-around">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('align-content: space-around');
  });

  test('applies templateAreas style', () => {
    const areas = '"header header" "sidebar content" "footer footer"';
    render(
      <Grid data-testid="grid" templateAreas={areas}>
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle(`grid-template-areas: ${areas}`);
  });

  test('applies autoColumns style', () => {
    render(
      <Grid data-testid="grid" autoColumns="minmax(100px, 1fr)">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('grid-auto-columns: minmax(100px, 1fr)');
  });

  test('applies autoRows style', () => {
    render(
      <Grid data-testid="grid" autoRows="minmax(50px, auto)">
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('grid-auto-rows: minmax(50px, auto)');
  });

  test('applies multiple grid styles together', () => {
    render(
      <Grid
        data-testid="grid"
        templateColumns="repeat(3, 1fr)"
        gap="16px"
        justifyItems="center"
        alignItems="center"
      >
        Grid Content
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('grid-template-columns: repeat(3, 1fr)');
    expect(element).toHaveStyle('gap: 16px');
    expect(element).toHaveStyle('justify-items: center');
    expect(element).toHaveStyle('align-items: center');
  });

  test('inherits Box props correctly', () => {
    render(
      <Grid
        data-testid="grid"
        padding="20px"
        margin="10px"
        backgroundColor="#f0f0f0"
        borderRadius="8px"
      >
        Box Props Test
      </Grid>,
    );
    const element = screen.getByTestId('grid');
    expect(element).toHaveStyle('padding: 20px');
    expect(element).toHaveStyle('margin: 10px');
    expect(element).toHaveStyle('background-color: #f0f0f0');
    expect(element).toHaveStyle('border-radius: 8px');
  });

  test('passes additional props to the root element', () => {
    render(
      <Grid data-testid="custom-grid" className="custom-class">
        Custom Props
      </Grid>,
    );
    const element = screen.getByTestId('custom-grid');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveTextContent('Custom Props');
  });

  test('renders children correctly', () => {
    render(
      <Grid templateColumns="repeat(2, 1fr)" gap="10px">
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
        <div data-testid="child-4">Child 4</div>
      </Grid>,
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
    expect(screen.getByTestId('child-4')).toBeInTheDocument();
  });

  test('applies complex grid layout', () => {
    const templateAreas = '"header header" "sidebar content" "footer footer"';
    render(
      <Grid
        data-testid="complex-grid"
        templateColumns="200px 1fr"
        templateRows="auto 1fr auto"
        templateAreas={templateAreas}
        gap="16px"
      >
        <div style={{ gridArea: 'header' }}>Header</div>
        <div style={{ gridArea: 'sidebar' }}>Sidebar</div>
        <div style={{ gridArea: 'content' }}>Content</div>
        <div style={{ gridArea: 'footer' }}>Footer</div>
      </Grid>,
    );

    const element = screen.getByTestId('complex-grid');
    expect(element).toHaveStyle('grid-template-columns: 200px 1fr');
    expect(element).toHaveStyle('grid-template-rows: auto 1fr auto');
    expect(element).toHaveStyle(`grid-template-areas: ${templateAreas}`);
    expect(element).toHaveStyle('gap: 16px');

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
