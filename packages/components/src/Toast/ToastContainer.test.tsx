import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';

import { ToastContainer } from './ToastContainer';
import Toast from './Toast';
import { ThemeProvider } from '@modern-design-system/theme';

describe('ToastContainer Component', () => {
  test('renders with default position (top-right)', () => {
    render(
      <ToastContainer>
        <div data-testid="toast-child">Toast content</div>
      </ToastContainer>,
    );

    const child = screen.getByTestId('toast-child');
    expect(child).toBeInTheDocument();

    // Get the container element (parent of the child)
    const container = child.parentElement;
    expect(container).toHaveStyle('position: fixed');
    expect(container).toHaveStyle('z-index: 1500');
  });

  test('renders with custom position (bottom-left)', () => {
    render(
      <ToastContainer position="bottom-left">
        <div data-testid="toast-child">Toast content</div>
      </ToastContainer>,
    );

    const child = screen.getByTestId('toast-child');
    expect(child).toBeInTheDocument();
  });

  test('renders multiple children', () => {
    render(
      <ToastContainer>
        <div data-testid="toast-1">First toast</div>
        <div data-testid="toast-2">Second toast</div>
        <div data-testid="toast-3">Third toast</div>
      </ToastContainer>,
    );

    expect(screen.getByTestId('toast-1')).toBeInTheDocument();
    expect(screen.getByTestId('toast-2')).toBeInTheDocument();
    expect(screen.getByTestId('toast-3')).toBeInTheDocument();
  });

  test('renders with actual Toast components', () => {
    render(
      <ThemeProvider>
        <ToastContainer position="top-center">
          <Toast data-testid="toast-component">Toast message</Toast>
        </ToastContainer>
      </ThemeProvider>,
    );

    const toast = screen.getByTestId('toast-component');
    expect(toast).toBeInTheDocument();
    expect(screen.getByText('Toast message')).toBeInTheDocument();
  });

  test('renders with all possible positions', () => {
    const positions = [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left',
      'top-center',
      'bottom-center',
    ] as const;

    for (const position of positions) {
      const { unmount } = render(
        <ToastContainer position={position}>
          <div data-testid={`toast-${position}`}>Toast in {position}</div>
        </ToastContainer>,
      );

      expect(screen.getByTestId(`toast-${position}`)).toBeInTheDocument();
      expect(screen.getByText(`Toast in ${position}`)).toBeInTheDocument();

      unmount();
    }
  });
});
