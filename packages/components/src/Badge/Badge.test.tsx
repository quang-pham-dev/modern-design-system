import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { Badge } from './Badge';

describe('Badge', () => {
  test('renders badge with content', () => {
    render(
      <ThemeProvider>
        <Badge content={5} data-testid="badge" />
      </ThemeProvider>,
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  test('renders badge with children', () => {
    render(
      <ThemeProvider>
        <Badge content={5} data-testid="badge-content">
          <div data-testid="badge-child">Child</div>
        </Badge>
      </ThemeProvider>,
    );

    const badgeChild = screen.getByTestId('badge-child');
    const badgeContent = screen.getByTestId('badge-content');
    expect(badgeChild).toBeInTheDocument();
    expect(badgeContent).toBeInTheDocument();
    expect(badgeContent).toHaveTextContent('5');
  });

  test('renders invisible badge when invisible prop is true', () => {
    render(
      <ThemeProvider>
        <Badge content={5} invisible data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    const badgeWrapper = screen.getByTestId('badge-wrapper');
    expect(badgeWrapper).toBeInTheDocument();
    expect(badgeWrapper.querySelector('span[data-testid]')).toBeNull();
  });

  test('renders badge with max value', () => {
    render(
      <ThemeProvider>
        <Badge content={100} max={99} data-testid="badge" />
      </ThemeProvider>,
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('99+');
  });

  test('renders dot variant', () => {
    render(
      <ThemeProvider>
        <Badge variant="dot" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    const badgeWrapper = screen.getByTestId('badge-wrapper');
    expect(badgeWrapper).toBeInTheDocument();
  });

  test('renders standalone badge', () => {
    render(
      <ThemeProvider>
        <Badge content={5} standalone data-testid="badge" />
      </ThemeProvider>,
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  test('renders badge with different colors', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Badge content={5} color="primary" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} color="secondary" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} color="error" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} color="warning" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} color="info" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} color="success" data-testid="badge" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  test('renders badge with different positions', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Badge content={5} position="top-right" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} position="top-left" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} position="bottom-right" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} position="bottom-left" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();
  });

  test('renders badge with showZero prop', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Badge content={0} data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    // By default, zero should not be shown
    const badgeWrapper = screen.getByTestId('badge-wrapper');
    expect(badgeWrapper).toBeInTheDocument();
    expect(badgeWrapper.querySelector('span')).toBeNull();

    rerender(
      <ThemeProvider>
        <Badge content={0} showZero data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    // With showZero prop, zero should be shown
    const updatedBadgeWrapper = screen.getByTestId('badge-wrapper');
    expect(updatedBadgeWrapper).toBeInTheDocument();

    // Use getByText to find the badge content with "0"
    const badgeContent = screen.queryByText('0');
    expect(badgeContent).not.toBeNull();
  });

  test('renders badge with custom content', () => {
    render(
      <ThemeProvider>
        <Badge content="New" data-testid="badge" />
      </ThemeProvider>,
    );

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('New');
  });

  test('renders badge with overlap prop', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Badge content={5} overlap="rectangular" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Badge content={5} overlap="circular" data-testid="badge-wrapper">
          <div>Child</div>
        </Badge>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('badge-wrapper')).toBeInTheDocument();
  });
});
