import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TableContainer } from './TableContainer';
import { Box } from '../Box';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'contained'],
      description: 'The variant of the table',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the table',
    },
    density: {
      control: 'select',
      options: ['default', 'compact', 'comfortable'],
      description: 'The density of the table',
    },
    striped: {
      control: 'boolean',
      description: 'If true, the table will have zebra striping',
    },
    hover: {
      control: 'boolean',
      description: 'If true, the table will have hover effect on rows',
    },
    bordered: {
      control: 'boolean',
      description: 'If true, the table will have borders',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for tables
const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// Basic Table
export const Basic: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert (100g serving)</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Table Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px">
      <Box>
        <h3>Standard</h3>
        <TableContainer>
          <Table variant="standard">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Outlined</h3>
        <TableContainer>
          <Table variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Contained</h3>
        <TableContainer>
          <Table variant="contained">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ),
};

// Table Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px">
      <Box>
        <h3>Small</h3>
        <TableContainer>
          <Table size="sm">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Medium (Default)</h3>
        <TableContainer>
          <Table size="md">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Large</h3>
        <TableContainer>
          <Table size="lg">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ),
};

// Table Densities
export const Densities: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px">
      <Box>
        <h3>Default Density</h3>
        <TableContainer>
          <Table density="default">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Compact Density</h3>
        <TableContainer>
          <Table density="compact">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <h3>Comfortable Density</h3>
        <TableContainer>
          <Table density="comfortable">
            <TableHead>
              <TableRow>
                <TableCell header>Dessert</TableCell>
                <TableCell header align="right">
                  Calories
                </TableCell>
                <TableCell header align="right">
                  Fat (g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ),
};

// Striped Table
export const Striped: Story = {
  render: () => (
    <TableContainer>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Hover Effect
export const Hover: Story = {
  render: () => (
    <TableContainer>
      <Table hover>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Bordered Table
export const Bordered: Story = {
  render: () => (
    <TableContainer>
      <Table bordered>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Table with Footer
export const WithFooter: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.fat, 0)}
            </TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.carbs, 0)}
            </TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.protein, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),
};

// Selected Row
export const SelectedRow: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} selected={index === 1}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Scrollable Table
export const ScrollableTable: Story = {
  render: () => (
    <TableContainer maxHeight={300}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(20)].flatMap((_, index) =>
            rows.map((row) => (
              <TableRow key={`${row.name}-${index}`}>
                <TableCell>{`${row.name} ${index + 1}`}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Customized Table with sx prop
export const CustomizedTable: Story = {
  render: () => (
    <TableContainer>
      <Table
        sx={{
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              header
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Dessert
            </TableCell>
            <TableCell
              header
              align="right"
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Calories
            </TableCell>
            <TableCell
              header
              align="right"
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Fat (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, 3).map(({ name, calories, fat }) => (
            <TableRow
              key={name}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  transition: 'background-color 0.2s ease',
                },
              }}
            >
              <TableCell sx={{ fontWeight: 500 }}>{name}</TableCell>
              <TableCell align="right">{calories}</TableCell>
              <TableCell align="right">{fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

// Combined Features
export const CombinedFeatures: Story = {
  render: () => (
    <TableContainer>
      <Table
        variant="outlined"
        size="sm"
        density="compact"
        striped
        hover
        bordered
      >
        <TableHead>
          <TableRow>
            <TableCell header>Dessert</TableCell>
            <TableCell header align="right">
              Calories
            </TableCell>
            <TableCell header align="right">
              Fat (g)
            </TableCell>
            <TableCell header align="right">
              Carbs (g)
            </TableCell>
            <TableCell header align="right">
              Protein (g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.calories, 0)}
            </TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.fat, 0)}
            </TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.carbs, 0)}
            </TableCell>
            <TableCell align="right">
              {rows.reduce((sum, row) => sum + row.protein, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),
};

// Responsive Table
export const ResponsiveTable: Story = {
  render: () => (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header>Dessert</TableCell>
              <TableCell header align="right">
                Calories
              </TableCell>
              <TableCell header align="right">
                Fat (g)
              </TableCell>
              <TableCell header align="right">
                Carbs (g)
              </TableCell>
              <TableCell header align="right">
                Protein (g)
              </TableCell>
              <TableCell header align="right">
                Added Sugar (g)
              </TableCell>
              <TableCell header align="right">
                Sodium (mg)
              </TableCell>
              <TableCell header align="right">
                Calcium (mg)
              </TableCell>
              <TableCell header align="right">
                Iron (mg)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  {Math.round(row.carbs * 0.3)}
                </TableCell>
                <TableCell align="right">
                  {Math.round(row.calories * 0.5)}
                </TableCell>
                <TableCell align="right">
                  {Math.round(row.calories * 0.1)}
                </TableCell>
                <TableCell align="right">
                  {(row.protein * 0.2).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ),
};
