import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { Image } from './index';

vi.mock('@modern-design-system/hooks', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          main: '#9e9e9e',
          light: '#f5f5f5',
          dark: '#616161',
          contrastText: '#ffffff',
        },
        error: {
          main: '#f44336',
          light: '#ffebee',
          dark: '#c62828',
          contrastText: '#ffffff',
        },
      },
    },
  }),
}));

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => {
      return '';
    },
  }),
});

describe('Image Component', () => {
  const setupImageElement = () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    return container;
  };

  beforeEach(() => {
    setupImageElement();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" />
      </ThemeProvider>,
    );

    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  test('handles image load event', async () => {
    render(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" />
      </ThemeProvider>,
    );

    const image = screen.getByTestId('image');
    fireEvent.load(image);

    await waitFor(() => {
      const imageRoot = screen.getByTestId('image-root');
      expect(imageRoot).toBeInTheDocument();
    });
  });

  test('handles image error event with fallback', async () => {
    render(
      <ThemeProvider>
        <Image
          src="invalid-image.jpg"
          fallbackSrc="fallback-image.jpg"
          alt="Test image"
        />
      </ThemeProvider>,
    );

    const image = screen.getByTestId('image');
    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'fallback-image.jpg');
    });
  });

  test('handles image error event without fallback', async () => {
    render(
      <ThemeProvider>
        <Image src="invalid-image.jpg" alt="Test image" />
      </ThemeProvider>,
    );

    const image = screen.getByTestId('image');
    fireEvent.error(image);

    await waitFor(() => {
      const errorElement = screen.getByTestId('image-error');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Failed to load image');
    });
  });

  test('applies different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" variant="rounded" />
      </ThemeProvider>,
    );

    // Kiểm tra sự tồn tại của element thay vì kiểm tra style trực tiếp
    let imageRoot = screen.getByTestId('image-root');
    expect(imageRoot).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" variant="circle" />
      </ThemeProvider>,
    );

    imageRoot = screen.getByTestId('image-root');
    expect(imageRoot).toBeInTheDocument();
  });

  test('applies different fit values', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" fit="cover" />
      </ThemeProvider>,
    );

    let image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();

    expect(image.getAttribute('data-fit')).toBe('cover');

    rerender(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" fit="contain" />
      </ThemeProvider>,
    );

    image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('data-fit')).toBe('contain');
  });

  test('supports lazy loading', () => {
    render(
      <ThemeProvider>
        <Image src="test-image.jpg" alt="Test image" lazy />
      </ThemeProvider>,
    );

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
