import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

import { FormControl } from './index';
import { Input } from '../Input';
import { useTheme } from '@modern-design-system/hooks';

// Mock the useTheme hook
vi.mock('@modern-design-system/hooks', () => ({
  useTheme: vi.fn(),
}));

describe('FormControl Component', () => {
  // Setup default mock implementation
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: {
        colors: {
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
            contrastText: '#ffffff',
          },
          text: {
            primary: '#212121',
            secondary: '#757575',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSizes: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
          },
          // Add missing fontWeights
          fontWeights: {
            normal: 400,
            medium: 500,
            bold: 700,
          },
          // Add missing lineHeights
          lineHeights: {
            none: 1,
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
          },
        },
        borderRadius: {
          sm: 4,
        },
        // Add spacing to the mock theme
        spacing: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
        },
      },
    });
  });

  test('renders with label', () => {
    render(
      <FormControl label="Test Label">
        <Input data-testid="input" />
      </FormControl>,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    render(
      <FormControl label="Test Label" helperText="Helper text">
        <Input data-testid="input" />
      </FormControl>,
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  test('renders with error message', () => {
    render(
      <FormControl label="Test Label" error errorMessage="Error message">
        <Input data-testid="input" />
      </FormControl>,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  test('error message takes precedence over helper text', () => {
    render(
      <FormControl
        label="Test Label"
        helperText="Helper text"
        error
        errorMessage="Error message"
      >
        <Input data-testid="input" />
      </FormControl>,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  test('passes required prop to children', () => {
    render(
      <FormControl label="Test Label" required>
        <Input data-testid="input" />
      </FormControl>,
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  test('passes error prop to children', () => {
    render(
      <FormControl label="Test Label" error>
        <Input data-testid="input" />
      </FormControl>,
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('passes disabled prop to children', () => {
    render(
      <FormControl label="Test Label" disabled>
        <Input data-testid="input" />
      </FormControl>,
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('disabled');
  });
});
