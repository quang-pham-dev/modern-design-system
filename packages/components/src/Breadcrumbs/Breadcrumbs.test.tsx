import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Breadcrumbs } from './index';
import { ThemeProvider } from '@modern-design-system/theme';

describe('Breadcrumbs', () => {
  test('renders breadcrumbs with correct items', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs>
          <span>Home</span>
          <span>Category</span>
          <span>Product</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
  });

  test('renders with default separator', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs>
          <span>Home</span>
          <span>Category</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('/')).toBeInTheDocument();
  });

  test('renders with custom separator', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs separator=">">
          <span>Home</span>
          <span>Category</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('>')).toBeInTheDocument();
  });

  test('renders with maxItems and collapse', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs maxItems={3}>
          <span>Home</span>
          <span>Category</span>
          <span>Subcategory</span>
          <span>Product</span>
          <span>Details</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
  });

  test('renders all items when expanded is true', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs maxItems={3} expanded>
          <span>Home</span>
          <span>Category</span>
          <span>Subcategory</span>
          <span>Product</span>
          <span>Details</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Subcategory')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  test('renders with custom collapse text', () => {
    render(
      <ThemeProvider>
        <Breadcrumbs maxItems={3} collapseText="[...]">
          <span>Home</span>
          <span>Category</span>
          <span>Subcategory</span>
          <span>Product</span>
          <span>Details</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByText('[...]')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Breadcrumbs size="sm" data-testid="breadcrumbs">
          <span>Home</span>
          <span>Category</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Breadcrumbs size="md" data-testid="breadcrumbs">
          <span>Home</span>
          <span>Category</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Breadcrumbs size="lg" data-testid="breadcrumbs">
          <span>Home</span>
          <span>Category</span>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
