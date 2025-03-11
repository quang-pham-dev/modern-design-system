import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Tabs, Tab, TabPanel } from './Tabs';
import { ThemeProvider } from '@modern-design-system/theme';

describe('Tabs', () => {
  test('renders tabs with correct labels', () => {
    render(
      <ThemeProvider>
        <Tabs>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  test('selects the first tab by default', () => {
    render(
      <ThemeProvider>
        <Tabs>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
          <TabPanel value={0} index={0}>
            Panel 1
          </TabPanel>
          <TabPanel value={0} index={1}>
            Panel 2
          </TabPanel>
          <TabPanel value={0} index={2}>
            Panel 3
          </TabPanel>
        </Tabs>
      </ThemeProvider>,
    );

    const tab1 = screen.getByText('Tab 1').closest('[role="tab"]');
    expect(tab1).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    // Check that other panels are not in the document or have hidden attribute
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Panel 3')).not.toBeInTheDocument();
  });

  test('changes tab when clicked', () => {
    render(
      <ThemeProvider>
        <Tabs>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
          <TabPanel value={0} index={0}>
            Panel 1
          </TabPanel>
          <TabPanel value={0} index={1}>
            Panel 2
          </TabPanel>
          <TabPanel value={0} index={2}>
            Panel 3
          </TabPanel>
        </Tabs>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Tab 2'));

    const tab2 = screen.getByText('Tab 2').closest('[role="tab"]');
    expect(tab2).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    // Check that other panels are not in the document or have hidden attribute
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Panel 3')).not.toBeInTheDocument();
  });

  test('calls onChange when tab is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Tabs onChange={handleChange}>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Tab 2'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(1); // Second argument is the index
  });

  test('disabled tab cannot be clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Tabs onChange={handleChange}>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" disabled />
          <Tab label="Tab 3" />
        </Tabs>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Tab 2'));

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders tabs with icons', () => {
    render(
      <ThemeProvider>
        <Tabs>
          <Tab label="Tab 1" icon={<span data-testid="icon-1">🏠</span>} />
          <Tab label="Tab 2" icon={<span data-testid="icon-2">📝</span>} />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
    expect(screen.getByTestId('icon-2')).toBeInTheDocument();
  });

  test('renders vertical tabs correctly', () => {
    render(
      <ThemeProvider>
        <Tabs orientation="vertical">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </ThemeProvider>,
    );

    const tabList = screen.getByRole('tablist');
    expect(tabList).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Tabs variant="filled" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Tabs variant="outlined" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Tabs variant="text" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Tabs size="sm" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Tabs size="md" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Tabs size="lg" data-testid="tabs">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
        </Tabs>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });
});
