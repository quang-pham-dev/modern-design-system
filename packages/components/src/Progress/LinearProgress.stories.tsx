import type { Meta, StoryObj } from '@storybook/react';
import { LinearProgress } from './LinearProgress';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof LinearProgress> = {
  title: 'Feedback/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The value of the progress indicator (0-100)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'The variant of the progress indicator',
    },
    indeterminate: {
      control: 'boolean',
      description: 'If true, the progress indicator will be indeterminate',
    },
    thickness: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'The thickness of the progress bar in pixels',
    },
    rounded: {
      control: 'boolean',
      description: 'If true, the progress indicator will have rounded corners',
    },
    buffer: {
      control: 'boolean',
      description:
        'If true, the progress indicator will be displayed with a buffer',
    },
    bufferValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The value of the buffer (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

// Basic Linear Progress
export const Basic: Story = {
  render: () => (
    <Box width="300px">
      <Typography variant="body2">Basic Progress (50%)</Typography>
      <LinearProgress
        value={50}
        variant="primary"
        thickness={4}
        rounded={true}
      />
    </Box>
  ),
};

// Indeterminate Linear Progress
export const Indeterminate: Story = {
  render: () => (
    <Box width="300px">
      <Typography variant="body2">Indeterminate Progress</Typography>
      <LinearProgress
        indeterminate
        variant="primary"
        thickness={4}
        rounded={true}
      />
    </Box>
  ),
};

// Different Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px" width="300px">
      <Box gap={4}>
        <Typography variant="body2">Primary</Typography>
        <LinearProgress variant="primary" value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Secondary</Typography>
        <LinearProgress variant="secondary" value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Success</Typography>
        <LinearProgress variant="success" value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Warning</Typography>
        <LinearProgress variant="warning" value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Error</Typography>
        <LinearProgress variant="error" value={60} />
      </Box>
    </Box>
  ),
};

// Different Thickness
export const Thickness: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px" width="300px">
      <Box>
        <Typography variant="body2">Thickness: 2px</Typography>
        <LinearProgress thickness={2} value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Thickness: 4px (default)</Typography>
        <LinearProgress thickness={4} value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Thickness: 8px</Typography>
        <LinearProgress thickness={8} value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Thickness: 12px</Typography>
        <LinearProgress thickness={12} value={60} />
      </Box>
    </Box>
  ),
};

// Rounded vs Non-Rounded
export const RoundedVsNonRounded: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px" width="300px">
      <Box>
        <Typography variant="body2">Rounded (default)</Typography>
        <LinearProgress rounded value={60} />
      </Box>
      <Box>
        <Typography variant="body2">Non-Rounded</Typography>
        <LinearProgress rounded={false} value={60} />
      </Box>
    </Box>
  ),
};

// Buffer Progress
export const Buffer: Story = {
  args: {
    value: 30,
    bufferValue: 60,
    buffer: true,
    variant: 'primary',
    thickness: 4,
    rounded: true,
  },
};

// Progress with Different Values
export const DifferentValues: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px" width="300px">
      <Box gap={4}>
        <Typography variant="body2">0%</Typography>
        <LinearProgress value={0} />
      </Box>
      <Box>
        <Typography variant="body2">25%</Typography>
        <LinearProgress value={25} />
      </Box>
      <Box>
        <Typography variant="body2">50%</Typography>
        <LinearProgress value={50} />
      </Box>
      <Box>
        <Typography variant="body2">75%</Typography>
        <LinearProgress value={75} />
      </Box>
      <Box>
        <Typography variant="body2">100%</Typography>
        <LinearProgress value={100} />
      </Box>
    </Box>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Typography variant="body1">Loading Progress: 70%</Typography>
        <LinearProgress value={70} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">0%</Typography>
          <Typography variant="body2">100%</Typography>
        </Box>
      </Box>
    );
  },
};

// Buffer with Different Values
export const BufferWithDifferentValues: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" width="300px">
      <Box>
        <Typography variant="body2">Progress: 20%, Buffer: 40%</Typography>
        <LinearProgress value={20} bufferValue={40} buffer />
      </Box>
      <Box>
        <Typography variant="body2">Progress: 40%, Buffer: 60%</Typography>
        <LinearProgress value={40} bufferValue={60} buffer />
      </Box>
      <Box>
        <Typography variant="body2">Progress: 60%, Buffer: 80%</Typography>
        <LinearProgress value={60} bufferValue={80} buffer />
      </Box>
    </Box>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" width="400px">
      <Box padding="16px" border="1px solid #e0e0e0" borderRadius="8px" gap={8}>
        <Typography variant="body1">File Upload</Typography>
        <LinearProgress value={35} />
        <Box display="flex" justifyContent="space-between" marginTop="4px">
          <Typography variant="caption">35% Complete</Typography>
          <Typography variant="caption">2.4 MB / 6.8 MB</Typography>
        </Box>
      </Box>

      <Box padding="16px" border="1px solid #e0e0e0" borderRadius="8px" gap={4}>
        <Typography variant="body1">Processing Data</Typography>
        <LinearProgress indeterminate />
        <Typography variant="caption">Please wait...</Typography>
      </Box>

      <Box padding="16px" border="1px solid #e0e0e0" borderRadius="8px">
        <Typography variant="body1">Download Progress</Typography>
        <LinearProgress value={80} buffer bufferValue={95} variant="success" />
        <Box display="flex" justifyContent="space-between" marginTop="4px">
          <Typography variant="caption">80% Downloaded</Typography>
          <Typography variant="caption">95% Buffered</Typography>
        </Box>
      </Box>
    </Box>
  ),
};

// Animated Progress
export const AnimatedProgress: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" width="300px">
      <Typography variant="body1">Progress Animation</Typography>
      <Box>
        <Typography variant="body2">Slow Animation</Typography>
        <LinearProgress
          value={60}
          sx={{
            '& > div:nth-of-type(2)': {
              transition: 'transform 2s ease-out',
            },
          }}
        />
      </Box>
      <Box>
        <Typography variant="body2">Fast Animation</Typography>
        <LinearProgress
          value={60}
          sx={{
            '& > div:nth-of-type(2)': {
              transition: 'transform 0.2s linear',
            },
          }}
        />
      </Box>
      <Box>
        <Typography variant="body2">Custom Color</Typography>
        <LinearProgress
          value={60}
          sx={{
            '& > div:nth-of-type(2)': {
              backgroundColor: '#8E44AD',
            },
          }}
        />
      </Box>
    </Box>
  ),
};
