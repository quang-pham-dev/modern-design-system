import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { ListItem } from './ListItem';
import { ListItemText } from './ListItemText';

describe('ListItem', () => {
  test('renders list item with content', () => {
    render(
      <ThemeProvider>
        <ListItem data-testid="list-item">
          <ListItemText primary="Item 1" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveTextContent('Item 1');
  });

  test('renders disabled list item', () => {
    render(
      <ThemeProvider>
        <ListItem disabled data-testid="list-item">
          <ListItemText primary="Disabled Item" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();
  });

  test('renders button list item', () => {
    const handleClick = vi.fn();

    render(
      <ThemeProvider>
        <ListItem button onClick={handleClick} data-testid="list-item">
          <ListItemText primary="Button Item" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();

    fireEvent.click(listItem);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders list item without divider', () => {
    render(
      <ThemeProvider>
        <ListItem disableDivider data-testid="list-item">
          <ListItemText primary="No Divider Item" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();
  });

  test('renders dense list item', () => {
    render(
      <ThemeProvider>
        <ListItem dense data-testid="list-item">
          <ListItemText primary="Dense Item" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();
  });

  test('renders selected list item', () => {
    render(
      <ThemeProvider>
        <ListItem selected data-testid="list-item">
          <ListItemText primary="Selected Item" />
        </ListItem>
      </ThemeProvider>,
    );

    const listItem = screen.getByTestId('list-item');
    expect(listItem).toBeInTheDocument();
  });

  test('renders list item with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <ListItem size="sm" data-testid="list-item">
          <ListItemText primary="Small Item" />
        </ListItem>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list-item')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <ListItem size="md" data-testid="list-item">
          <ListItemText primary="Medium Item" />
        </ListItem>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list-item')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <ListItem size="lg" data-testid="list-item">
          <ListItemText primary="Large Item" />
        </ListItem>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });
});
