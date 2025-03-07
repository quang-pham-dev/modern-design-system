import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Flex } from './index';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('Flex Component', () => {
  beforeEach(() => {
    // Setup default mock implementation
    (useTheme as jest.Mock).mockReturnValue({
      theme: {},
    });
  });

  test('renders with default props', () => {
    render(<Flex data-testid="flex">Content</Flex>);
    const element = screen.getByTestId('flex');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveTextContent('Content');
    expect(element).toHaveStyle('display: flex');
    expect(element).toHaveStyle('flex-direction: row');
  });

  test('applies direction style', () => {
    render(
      <Flex data-testid="flex" direction="column">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-direction: column');
  });

  test('applies justifyContent style', () => {
    render(
      <Flex data-testid="flex" justifyContent="center">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('justify-content: center');
  });

  test('applies alignItems style', () => {
    render(
      <Flex data-testid="flex" alignItems="center">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('align-items: center');
  });

  test('applies grow style', () => {
    render(
      <Flex data-testid="flex" grow={1}>
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-grow: 1');
  });

  test('applies shrink style', () => {
    render(
      <Flex data-testid="flex" shrink={0}>
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-shrink: 0');
  });

  test('applies basis style', () => {
    render(
      <Flex data-testid="flex" basis="200px">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-basis: 200px');
  });

  test('applies gap style', () => {
    render(
      <Flex data-testid="flex" gap="10px">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('gap: 10px');
  });

  test('applies wrap style', () => {
    render(
      <Flex data-testid="flex" wrap="wrap">
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-wrap: wrap');
  });

  test('applies combined flex styles', () => {
    render(
      <Flex
        data-testid="flex"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap="16px"
      >
        Content
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('flex-direction: column');
    expect(element).toHaveStyle('justify-content: space-between');
    expect(element).toHaveStyle('align-items: center');
    expect(element).toHaveStyle('gap: 16px');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref}>Ref Test</Flex>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  test('inherits Box props correctly', () => {
    render(
      <Flex
        data-testid="flex"
        padding="20px"
        margin="10px"
        backgroundColor="#f0f0f0"
        borderRadius="8px"
      >
        Box Props Test
      </Flex>,
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveStyle('padding: 20px');
    expect(element).toHaveStyle('margin: 10px');
    expect(element).toHaveStyle('background-color: #f0f0f0');
    expect(element).toHaveStyle('border-radius: 8px');
  });

  test('passes additional props to the root element', () => {
    render(
      <Flex data-testid="custom-flex" className="custom-class">
        Custom Props
      </Flex>,
    );
    const element = screen.getByTestId('custom-flex');
    expect(element).toHaveClass('custom-class');
    expect(element).toHaveTextContent('Custom Props');
  });
});
