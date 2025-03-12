import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Custom separator between breadcrumbs',
    },
    maxItems: {
      control: { type: 'number', min: 1 },
      description: 'Maximum number of items to display',
    },
    expanded: {
      control: 'boolean',
      description: 'If true, the collapsed items will be shown',
    },
    collapseText: {
      control: 'text',
      description: 'Custom collapse text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the breadcrumbs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Basic Breadcrumbs
export const Basic: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs>
        <a href="#">Home</a>
        <a href="#">Category</a>
        <span>Product</span>
      </Breadcrumbs>
    </Box>
  ),
};

// Custom Separator
export const CustomSeparator: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs separator=">">
        <a href="#">Home</a>
        <a href="#">Category</a>
        <span>Product</span>
      </Breadcrumbs>
    </Box>
  ),
};

// Icon Separator
export const IconSeparator: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs separator={<span>•</span>}>
        <a href="#">Home</a>
        <a href="#">Category</a>
        <span>Product</span>
      </Breadcrumbs>
    </Box>
  ),
};

// With Max Items
export const WithMaxItems: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs maxItems={3}>
        <a href="#">Home</a>
        <a href="#">Category</a>
        <a href="#">Subcategory</a>
        <a href="#">Product Type</a>
        <span>Product Name</span>
      </Breadcrumbs>
    </Box>
  ),
};

// Expanded
export const Expanded: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs maxItems={3} expanded>
        <a href="#">Home</a>
        <a href="#">Category</a>
        <a href="#">Subcategory</a>
        <a href="#">Product Type</a>
        <span>Product Name</span>
      </Breadcrumbs>
    </Box>
  ),
};

// Custom Collapse Text
export const CustomCollapseText: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs maxItems={3} collapseText="[...]">
        <a href="#">Home</a>
        <a href="#">Category</a>
        <a href="#">Subcategory</a>
        <a href="#">Product Type</a>
        <span>Product Name</span>
      </Breadcrumbs>
    </Box>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" width="500px">
      <Box gap={8}>
        <Typography variant="caption">Small Size</Typography>
        <Breadcrumbs size="sm">
          <a href="#">Home</a>
          <a href="#">Category</a>
          <span>Product</span>
        </Breadcrumbs>
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Medium Size (Default)</Typography>
        <Breadcrumbs size="md">
          <a href="#">Home</a>
          <a href="#">Category</a>
          <span>Product</span>
        </Breadcrumbs>
      </Box>
      <Box gap={8}>
        <Typography variant="caption">Large Size</Typography>
        <Breadcrumbs size="lg">
          <a href="#">Home</a>
          <a href="#">Category</a>
          <span>Product</span>
        </Breadcrumbs>
      </Box>
    </Box>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <Box width="500px">
      <Breadcrumbs>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>🏠</span>
          <span>Home</span>
        </a>
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>📁</span>
          <span>Category</span>
        </a>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>📦</span>
          <span>Product</span>
        </span>
      </Breadcrumbs>
    </Box>
  ),
};

// In a Page Context
export const InPageContext: Story = {
  render: () => (
    <Box
      width="800px"
      padding="24px"
      backgroundColor="#f5f5f5"
      borderRadius="8px"
    >
      <Box marginBottom="16px">
        <Breadcrumbs>
          <a href="#">Dashboard</a>
          <a href="#">Products</a>
          <a href="#">Electronics</a>
          <span>Smartphones</span>
        </Breadcrumbs>
      </Box>
      <Box
        padding="24px"
        backgroundColor="white"
        borderRadius="8px"
        boxShadow="0 2px 4px rgba(0,0,0,0.05)"
      >
        <Typography variant="h4">Smartphones</Typography>
        <Typography variant="body1">
          Browse our collection of the latest smartphones from top brands.
        </Typography>
      </Box>
    </Box>
  ),
};

// Responsive Breadcrumbs
export const ResponsiveBreadcrumbs: Story = {
  render: () => (
    <Box width="100%" maxWidth="800px">
      <Box width="100%" marginBottom="16px">
        <Typography variant="caption">Desktop View (Full Width)</Typography>
        <Breadcrumbs>
          <a href="#">Home</a>
          <a href="#">Electronics</a>
          <a href="#">Phones</a>
          <a href="#">Smartphones</a>
          <span>iPhone 13</span>
        </Breadcrumbs>
      </Box>
      <Box width="400px" marginBottom="16px">
        <Typography variant="caption">Tablet View (400px)</Typography>
        <Breadcrumbs maxItems={4}>
          <a href="#">Home</a>
          <a href="#">Electronics</a>
          <a href="#">Phones</a>
          <a href="#">Smartphones</a>
          <span>iPhone 13</span>
        </Breadcrumbs>
      </Box>
      <Box width="300px">
        <Typography variant="caption">Mobile View (300px)</Typography>
        <Breadcrumbs maxItems={2}>
          <a href="#">Home</a>
          <a href="#">Electronics</a>
          <a href="#">Phones</a>
          <a href="#">Smartphones</a>
          <span>iPhone 13</span>
        </Breadcrumbs>
      </Box>
    </Box>
  ),
};
