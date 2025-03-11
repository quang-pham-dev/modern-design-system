import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

import { Skeleton } from './Skeleton';
import { ThemeProvider } from '@modern-design-system/theme';

describe('Skeleton Component', () => {
  test('renders with default props', () => {
    render(
      <ThemeProvider>
        <Skeleton data-testid="skeleton" />
      </ThemeProvider>,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  test('renders with custom width and height', () => {
    render(
      <ThemeProvider>
        <Skeleton width={200} height={100} data-testid="skeleton" />
      </ThemeProvider>,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('width: 200px');
    expect(skeleton).toHaveStyle('height: 100px');
  });

  test('renders with string width and height', () => {
    render(
      <ThemeProvider>
        <Skeleton width="50%" height="10rem" data-testid="skeleton" />
      </ThemeProvider>,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle('width: 50%');
    expect(skeleton).toHaveStyle('height: 10rem');
  });

  test('renders different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Skeleton variant="text" data-testid="skeleton" />
      </ThemeProvider>,
    );

    let skeleton = screen.getByTestId('skeleton');
    // Text variant should have a default height of 1em
    expect(skeleton).toHaveStyle('height: 1em');

    rerender(
      <ThemeProvider>
        <Skeleton variant="rectangular" data-testid="skeleton" />
      </ThemeProvider>,
    );

    skeleton = screen.getByTestId('skeleton');
    // Rectangular variant should have no border-radius
    expect(skeleton).toHaveStyle('border-radius: 0px');

    rerender(
      <ThemeProvider>
        <Skeleton variant="circular" data-testid="skeleton" />
      </ThemeProvider>,
    );

    skeleton = screen.getByTestId('skeleton');
    // Circular variant should have 50% border-radius
    expect(skeleton).toHaveStyle('border-radius: 50%');

    rerender(
      <ThemeProvider>
        <Skeleton variant="rounded" data-testid="skeleton" />
      </ThemeProvider>,
    );

    skeleton = screen.getByTestId('skeleton');
    // Rounded variant should have some border-radius
    expect(skeleton).not.toHaveStyle('border-radius: 0px');
    expect(skeleton).not.toHaveStyle('border-radius: 50%');
  });

  test('applies different animations', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Skeleton animation="pulse" data-testid="skeleton" />
      </ThemeProvider>,
    );

    // Animation testing is limited in JSDOM, but we can check that the component renders
    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Skeleton animation="wave" data-testid="skeleton" />
      </ThemeProvider>,
    );

    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Skeleton animation="none" data-testid="skeleton" />
      </ThemeProvider>,
    );

    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
  });
});
