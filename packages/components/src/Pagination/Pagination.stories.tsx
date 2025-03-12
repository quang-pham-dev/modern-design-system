/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1 },
      description: 'The total number of pages',
    },
    page: {
      control: { type: 'number', min: 1 },
      description: 'The current page',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the pagination component',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circular', 'square'],
      description: 'The shape of the pagination items',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'The variant to use',
    },
    hideNextButton: {
      control: 'boolean',
      description: 'If true, hide the next-page button',
    },
    hidePrevButton: {
      control: 'boolean',
      description: 'If true, hide the previous-page button',
    },
    hideFirstButton: {
      control: 'boolean',
      description: 'If true, hide the first-page button',
    },
    hideLastButton: {
      control: 'boolean',
      description: 'If true, hide the last-page button',
    },
    boundaryCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of always visible pages at the beginning and end',
    },
    siblingCount: {
      control: { type: 'number', min: 0 },
      description:
        'Number of always visible pages before and after the current page',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// Basic Pagination
export const Basic: Story = {
  args: {
    count: 10,
    page: 1,
  },
};

// Controlled Pagination
const ControlledPagination = () => {
  const [page, setPage] = useState(1);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="16px">
      <Typography variant="body1">Current Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Box>
  );
};

export const Controlled: Story = {
  render: () => <ControlledPagination />,
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Small</Typography>
        <Pagination count={10} size="sm" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Medium (Default)</Typography>
        <Pagination count={10} size="md" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Large</Typography>
        <Pagination count={10} size="lg" />
      </Box>
    </Box>
  ),
};

// Different Shapes
export const Shapes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Circular (Default)</Typography>
        <Pagination count={10} shape="circular" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Rounded</Typography>
        <Pagination count={10} shape="rounded" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Square</Typography>
        <Pagination count={10} shape="square" />
      </Box>
    </Box>
  ),
};

// Different Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Outlined (Default)</Typography>
        <Pagination count={10} variant="outlined" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Filled</Typography>
        <Pagination count={10} variant="filled" />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Text</Typography>
        <Pagination count={10} variant="text" />
      </Box>
    </Box>
  ),
};

// Disabled Pagination
export const Disabled: Story = {
  args: {
    count: 10,
    disabled: true,
  },
};

// With Many Pages
export const WithManyPages: Story = {
  args: {
    count: 50,
    page: 25,
  },
};

// Custom Boundary Count
export const CustomBoundaryCount: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Default (boundaryCount=1)</Typography>
        <Pagination count={20} page={10} />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">boundaryCount=2</Typography>
        <Pagination count={20} page={10} boundaryCount={2} />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">boundaryCount=3</Typography>
        <Pagination count={20} page={10} boundaryCount={3} />
      </Box>
    </Box>
  ),
};

// Custom Sibling Count
export const CustomSiblingCount: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Default (siblingCount=1)</Typography>
        <Pagination count={20} page={10} />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">siblingCount=2</Typography>
        <Pagination count={20} page={10} siblingCount={2} />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">siblingCount=3</Typography>
        <Pagination count={20} page={10} siblingCount={3} />
      </Box>
    </Box>
  ),
};

// Hide Navigation Buttons
export const HideNavigationButtons: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box gap={8}>
        <Typography variant="caption">Hide First/Last Buttons</Typography>
        <Pagination count={10} hideFirstButton hideLastButton />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Hide Prev/Next Buttons</Typography>
        <Pagination count={10} hidePrevButton hideNextButton />
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Hide All Navigation Buttons</Typography>
        <Pagination
          count={10}
          hideFirstButton
          hideLastButton
          hidePrevButton
          hideNextButton
        />
      </Box>
    </Box>
  ),
};

// Pagination in Context
export const PaginationInContext: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 237;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <Box
        width="100%"
        maxWidth="800px"
        padding="24px"
        backgroundColor="#f5f5f5"
        borderRadius="8px"
      >
        <Box
          padding="16px 24px"
          backgroundColor="white"
          borderRadius="8px"
          boxShadow="0 2px 4px rgba(0,0,0,0.05)"
          marginBottom="16px"
          gap={8}
        >
          <Typography variant="h5">Product List</Typography>
          <Typography variant="body2" color="text.secondary">
            Showing items {(page - 1) * itemsPerPage + 1}-
            {Math.min(page * itemsPerPage, totalItems)} of {totalItems}
          </Typography>
        </Box>

        <Box
          padding="24px"
          backgroundColor="white"
          borderRadius="8px"
          boxShadow="0 2px 4px rgba(0,0,0,0.05)"
          marginBottom="16px"
          height="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1">Page {page} Content</Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          padding="16px"
          backgroundColor="white"
          borderRadius="8px"
          boxShadow="0 2px 4px rgba(0,0,0,0.05)"
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            size="md"
            shape="rounded"
          />
        </Box>
      </Box>
    );
  },
};

// Responsive Pagination
export const ResponsivePagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    return (
      <Box display="flex" flexDirection="column" gap="32px">
        <Box width="100%" gap={8}>
          <Typography variant="caption">Desktop View</Typography>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            size="md"
          />
        </Box>

        <Box width="400px" gap={8}>
          <Typography variant="caption">Tablet View</Typography>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            size="md"
            hideFirstButton
            hideLastButton
          />
        </Box>

        <Box width="250px" gap={8}>
          <Typography variant="caption">Mobile View</Typography>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            size="sm"
            hideFirstButton
            hideLastButton
            siblingCount={0}
          />
        </Box>
      </Box>
    );
  },
};
