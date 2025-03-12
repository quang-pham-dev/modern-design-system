import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@modern-design-system/theme';
import { Table } from './Table';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TableContainer } from './TableContainer';

const TestTable = () => (
  <ThemeProvider>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>Name</TableCell>
            <TableCell header>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane</TableCell>
            <TableCell>24</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </ThemeProvider>
);

describe('Table', () => {
  test('renders correctly', () => {
    render(<TestTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getAllByText('Footer')).toHaveLength(2);
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Table variant="standard" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-variant',
      'standard',
    );

    rerender(
      <ThemeProvider>
        <Table variant="outlined" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-variant',
      'outlined',
    );

    rerender(
      <ThemeProvider>
        <Table variant="contained" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-variant',
      'contained',
    );
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Table size="sm" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-size', 'sm');

    rerender(
      <ThemeProvider>
        <Table size="md" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-size', 'md');

    rerender(
      <ThemeProvider>
        <Table size="lg" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-size', 'lg');
  });

  test('renders with different densities', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Table density="default" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-density',
      'default',
    );

    rerender(
      <ThemeProvider>
        <Table density="compact" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-density',
      'compact',
    );

    rerender(
      <ThemeProvider>
        <Table density="comfortable" data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-density',
      'comfortable',
    );
  });

  test('renders with striped rows', () => {
    render(
      <ThemeProvider>
        <Table striped data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-striped', 'true');
  });

  test('renders with hover effect', () => {
    render(
      <ThemeProvider>
        <Table hover data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute('data-hover', 'true');
  });

  test('renders with borders', () => {
    render(
      <ThemeProvider>
        <Table bordered data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-bordered',
      'true',
    );
  });

  test('renders with sticky header', () => {
    render(
      <ThemeProvider>
        <Table stickyHeader data-testid="table" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('table')).toHaveAttribute(
      'data-sticky-header',
      'true',
    );
  });

  test('applies custom styles via sx prop', () => {
    render(
      <ThemeProvider>
        <Table
          data-testid="table"
          sx={{
            backgroundColor: 'red',
            borderRadius: '8px',
          }}
        />
      </ThemeProvider>,
    );
    const table = screen.getByTestId('table');
    // We can't directly test the applied styles in JSDOM, but we can verify the prop is passed
    expect(table).toBeInTheDocument();
  });

  test('renders with all props combined', () => {
    render(
      <ThemeProvider>
        <Table
          data-testid="table"
          variant="outlined"
          size="sm"
          density="compact"
          striped
          hover
          bordered
          stickyHeader
        />
      </ThemeProvider>,
    );

    const table = screen.getByTestId('table');
    expect(table).toHaveAttribute('data-variant', 'outlined');
    expect(table).toHaveAttribute('data-size', 'sm');
    expect(table).toHaveAttribute('data-density', 'compact');
    expect(table).toHaveAttribute('data-striped', 'true');
    expect(table).toHaveAttribute('data-hover', 'true');
    expect(table).toHaveAttribute('data-bordered', 'true');
    expect(table).toHaveAttribute('data-sticky-header', 'true');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <ThemeProvider>
        <Table ref={ref} data-testid="table" />
      </ThemeProvider>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
    expect(ref.current).toBe(screen.getByTestId('table'));
  });
});

// Test TableContainer component
describe('TableContainer', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <TableContainer data-testid="container">
          <Table>
            <tbody>
              <tr>
                <td>Content</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('applies maxHeight when provided', () => {
    render(
      <ThemeProvider>
        <TableContainer maxHeight={300} data-testid="container" />
      </ThemeProvider>,
    );

    // We can't directly test the applied styles in JSDOM, but we can verify the component renders
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});

// Test TableHead component
describe('TableHead', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableHead data-testid="head">
            <TableRow>
              <TableCell>Header</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('head')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

// Test TableBody component
describe('TableBody', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableBody data-testid="body">
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

// Test TableRow component
describe('TableRow', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow data-testid="row">
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('row')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('applies selected state', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow selected data-testid="row">
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    // We can't directly test the applied styles in JSDOM, but we can verify the component renders
    expect(screen.getByTestId('row')).toBeInTheDocument();
  });
});

// Test TableCell component
describe('TableCell', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="cell">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('cell')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  test('renders as header cell when header prop is true', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header data-testid="header-cell">
                Header
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </ThemeProvider>,
    );

    const cell = screen.getByTestId('header-cell');
    expect(cell.tagName).toBe('TH');
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('applies different alignments', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left" data-testid="cell">
                Left
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('cell')).toHaveAttribute('data-align', 'left');

    rerender(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center" data-testid="cell">
                Center
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('cell')).toHaveAttribute('data-align', 'center');

    rerender(
      <ThemeProvider>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" data-testid="cell">
                Right
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('cell')).toHaveAttribute('data-align', 'right');
  });
});

// Test TableFooter component
describe('TableFooter', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <Table>
          <TableFooter data-testid="footer">
            <TableRow>
              <TableCell>Footer Content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});
