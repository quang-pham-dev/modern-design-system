import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { ListItemText } from './ListItemText';

describe('ListItemText', () => {
  test('renders with primary text', () => {
    render(
      <ThemeProvider>
        <ListItemText primary="Primary Text" data-testid="list-item-text" />
      </ThemeProvider>,
    );

    const listItemText = screen.getByTestId('list-item-text');
    expect(listItemText).toBeInTheDocument();
    expect(listItemText).toHaveTextContent('Primary Text');
  });

  test('renders with secondary text', () => {
    render(
      <ThemeProvider>
        <ListItemText secondary="Secondary Text" data-testid="list-item-text" />
      </ThemeProvider>,
    );

    const listItemText = screen.getByTestId('list-item-text');
    expect(listItemText).toBeInTheDocument();
    expect(listItemText).toHaveTextContent('Secondary Text');
  });

  test('renders with both primary and secondary text', () => {
    render(
      <ThemeProvider>
        <ListItemText
          primary="Primary Text"
          secondary="Secondary Text"
          data-testid="list-item-text"
        />
      </ThemeProvider>,
    );

    const listItemText = screen.getByTestId('list-item-text');
    expect(listItemText).toBeInTheDocument();
    expect(listItemText).toHaveTextContent('Primary Text');
    expect(listItemText).toHaveTextContent('Secondary Text');
  });

  test('renders with noWrap option', () => {
    render(
      <ThemeProvider>
        <ListItemText
          primary="Primary Text"
          secondary="Secondary Text"
          noWrap
          data-testid="list-item-text"
        />
      </ThemeProvider>,
    );

    const listItemText = screen.getByTestId('list-item-text');
    expect(listItemText).toBeInTheDocument();
  });
});
