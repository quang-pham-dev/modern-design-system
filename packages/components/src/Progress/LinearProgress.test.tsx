import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { LinearProgress } from './LinearProgress';
import { ThemeProvider } from '@modern-design-system/theme';

describe('LinearProgress', () => {
  test('renders with default props', () => {
    render(
      <ThemeProvider>
        <LinearProgress />
      </ThemeProvider>,
    );

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
    expect(progressElement).toHaveAttribute('aria-valuemin', '0');
    expect(progressElement).toHaveAttribute('aria-valuemax', '100');
    expect(progressElement).toHaveAttribute('aria-valuenow', '0');
  });

  test('renders with custom value', () => {
    render(
      <ThemeProvider>
        <LinearProgress value={75} />
      </ThemeProvider>,
    );

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveAttribute('aria-valuenow', '75');
  });

  test('renders indeterminate progress without aria-valuenow', () => {
    render(
      <ThemeProvider>
        <LinearProgress indeterminate />
      </ThemeProvider>,
    );

    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).not.toHaveAttribute('aria-valuenow');
  });

  test('clamps value between 0 and 100', () => {
    render(
      <ThemeProvider>
        <LinearProgress value={-10} data-testid="negative" />
        <LinearProgress value={150} data-testid="over" />
      </ThemeProvider>,
    );

    const negativeProgress = screen.getByTestId('negative');
    const overProgress = screen.getByTestId('over');

    expect(negativeProgress).toHaveAttribute('aria-valuenow', '0');
    expect(overProgress).toHaveAttribute('aria-valuenow', '100');
  });

  test('renders with buffer when buffer prop is true', () => {
    render(
      <ThemeProvider>
        <LinearProgress buffer bufferValue={50} value={25} />
      </ThemeProvider>,
    );

    // This is a bit tricky to test directly since the buffer is a styled div
    // We could check for specific CSS classes or styles if needed
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
    expect(progressElement).toHaveAttribute('aria-valuenow', '25');
  });

  test('applies custom thickness', () => {
    const { container } = render(
      <ThemeProvider>
        <LinearProgress thickness={8} />
      </ThemeProvider>,
    );

    // Check if the container has the correct height
    const progressContainer = container.firstChild;
    expect(progressContainer).toHaveStyle('height: 8px');
  });

  test('applies rounded corners when rounded is true', () => {
    const { container } = render(
      <ThemeProvider>
        <LinearProgress thickness={4} rounded />
      </ThemeProvider>,
    );

    const progressContainer = container.firstChild;
    expect(progressContainer).toHaveStyle('border-radius: 2px');
  });

  test('does not apply rounded corners when rounded is false', () => {
    const { container } = render(
      <ThemeProvider>
        <LinearProgress thickness={4} rounded={false} />
      </ThemeProvider>,
    );

    const progressContainer = container.firstChild;
    expect(progressContainer).toHaveStyle('border-radius: 0px');
  });

  test('passes additional props to the container', () => {
    render(
      <ThemeProvider>
        <LinearProgress
          data-testid="custom-progress"
          className="custom-class"
        />
      </ThemeProvider>,
    );

    const progressElement = screen.getByTestId('custom-progress');
    expect(progressElement).toHaveClass('custom-class');
  });
});
