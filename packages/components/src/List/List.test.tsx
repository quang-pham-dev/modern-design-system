import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemText } from './ListItemText';

describe('List', () => {
  test('renders list with items', () => {
    render(
      <ThemeProvider>
        <List data-testid="list">
          <ListItem data-testid="list-item-1">
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem data-testid="list-item-2">
            <ListItemText primary="Item 2" />
          </ListItem>
        </List>
      </ThemeProvider>,
    );

    const list = screen.getByTestId('list');
    const item1 = screen.getByTestId('list-item-1');
    const item2 = screen.getByTestId('list-item-2');

    expect(list).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item1).toHaveTextContent('Item 1');
    expect(item2).toHaveTextContent('Item 2');
  });

  test('renders list with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <List variant="standard" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List variant="outlined" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List variant="contained" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('renders list with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <List size="sm" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List size="md" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List size="lg" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('renders list with different densities', () => {
    const { rerender } = render(
      <ThemeProvider>
        <List density="default" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List density="compact" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <List density="comfortable" data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('renders list with disabled padding', () => {
    render(
      <ThemeProvider>
        <List disablePadding data-testid="list" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  test('renders list with disabled dividers', () => {
    render(
      <ThemeProvider>
        <List disableDivider data-testid="list">
          <ListItem data-testid="list-item-1">
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem data-testid="list-item-2">
            <ListItemText primary="Item 2" />
          </ListItem>
        </List>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-2')).toBeInTheDocument();
  });
});
