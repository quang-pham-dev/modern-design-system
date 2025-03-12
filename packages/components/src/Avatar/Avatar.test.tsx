import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  test('renders with text content', () => {
    render(
      <ThemeProvider>
        <Avatar data-testid="avatar">JD</Avatar>
      </ThemeProvider>,
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent('JD');
  });

  test('renders with image', () => {
    render(
      <ThemeProvider>
        <Avatar src="test-image.jpg" alt="Test Avatar" data-testid="avatar" />
      </ThemeProvider>,
    );

    const avatar = screen.getByTestId('avatar');
    const img = screen.getByAltText('Test Avatar');
    expect(avatar).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test-image.jpg');
  });

  test('renders fallback when image fails to load', () => {
    render(
      <ThemeProvider>
        <Avatar src="invalid-image.jpg" alt="Test Avatar" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    const img = screen.getByAltText('Test Avatar');
    fireEvent.error(img);
    expect(img.style.display).toBe('none');
    expect(screen.getByTestId('avatar')).toHaveTextContent('JD');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Avatar size="sm" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      width: '32px',
      height: '32px',
    });

    rerender(
      <ThemeProvider>
        <Avatar size="md" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      width: '40px',
      height: '40px',
    });

    rerender(
      <ThemeProvider>
        <Avatar size="lg" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({
      width: '48px',
      height: '48px',
    });
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Avatar variant="circular" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({ borderRadius: '50%' });

    rerender(
      <ThemeProvider>
        <Avatar variant="rounded" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Avatar variant="square" data-testid="avatar">
          JD
        </Avatar>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('avatar')).toHaveStyle({ borderRadius: '0' });
  });
});
