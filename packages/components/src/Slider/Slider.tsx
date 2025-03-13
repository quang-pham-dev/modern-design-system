import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@modern-design-system/hooks';
import { getColor, processSxProp } from '@modern-design-system/utils';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export type SliderSize = 'sm' | 'md' | 'lg';
export type ColorScheme = 'primary' | 'success' | 'error' | 'warning';

export interface SliderProps {
  /**
   * The current value of the slider
   */
  value?: number;
  /**
   * The default value of the slider
   */
  defaultValue?: number;
  /**
   * Callback when the value changes
   */
  onChange?: (value: number) => void;
  /**
   * Callback when the slider is released
   */
  onChangeEnd?: (value: number) => void;
  /**
   * The minimum value of the slider
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the slider
   * @default 100
   */
  max?: number;
  /**
   * The step value of the slider
   * @default 1
   */
  step?: number;
  /**
   * If true, the slider will be disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If true, the slider will be read-only
   * @default false
   */
  isReadOnly?: boolean;
  /**
   * The size of the slider
   * @default 'md'
   */
  size?: SliderSize;
  /**
   * If true, the slider will show the current value
   * @default false
   */
  showValue?: boolean;
  /**
   * The color scheme of the slider
   * @default 'primary'
   */
  colorScheme?: ColorScheme;
  /**
   * If true, the slider will be oriented vertically
   * @default false
   */
  isVertical?: boolean;
  /**
   * The height of the vertical slider
   * @default '200px'
   */
  verticalHeight?: string;
  /**
   * The width of the horizontal slider
   * @default '100%'
   */
  horizontalWidth?: string;
  /**
   * The system prop that allows defining system overrides
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
  /**
   * Additional class name for the slider
   */
  className?: string;
}

interface SliderTrackProps {
  theme: Theme;
  size: 'sm' | 'md' | 'lg';
  isVertical: boolean;
  isDisabled: boolean;
  colorScheme: ColorScheme;
}

interface SliderThumbProps {
  theme: Theme;
  size: 'sm' | 'md' | 'lg';
  isDisabled: boolean;
  colorScheme: ColorScheme;
}

interface SliderFilledTrackProps {
  theme: Theme;
  percentage: number;
  isVertical: boolean;
  isDisabled: boolean;
  colorScheme: ColorScheme;
}

const SliderContainer = styled.div<{
  isVertical: boolean;
  verticalHeight: string;
  horizontalWidth: string;
  isDisabled: boolean;
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ isVertical, horizontalWidth }) =>
    isVertical ? 'fit-content' : horizontalWidth};
  height: ${({ isVertical, verticalHeight }) =>
    isVertical ? verticalHeight : 'fit-content'};
  flex-direction: ${({ isVertical }) => (isVertical ? 'column' : 'row')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  ${({ sx }) => processSxProp(sx)}
`;

const SliderTrack = styled.div<SliderTrackProps>`
  position: relative;
  flex-grow: 1;
  border-radius: ${({ theme }) => theme.borderRadius.full || '9999px'};
  background-color: ${({ theme }) =>
    getColor(theme, ['gray', '200'], '#E2E8F0')};
  height: ${({ size, isVertical }) => {
    const getTrackHeight = () => {
      if (isVertical) return '100%';

      switch (size) {
        case 'sm':
          return '4px';
        case 'lg':
          return '10px';
        case 'md':
          return '8px';
        default:
          return '6px';
      }
    };

    if (getTrackHeight() !== '100%') {
      switch (size) {
        case 'sm':
          return '4px';
        case 'lg':
          return '10px';
        case 'md':
          return '8px';
        default:
          return '6px';
      }
    }
    return '100%';
  }};
  width: ${({ size, isVertical }) => {
    const getVerticalWidth = () => {
      switch (size) {
        case 'sm':
          return '4px';
        case 'lg':
          return '10px';
        case 'md':
          return '8px';
        default:
          return '6px';
      }
    };

    const getHorizontalWidth = () => '100%';

    if (isVertical ? getVerticalWidth() : getHorizontalWidth()) {
      switch (size) {
        case 'sm':
          return '4px';
        case 'lg':
          return '10px';
        case 'md':
          return '8px';
        default:
          return '6px';
      }
    }
    return '100%';
  }};
`;

const SliderFilledTrack = styled.div<SliderFilledTrackProps>`
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius.full || '9999px'};
  background-color: ${({ theme, colorScheme, isDisabled }) => {
    if (isDisabled) return getColor(theme, ['gray', '400'], '#A0AEC0');

    switch (colorScheme) {
      case 'success':
        return getColor(theme, ['green', '500'], '#48BB78');
      case 'error':
        return getColor(theme, ['red', '500'], '#F56565');
      case 'warning':
        return getColor(theme, ['orange', '500'], '#ED8936');
      default:
        return getColor(theme, ['blue', '500'], '#3182CE');
    }
  }};

  ${({ isVertical, percentage }) =>
    isVertical
      ? css`
          bottom: 0;
          width: 100%;
          height: ${percentage}%;
        `
      : css`
          left: 0;
          height: 100%;
          width: ${percentage}%;
        `}
`;

const SliderThumb = styled.div<SliderThumbProps>`
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius.full || '9999px'};
  background-color: ${({ theme }) => getColor(theme, ['white'], '#FFFFFF')};
  border: 2px solid;
  border-color: ${({ theme, colorScheme, isDisabled }) => {
    if (isDisabled) return getColor(theme, ['gray', '400'], '#A0AEC0');

    switch (colorScheme) {
      case 'success':
        return getColor(theme, ['green', '500'], '#48BB78');
      case 'error':
        return getColor(theme, ['red', '500'], '#F56565');
      case 'warning':
        return getColor(theme, ['orange', '500'], '#ED8936');
      default:
        return getColor(theme, ['blue', '500'], '#3182CE');
    }
  }};
  box-shadow: ${({ theme }) =>
    theme.shadows.md ||
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'};
  transform: translate(-50%, -50%);
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'grab')};

  &:active {
    cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'grabbing')};
    transform: translate(-50%, -50%) scale(1.1);
  }

  width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '12px';
      case 'lg':
        return '20px';
      case 'md':
        return '18px';
      default:
        return '16px';
    }
  }};

  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '12px';
      case 'lg':
        return '20px';
      case 'md':
        return '18px';
      default:
        return '16px';
    }
  }};
`;

const SliderValue = styled.div<{
  theme: Theme;
  isDisabled: boolean;
  isVertical?: boolean;
}>`
  margin-left: ${({ isVertical }) => (isVertical ? 0 : '12px')};
  margin-top: ${({ isVertical }) => (isVertical ? '12px' : 0)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme, isDisabled }) =>
    isDisabled
      ? getColor(theme, ['gray', '400'], '#A0AEC0')
      : getColor(theme, ['gray', '700'], '#2D3748')};
`;

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      step = 1,
      isDisabled = false,
      isReadOnly = false,
      size = 'md',
      showValue = false,
      colorScheme = 'primary',
      isVertical = false,
      verticalHeight = '200px',
      horizontalWidth = '100%',
      sx,
      className,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [currentValue, setCurrentValue] = useState(value ?? defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value);
      }
    }, [value]);

    // Calculate percentage for styling
    const percentage = ((currentValue - min) / (max - min)) * 100;

    // Clamp value to min/max and snap to step
    const clampValue = useCallback(
      (val: number): number => {
        const clampedValue = Math.min(Math.max(val, min), max);
        const steps = Math.round((clampedValue - min) / step);
        return min + steps * step;
      },
      [max, min, step],
    );

    // Handle value change
    const handleChange = useCallback(
      (newValue: number) => {
        const clampedValue = clampValue(newValue);

        if (value === undefined) {
          setCurrentValue(clampedValue);
        }

        onChange?.(clampedValue);
      },
      [clampValue, onChange, value],
    );

    // Calculate value from mouse/touch position
    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!trackRef.current) return currentValue;

        const rect = trackRef.current.getBoundingClientRect();

        let percentage: number;
        if (isVertical) {
          const bottom = rect.bottom;
          const height = rect.height;
          percentage = (bottom - clientY) / height;
        } else {
          const left = rect.left;
          const width = rect.width;
          percentage = (clientX - left) / width;
        }

        percentage = Math.min(Math.max(percentage, 0), 1);
        return min + percentage * (max - min);
      },
      [currentValue, isVertical, max, min],
    );

    // Mouse/touch event handlers
    const handleMouseDown = (e: React.MouseEvent) => {
      if (isDisabled || isReadOnly) return;

      const newValue = getValueFromPosition(e.clientX, e.clientY);
      handleChange(newValue);
      setIsDragging(true);
    };

    // Handle mouse move with useCallback
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging) return;

        const newValue = getValueFromPosition(e.clientX, e.clientY);
        handleChange(newValue);
      },
      [isDragging, getValueFromPosition, handleChange],
    );

    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        onChangeEnd?.(currentValue);
      }
    }, [isDragging, currentValue, onChangeEnd]);

    // Add and remove event listeners
    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [handleMouseMove, handleMouseUp, isDragging]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled || isReadOnly) return;

      let newValue: number;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = clampValue(currentValue + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = clampValue(currentValue - step);
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        default:
          return currentValue;
      }

      e.preventDefault();
      handleChange(newValue);
      onChangeEnd?.(newValue);
    };

    return (
      <SliderContainer
        ref={ref}
        isVertical={isVertical}
        verticalHeight={verticalHeight}
        horizontalWidth={horizontalWidth}
        isDisabled={isDisabled}
        className={className}
        sx={sx}
        {...rest}
      >
        <SliderTrack
          ref={trackRef}
          theme={theme}
          size={size}
          isVertical={isVertical}
          isDisabled={isDisabled}
          colorScheme={colorScheme}
          onMouseDown={handleMouseDown}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          data-testid="slider-track"
        >
          <SliderFilledTrack
            theme={theme}
            percentage={percentage}
            isVertical={isVertical}
            isDisabled={isDisabled}
            colorScheme={colorScheme}
            data-testid="slider-filled-track"
          />
          <SliderThumb
            theme={theme}
            size={size}
            isDisabled={isDisabled}
            colorScheme={colorScheme}
            style={{
              [isVertical ? 'bottom' : 'left']: `${percentage}%`,
              [isVertical ? 'left' : 'top']: '50%',
            }}
            data-testid="slider-thumb"
          />
        </SliderTrack>
        {showValue && (
          <SliderValue
            theme={theme}
            isDisabled={isDisabled}
            isVertical={isVertical}
            data-testid="slider-value"
          >
            {currentValue}
          </SliderValue>
        )}
      </SliderContainer>
    );
  },
);

Slider.displayName = 'Slider';

export default Slider;
