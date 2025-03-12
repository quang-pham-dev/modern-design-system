import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Pagination } from './Pagination';
import { ThemeProvider } from '@modern-design-system/theme';

describe('Pagination', () => {
  test('renders pagination with correct number of pages', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders with current page selected', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} page={3} />
      </ThemeProvider>,
    );

    const page3 = screen.getByText('3');
    expect(page3).toHaveAttribute('aria-current', 'page');
  });

  test('calls onChange when page is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={1} onChange={handleChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('3'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(3); // Second argument is the page number
  });

  test('disables previous button on first page', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} page={1} />
      </ThemeProvider>,
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveStyle('opacity: 0.5');
  });

  test('disables next button on last page', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} page={5} />
      </ThemeProvider>,
    );

    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toHaveStyle('opacity: 0.5');
  });

  test('renders with ellipsis for many pages', () => {
    render(
      <ThemeProvider>
        <Pagination count={20} page={10} />
      </ThemeProvider>,
    );

    // Instead of looking for just the text, we should check that ellipsis elements exist
    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  test('navigates to next page when next button is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={3} onChange={handleChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText('Go to next page'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(4);
  });

  test('navigates to previous page when previous button is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={3} onChange={handleChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText('Go to previous page'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(2);
  });

  test('navigates to first page when first button is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={3} onChange={handleChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText('Go to first page'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(1);
  });

  test('navigates to last page when last button is clicked', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={3} onChange={handleChange} />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText('Go to last page'));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0]?.[1]).toBe(5);
  });

  test('does not call onChange when disabled', () => {
    const handleChange = vi.fn();

    render(
      <ThemeProvider>
        <Pagination count={5} page={3} onChange={handleChange} disabled />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('4'));

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('hides next and previous buttons when specified', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} hideNextButton hidePrevButton />
      </ThemeProvider>,
    );

    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Go to previous page'),
    ).not.toBeInTheDocument();
  });

  test('hides first and last buttons when specified', () => {
    render(
      <ThemeProvider>
        <Pagination count={5} hideFirstButton hideLastButton />
      </ThemeProvider>,
    );

    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument();
  });

  test('renders with different boundary count', () => {
    render(
      <ThemeProvider>
        <Pagination count={20} page={10} boundaryCount={2} />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('renders with different sibling count', () => {
    render(
      <ThemeProvider>
        <Pagination count={20} page={10} siblingCount={2} />
      </ThemeProvider>,
    );

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('renders with different shapes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Pagination count={5} shape="circular" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} shape="rounded" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} shape="square" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Pagination count={5} variant="outlined" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} variant="filled" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} variant="text" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Pagination count={5} size="sm" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} size="md" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Pagination count={5} size="lg" data-testid="pagination" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
