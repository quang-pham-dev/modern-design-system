import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Box } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Box Component', () => {
  beforeEach(() => {
    // Setup default mock implementation
    (useTheme as jest.Mock).mockReturnValue({
      theme: {},
    });
  });

  test('renders with default props', () => {
    render(<Box data-testid="box">Content</Box>);
    const element = screen.getByTestId('box');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Content');
  });

  test('applies padding style', () => {
    render(
      <Box data-testid="box" padding="10px">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('padding: 10px');
  });

  test('applies margin style', () => {
    render(
      <Box data-testid="box" margin="15px">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('margin: 15px');
  });

  test('applies width and height styles', () => {
    render(
      <Box data-testid="box" width="200px" height="100px">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('width: 200px');
    expect(element).toHaveStyle('height: 100px');
  });

  test('applies background color style', () => {
    render(
      <Box data-testid="box" backgroundColor="#f5f5f5">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('background-color: #f5f5f5');
  });

  test('applies border radius style', () => {
    render(
      <Box data-testid="box" borderRadius="8px">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('border-radius: 8px');
  });

  test('applies border style', () => {
    render(
      <Box data-testid="box" border="1px solid black">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('border: 1px solid black');
  });

  test('applies display style', () => {
    render(
      <Box data-testid="box" display="flex">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('display: flex');
  });

  test('applies box shadow style', () => {
    render(
      <Box data-testid="box" boxShadow="0 2px 4px rgba(0,0,0,0.1)">
        Content
      </Box>,
    );
    const element = screen.getByTestId('box');
    expect(element).toHaveStyle('box-shadow: 0 2px 4px rgba(0,0,0,0.1)');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Ref Content</Box>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref Content');
  });

  test('passes additional props to the root element', () => {
    render(
      <Box
        data-testid="custom-box"
        className="custom-class"
        aria-label="box description"
      >
        Custom Props
      </Box>,
    );
    const element = screen.getByTestId('custom-box');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveAttribute('aria-label', 'box description');
    expect(element).toHaveTextContent('Custom Props');
  });

  test('applies multiple styles simultaneously', () => {
    render(
      <Box
        data-testid="styled-box"
        padding="16px"
        margin="8px"
        backgroundColor="#e0e0e0"
        borderRadius="4px"
        border="1px solid #ccc"
        boxShadow="0 1px 3px rgba(0,0,0,0.12)"
      >
        Styled Box
      </Box>,
    );

    const element = screen.getByTestId('styled-box');
    expect(element).toHaveStyle({
      padding: '16px',
      margin: '8px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    });
  });
});
