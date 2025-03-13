import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { Slider } from './Slider';

describe('Slider', () => {
  const onChange = vi.fn();
  const onChangeEnd = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
    onChangeEnd.mockClear();
  });

  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} onChange={onChange} />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('slider-track')).toBeInTheDocument();
    expect(screen.getByTestId('slider-filled-track')).toBeInTheDocument();
    expect(screen.getByTestId('slider-thumb')).toBeInTheDocument();
  });

  test('shows value when showValue is true', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} onChange={onChange} showValue />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('slider-value')).toBeInTheDocument();
    expect(screen.getByTestId('slider-value')).toHaveTextContent('50');
  });

  test('handles value change via props', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Slider value={50} onChange={onChange} showValue />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('slider-value')).toHaveTextContent('50');

    rerender(
      <ThemeProvider>
        <Slider value={75} onChange={onChange} showValue />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('slider-value')).toHaveTextContent('75');
  });

  test('handles mouse interactions', () => {
    // Mock getBoundingClientRect for the track element
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 10,
      top: 0,
      left: 0,
      bottom: 10,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    render(
      <ThemeProvider>
        <Slider
          defaultValue={0}
          min={0}
          max={100}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
        />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');

    // Simulate clicking at 50% of the track
    fireEvent.mouseDown(track, { clientX: 50, clientY: 5 });
    expect(onChange).toHaveBeenCalledWith(50);

    // Simulate mouse move
    fireEvent.mouseMove(document, { clientX: 75, clientY: 5 });
    expect(onChange).toHaveBeenCalledWith(75);

    // Simulate mouse up
    fireEvent.mouseUp(document);
    expect(onChangeEnd).toHaveBeenCalled();
  });

  test('handles keyboard interactions', () => {
    render(
      <ThemeProvider>
        <Slider
          defaultValue={50}
          min={0}
          max={100}
          step={10}
          onChange={onChange}
        />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');
    track.focus();

    // Arrow right should increase value by step
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(60);

    // Arrow left should decrease value by step
    onChange.mockClear();
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(40);

    // Home should set to min value
    onChange.mockClear();
    fireEvent.keyDown(track, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(0);

    // End should set to max value
    onChange.mockClear();
    fireEvent.keyDown(track, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  test('respects min, max, and step constraints', () => {
    render(
      <ThemeProvider>
        <Slider
          defaultValue={5}
          min={0}
          max={10}
          step={2.5}
          onChange={onChange}
          showValue
        />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');
    track.focus();

    // Try to go below min
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    fireEvent.keyDown(track, { key: 'ArrowLeft' });
    expect(screen.getByTestId('slider-value')).toHaveTextContent('0');

    // Try to go above max
    fireEvent.keyDown(track, { key: 'End' });
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(screen.getByTestId('slider-value')).toHaveTextContent('10');

    // Check step constraint
    fireEvent.keyDown(track, { key: 'Home' });
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(screen.getByTestId('slider-value')).toHaveTextContent('2.5');
  });

  test('is disabled when isDisabled is true', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} onChange={onChange} isDisabled />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');
    expect(track).toHaveAttribute('aria-disabled', 'true');
    expect(track).toHaveAttribute('tabIndex', '-1');

    // Clicking should not trigger onChange when disabled
    fireEvent.mouseDown(track, { clientX: 75, clientY: 5 });
    expect(onChange).not.toHaveBeenCalled();

    // Keyboard events should not trigger onChange when disabled
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('is read-only when isReadOnly is true', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} onChange={onChange} isReadOnly />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');

    // Clicking should not trigger onChange when read-only
    fireEvent.mouseDown(track, { clientX: 75, clientY: 5 });
    expect(onChange).not.toHaveBeenCalled();

    // Keyboard events should not trigger onChange when read-only
    fireEvent.keyDown(track, { key: 'ArrowRight' });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('handles vertical orientation', () => {
    // Mock getBoundingClientRect for the track element
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 10,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 10,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    render(
      <ThemeProvider>
        <Slider
          defaultValue={0}
          min={0}
          max={100}
          onChange={onChange}
          isVertical
          verticalHeight="100px"
        />
      </ThemeProvider>,
    );

    const track = screen.getByTestId('slider-track');

    // Simulate clicking at 75% height from the bottom of the track
    fireEvent.mouseDown(track, { clientX: 5, clientY: 25 });
    expect(onChange).toHaveBeenCalledWith(75);
  });

  test('handles different color schemes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Slider defaultValue={50} colorScheme="primary" />
      </ThemeProvider>,
    );

    // Test different color schemes
    const colorSchemes = ['success', 'error', 'warning'] as const;

    for (const scheme of colorSchemes) {
      rerender(
        <ThemeProvider>
          <Slider defaultValue={50} colorScheme={scheme} />
        </ThemeProvider>,
      );

      // Just verify that the component renders with different color schemes
      expect(screen.getByTestId('slider-track')).toBeInTheDocument();
      expect(screen.getByTestId('slider-filled-track')).toBeInTheDocument();
      expect(screen.getByTestId('slider-thumb')).toBeInTheDocument();
    }
  });

  test('handles different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Slider defaultValue={50} size="md" />
      </ThemeProvider>,
    );

    // Test different sizes
    const sizes = ['sm', 'lg'] as const;

    for (const size of sizes) {
      rerender(
        <ThemeProvider>
          <Slider defaultValue={50} size={size} />
        </ThemeProvider>,
      );

      // Just verify that the component renders with different sizes
      expect(screen.getByTestId('slider-track')).toBeInTheDocument();
      expect(screen.getByTestId('slider-filled-track')).toBeInTheDocument();
      expect(screen.getByTestId('slider-thumb')).toBeInTheDocument();
    }
  });

  test('accepts custom width for horizontal slider', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} horizontalWidth="200px" />
      </ThemeProvider>,
    );

    // Verify that the component renders with custom width
    expect(screen.getByTestId('slider-track')).toBeInTheDocument();
  });

  test('accepts custom height for vertical slider', () => {
    render(
      <ThemeProvider>
        <Slider defaultValue={50} isVertical verticalHeight="150px" />
      </ThemeProvider>,
    );

    // Verify that the component renders with custom height
    expect(screen.getByTestId('slider-track')).toBeInTheDocument();
  });
});
