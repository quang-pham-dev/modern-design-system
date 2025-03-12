import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the avatar',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'The variant of the avatar',
    },
    src: {
      control: 'text',
      description: 'The image source',
    },
    alt: {
      control: 'text',
      description: 'The alt text for the image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic Avatar with Text
export const Basic: Story = {
  args: {
    children: 'JD',
  },
};

// Avatar with Image
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    alt: 'User Avatar',
  },
};

// Avatar Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="16px">
      <Avatar size="sm">SM</Avatar>
      <Avatar size="md">MD</Avatar>
      <Avatar size="lg">LG</Avatar>
    </Box>
  ),
};

// Avatar Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="16px">
      <Avatar variant="circular">C</Avatar>
      <Avatar variant="rounded">R</Avatar>
      <Avatar variant="square">S</Avatar>
    </Box>
  ),
};

// Avatar with Fallback
export const WithFallback: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="16px">
      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80">
        JD
      </Avatar>
    </Box>
  ),
};

// Avatar Group Example
export const GroupExample: Story = {
  render: () => (
    <Box>
      <Typography variant="caption">Avatar Group</Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          '& > *:not(:first-of-type)': {
            marginLeft: '-8px',
          },
        }}
      >
        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
        <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
        <Avatar>+3</Avatar>
      </Box>
    </Box>
  ),
};

// Avatar with Different Colors
export const Colors: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="16px">
      <Avatar sx={{ backgroundColor: '#1976d2' }}>B</Avatar>
      <Avatar sx={{ backgroundColor: '#dc004e' }}>R</Avatar>
      <Avatar sx={{ backgroundColor: '#4caf50' }}>G</Avatar>
      <Avatar sx={{ backgroundColor: '#ff9800' }}>O</Avatar>
    </Box>
  ),
};
