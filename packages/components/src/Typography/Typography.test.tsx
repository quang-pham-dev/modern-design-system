import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Typography } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Typography Component', () => {
  beforeEach(() => {
    // Setup default mock implementation
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
    });
  });

  test('renders with default props', () => {
    render(<Typography>Default Text</Typography>);
    const element = screen.getByText('Default Text');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P'); // Default component is 'p'
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <Typography variant="h1">Heading 1</Typography>,
    );
    let element = screen.getByText('Heading 1');
    expect(element.tagName).toBe('H1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    element = screen.getByText('Heading 2');
    expect(element.tagName).toBe('H2');

    rerender(<Typography variant="body2">Body Text</Typography>);
    element = screen.getByText('Body Text');
    expect(element.tagName).toBe('P');

    rerender(<Typography variant="caption">Caption Text</Typography>);
    element = screen.getByText('Caption Text');
    expect(element.tagName).toBe('SPAN');
  });

  test('renders with custom component', () => {
    render(
      <Typography
        component="a"
        // Move href to a separate props object
        {...{ href: 'https://example.com' }}
      >
        Link Text
      </Typography>,
    );
    const element = screen.getByText('Link Text');
    expect(element.tagName).toBe('A');
    expect(element).toHaveAttribute('href', 'https://example.com');
  });

  test('applies alignment styles', () => {
    const { rerender } = render(
      <Typography align="center">Centered Text</Typography>,
    );
    let element = screen.getByText('Centered Text');
    expect(element).toHaveStyle('text-align: center');

    rerender(<Typography align="right">Right Text</Typography>);
    element = screen.getByText('Right Text');
    expect(element).toHaveStyle('text-align: right');
  });

  test('applies noWrap style', () => {
    render(<Typography noWrap>No Wrap Text</Typography>);
    const element = screen.getByText('No Wrap Text');
    expect(element).toHaveStyle('white-space: nowrap');
    expect(element).toHaveStyle('overflow: hidden');
    expect(element).toHaveStyle('text-overflow: ellipsis');
  });

  test('applies gutterBottom style', () => {
    render(<Typography gutterBottom>Text with Margin</Typography>);
    const element = screen.getByText('Text with Margin');
    expect(element).toHaveStyle('margin-bottom: 0.35em');
  });

  test('applies custom color', () => {
    render(<Typography color="red">Red Text</Typography>);
    const element = screen.getByText('Red Text');
    expect(element).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Typography ref={ref}>Ref Text</Typography>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref Text');
  });

  test('passes additional props to the root element', () => {
    render(
      <Typography data-testid="custom-typography" className="custom-class">
        Custom Props
      </Typography>,
    );
    const element = screen.getByTestId('custom-typography');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveTextContent('Custom Props');
  });
});
