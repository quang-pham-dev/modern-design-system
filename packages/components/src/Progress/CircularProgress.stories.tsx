import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgress } from './CircularProgress';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Grid } from '..';

const meta: Meta<typeof CircularProgress> = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the progress indicator',
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 0.1 },
      description: 'The thickness of the progress circle in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

// Basic Circular Progress
export const Basic: Story = {
  args: {
    value: 50,
    variant: 'primary',
    indeterminate: false,
    size: 'md',
    thickness: 3.6,
  },
};

// Indeterminate Circular Progress
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    variant: 'primary',
    size: 'md',
    thickness: 3.6,
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" alignItems="center" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress size="sm" value={75} />
        <Typography variant="body2">Small</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress size="md" value={75} />
        <Typography variant="body2">Medium</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress size="lg" value={75} />
        <Typography variant="body2">Large</Typography>
      </Box>
    </Box>
  ),
};

// Different Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="primary" value={75} />
        <Typography variant="body2">Primary</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="secondary" value={75} />
        <Typography variant="body2">Secondary</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="success" value={75} />
        <Typography variant="body2">Success</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="warning" value={75} />
        <Typography variant="body2">Warning</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="error" value={75} />
        <Typography variant="body2">Error</Typography>
      </Box>
    </Box>
  ),
};

// Different Thickness
export const Thickness: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress thickness={2} value={75} />
        <Typography variant="body2">2px</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress thickness={3.6} value={75} />
        <Typography variant="body2">3.6px (default)</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress thickness={6} value={75} />
        <Typography variant="body2">6px</Typography>
      </Box>
    </Box>
  ),
};

// Progress with Different Values
export const DifferentValues: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress value={0} />
        <Typography variant="body2">0%</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress value={25} />
        <Typography variant="body2">25%</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress value={50} />
        <Typography variant="body2">50%</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress value={75} />
        <Typography variant="body2">75%</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress value={100} />
        <Typography variant="body2">100%</Typography>
      </Box>
    </Box>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    // This would be more interactive in a real Storybook environment
    // with React hooks, but for simplicity we'll show a static example
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap="16px">
        <CircularProgress value={70} size="lg" />
        <Typography variant="body1">Loading: 70%</Typography>
      </Box>
    );
  },
};

// Indeterminate Variants
export const IndeterminateVariants: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="primary" indeterminate />
        <Typography variant="body2">Primary</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="secondary" indeterminate />
        <Typography variant="body2">Secondary</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="success" indeterminate />
        <Typography variant="body2">Success</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="warning" indeterminate />
        <Typography variant="body2">Warning</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress variant="error" indeterminate />
        <Typography variant="body2">Error</Typography>
      </Box>
    </Box>
  ),
};

// With Label
export const WithLabel: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress value={75} size="lg" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2" component="div">
              75%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2">With Value</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress indeterminate size="lg" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2" component="div">
              ...
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2">Indeterminate</Typography>
      </Box>
    </Box>
  ),
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress
          value={75}
          sx={{
            color: '#8E44AD', // Purple color
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography variant="body2">Custom Purple</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress
          value={75}
          sx={{
            color: '#F39C12', // Orange color
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography variant="body2">Custom Orange</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <CircularProgress
          value={75}
          sx={{
            color: '#16A085', // Teal color
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography variant="body2">Custom Teal</Typography>
      </Box>
    </Box>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px">
      <Box display="flex" alignItems="center" gap="16px">
        <CircularProgress size="sm" indeterminate />
        <Typography>Loading data...</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        padding="16px"
        border="1px solid #e0e0e0"
        borderRadius="8px"
        width="300px"
      >
        <Box display="flex" justifyContent="center" padding="32px">
          <CircularProgress indeterminate />
        </Box>
        <Typography align="center">Content is loading</Typography>
      </Box>

      <Box display="flex" alignItems="center" gap="16px">
        <Box>
          <Typography variant="body1" weight="bold">
            Upload Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Uploading file: document.pdf
          </Typography>
        </Box>
        <Box marginLeft="auto" display="flex" alignItems="center" gap="8px">
          <Typography variant="body2">65%</Typography>
          <CircularProgress value={65} size="sm" />
        </Box>
      </Box>
    </Box>
  ),
};

// Responsive Size
export const ResponsiveSize: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Typography variant="body1">Responsive Progress Indicators</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
        <Box flex={1} textAlign="center">
          <CircularProgress
            value={80}
            size="lg"
            sx={{
              '@media (max-width: 600px)': {
                width: '32px !important',
                height: '32px !important',
              },
            }}
          />
          <Typography variant="body2">Desktop: Large, Mobile: Small</Typography>
        </Box>
        <Box flex={1} textAlign="center">
          <CircularProgress
            value={60}
            indeterminate
            sx={{
              '@media (max-width: 600px)': {
                width: '24px !important',
                height: '24px !important',
              },
            }}
          />
          <Typography variant="body2">Responsive Indeterminate</Typography>
        </Box>
      </Box>
    </Box>
  ),
};

// Animated Progress
export const AnimatedProgress: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Typography variant="body1">Animated Progress Indicators</Typography>
      <Box display="flex" gap="24px">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          <CircularProgress
            value={75}
            sx={{
              transition: 'all 0.5s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
          <Typography variant="body2">Hover to Scale</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          <CircularProgress
            value={75}
            sx={{
              animation: 'spin 2s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          />
          <Typography variant="body2">Spinning Animation</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          <CircularProgress
            value={75}
            sx={{
              transition: 'color 0.5s ease',
              '&:hover': {
                color: 'red',
              },
            }}
          />
          <Typography variant="body2">Color Change on Hover</Typography>
        </Box>
      </Box>
    </Box>
  ),
};

// Combined with Other Components
export const CombinedWithOtherComponents: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box
        display="flex"
        alignItems="center"
        padding="16px"
        border="1px solid #e0e0e0"
        borderRadius="8px"
        gap="16px"
      >
        <CircularProgress value={85} size="sm" variant="success" />
        <Typography>System status: Operational</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        padding="16px"
        border="1px solid #e0e0e0"
        borderRadius="8px"
        gap="16px"
      >
        <CircularProgress indeterminate size="sm" variant="warning" />
        <Typography>System status: Under maintenance</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        padding="16px"
        border="1px solid #e0e0e0"
        borderRadius="8px"
        gap="16px"
      >
        <CircularProgress value={25} size="sm" variant="error" />
        <Typography>System status: Degraded performance</Typography>
      </Box>
    </Box>
  ),
};

// Progress Dashboard
export const ProgressDashboard: Story = {
  render: () => (
    <Grid
      display="grid"
      templateColumns="repeat(2, 1fr)"
      gap="24px"
      width="500px"
      padding="16px"
      border="1px solid #e0e0e0"
      borderRadius="8px"
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress value={92} size="lg" variant="success" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="body2" weight="bold">
              92%
            </Typography>
            <Typography variant="caption">Uptime</Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress value={45} size="lg" variant="warning" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="body2" weight="bold">
              45%
            </Typography>
            <Typography variant="caption">CPU</Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress value={78} size="lg" variant="primary" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="body2" weight="bold">
              78%
            </Typography>
            <Typography variant="caption">Memory</Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
        <Box position="relative" display="inline-flex">
          <CircularProgress value={23} size="lg" variant="secondary" />
          <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="body2" weight="bold">
              23%
            </Typography>
            <Typography variant="caption">Disk</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  ),
};
