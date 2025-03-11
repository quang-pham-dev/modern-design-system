import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular', 'rounded'],
      description: 'The variant of the skeleton',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'The animation type',
    },
    width: {
      control: 'text',
      description: 'The width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'The height of the skeleton',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic Skeleton
export const Basic: Story = {
  args: {
    variant: 'text',
    animation: 'pulse',
    width: 200,
  },
};

// Text Skeleton
export const Text: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="8px" width="300px">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="70%" />
    </Box>
  ),
};

// Rectangular Skeleton
export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 150,
  },
};

// Circular Skeleton
export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 80,
    height: 80,
  },
};

// Rounded Skeleton
export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 300,
    height: 150,
  },
};

// Animation Types
export const AnimationTypes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Box display="flex" alignItems="center" gap="16px">
        <Skeleton
          variant="rectangular"
          width={100}
          height={100}
          animation="pulse"
        />
        <Typography>Pulse Animation</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="16px">
        <Skeleton
          variant="rectangular"
          width={100}
          height={100}
          animation="wave"
        />
        <Typography>Wave Animation</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="16px">
        <Skeleton
          variant="rectangular"
          width={100}
          height={100}
          animation="none"
        />
        <Typography>No Animation</Typography>
      </Box>
    </Box>
  ),
};

// Card Skeleton
export const CardSkeleton: Story = {
  render: () => (
    <Box
      display="flex"
      flexDirection="column"
      width="300px"
      padding="16px"
      border="1px solid #e0e0e0"
      borderRadius="8px"
    >
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Box marginTop="16px">
        <Skeleton variant="text" width="80%" />
      </Box>
      <Box marginTop="8px">
        <Skeleton variant="text" width="60%" />
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="16px">
        <Skeleton variant="rounded" width="80px" height="32px" />
        <Skeleton variant="circular" width="32px" height="32px" />
      </Box>
    </Box>
  ),
};

// Profile Skeleton
export const ProfileSkeleton: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="16px" width="400px">
      <Skeleton variant="circular" width={80} height={80} />
      <Box display="flex" flexDirection="column" gap="8px" flex={1}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rounded" width="120px" height="24px" />
      </Box>
    </Box>
  ),
};
