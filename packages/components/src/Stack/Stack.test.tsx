import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { Stack } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

// Create a wrapper component that provides the theme context
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

describe('Stack Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        colors: {
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
          },
        },
        borderRadius: {
          sm: 4,
        },
      },
    });
  });

  test('renders correctly with default props', () => {
    render(
      <Stack data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Check default styling (vertical direction)
    expect(stack).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  test('renders with vertical direction', () => {
    render(
      <Stack direction="vertical" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({
      flexDirection: 'column',
    });
  });

  test('renders with horizontal direction', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({
      flexDirection: 'row',
    });
  });

  test('applies custom spacing', () => {
    render(
      <Stack spacing="16px" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({
      gap: '16px',
    });
  });

  test('applies numeric spacing', () => {
    render(
      <Stack spacing={16} data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({
      gap: '16',
    });
  });

  test('wraps children when shouldWrapChildren is true', () => {
    const { container } = render(
      <Stack shouldWrapChildren data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if children are wrapped in divs
    const wrappedItems = container.querySelectorAll(
      '[data-testid="stack"] > div',
    );
    expect(wrappedItems.length).toBe(2);

    // Check that the wrapped items contain the original content
    expect(wrappedItems[0]).toHaveTextContent('Item 1');
    expect(wrappedItems[1]).toHaveTextContent('Item 2');
  });

  test('renders divider between items', () => {
    render(
      <Stack divider={<hr data-testid="divider" />} data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if dividers are rendered
    const dividers = screen.getAllByTestId('divider');
    expect(dividers.length).toBe(2); // 2 dividers for 3 items

    // Check the order of elements
    const stack = screen.getByTestId('stack');
    const children = Array.from(stack.children);

    expect(children[0]).toHaveTextContent('Item 1');
    expect(children[1]).toHaveAttribute('data-testid', 'divider');
    expect(children[2]).toHaveTextContent('Item 2');
    expect(children[3]).toHaveAttribute('data-testid', 'divider');
    expect(children[4]).toHaveTextContent('Item 3');
  });

  test('does not render divider after the last item', () => {
    render(
      <Stack divider={<hr data-testid="divider" />} data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if only one divider is rendered
    const dividers = screen.getAllByTestId('divider');
    expect(dividers.length).toBe(1);

    // Check the order of elements
    const stack = screen.getByTestId('stack');
    const children = Array.from(stack.children);

    expect(children[0]).toHaveTextContent('Item 1');
    expect(children[1]).toHaveAttribute('data-testid', 'divider');
    expect(children[2]).toHaveTextContent('Item 2');
    expect(children.length).toBe(3); // No divider after last item
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Stack ref={ref} data-testid="stack">
        <div>Item 1</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('stack'));
  });

  test('applies additional styling props', () => {
    render(
      <Stack
        data-testid="stack"
        className="custom-class"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>Item 1</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('custom-class');
    expect(stack).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'space-between',
    });
  });

  test('filters out invalid children', () => {
    render(
      <Stack data-testid="stack">
        <div>Item 1</div>
        {null}
        {undefined}
        {false}
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if only valid children are rendered
    const stack = screen.getByTestId('stack');
    const children = Array.from(stack.children);

    expect(children.length).toBe(2);
    expect(children[0]).toHaveTextContent('Item 1');
    expect(children[1]).toHaveTextContent('Item 2');
  });

  test('handles string and number children', () => {
    render(
      <Stack data-testid="stack">
        <div>Item 1</div>
        {'String child'}
        {42}
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if string and number children are rendered
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveTextContent('Item 1');
    expect(stack).toHaveTextContent('String child');
    expect(stack).toHaveTextContent('42');
  });

  test('combines shouldWrapChildren with divider', () => {
    render(
      <Stack
        shouldWrapChildren
        divider={<hr data-testid="divider" />}
        data-testid="stack"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
      { wrapper: Wrapper },
    );

    // Check if children are wrapped and dividers are rendered
    const stack = screen.getByTestId('stack');
    const children = Array.from(stack.children);

    // Should have 3 children: wrapped div, divider, wrapped div
    expect(children.length).toBe(3);
    expect(children[0]).toContainHTML('Item 1');
    expect(children[1]).toHaveAttribute('data-testid', 'divider');
    expect(children[2]).toContainHTML('Item 2');
  });
});
