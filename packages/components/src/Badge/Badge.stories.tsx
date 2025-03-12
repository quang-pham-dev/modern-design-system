import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { Grid } from '..';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to be displayed within the badge',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the badge',
    },
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
      description: 'The variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the badge',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'The position of the badge',
    },
    invisible: {
      control: 'boolean',
      description: 'If true, the badge will be invisible',
    },
    max: {
      control: 'number',
      description: 'Maximum count to show',
    },
    standalone: {
      control: 'boolean',
      description: 'If true, the badge will be displayed as a standalone badge',
    },
    showZero: {
      control: 'boolean',
      description: 'If true, the badge will show zero value',
    },
    overlap: {
      control: 'select',
      options: ['rectangular', 'circular'],
      description: 'The shape of the badge overlap',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Basic Badge
export const Basic: Story = {
  args: {
    content: 5,
    children: <Box width="40px" height="40px" backgroundColor="grey.200" />,
  },
};

// Badge Colors
export const Colors: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content={5} color="primary">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} color="secondary">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} color="error">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} color="warning">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} color="info">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} color="success">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
    </Box>
  ),
};

// Badge Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="24px" alignItems="center">
      <Badge content={5} size="sm">
        <Box width="32px" height="32px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} size="md">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={5} size="lg">
        <Box width="48px" height="48px" backgroundColor="grey.200" />
      </Badge>
    </Box>
  ),
};

// Badge Positions
export const Positions: Story = {
  render: () => (
    <Grid display="grid" templateColumns="1fr 1fr" gap="24px">
      <Badge content={5} position="top-right">
        <Box
          width="60px"
          height="60px"
          backgroundColor="grey.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption">Top Right</Typography>
        </Box>
      </Badge>
      <Badge content={5} position="top-left">
        <Box
          width="60px"
          height="60px"
          backgroundColor="grey.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption">Top Left</Typography>
        </Box>
      </Badge>
      <Badge content={5} position="bottom-right">
        <Box
          width="60px"
          height="60px"
          backgroundColor="grey.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption">Bottom Right</Typography>
        </Box>
      </Badge>
      <Badge content={5} position="bottom-left">
        <Box
          width="60px"
          height="60px"
          backgroundColor="grey.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption">Bottom Left</Typography>
        </Box>
      </Badge>
    </Grid>
  ),
};

// Badge Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content={5} variant="standard">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge variant="dot">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
    </Box>
  ),
};

// Badge with Max Value
export const MaxValue: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content={5} max={99}>
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={99} max={99}>
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={100} max={99}>
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content={1000} max={999}>
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
    </Box>
  ),
};

// Standalone Badge
export const Standalone: Story = {
  render: () => (
    <Box display="flex" gap="16px" alignItems="center">
      <Badge content={5} standalone />
      <Badge content="New" standalone color="error" />
      <Badge content="Sale" standalone color="success" />
      <Typography>Standalone badges can be used inline with text</Typography>
    </Box>
  ),
};

// Badge with Zero Value
export const ZeroValue: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box>
        <Typography variant="caption">Default (hidden)</Typography>
        <Badge content={0}>
          <Box width="40px" height="40px" backgroundColor="grey.200" />
        </Badge>
      </Box>
      <Box>
        <Typography variant="caption">With showZero</Typography>
        <Badge content={0} showZero>
          <Box width="40px" height="40px" backgroundColor="grey.200" />
        </Badge>
      </Box>
    </Box>
  ),
};

// Badge with Overlap
export const Overlap: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box>
        <Typography variant="caption">Rectangular</Typography>
        <Badge content={5} overlap="rectangular">
          <Box width="40px" height="40px" backgroundColor="grey.200" />
        </Badge>
      </Box>
      <Box>
        <Typography variant="caption">Circular</Typography>
        <Badge content={5} overlap="circular">
          <Avatar>JD</Avatar>
        </Badge>
      </Box>
    </Box>
  ),
};

// Badge with Custom Content
export const CustomContent: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content="New">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content="Hot" color="error">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
      <Badge content="Sale" color="success">
        <Box width="40px" height="40px" backgroundColor="grey.200" />
      </Badge>
    </Box>
  ),
};

// Badge with Button
export const WithButton: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content={5} color="error">
        <Button variant="outline">Notifications</Button>
      </Badge>
      <Badge content={3} color="primary">
        <Button variant="outline">Messages</Button>
      </Badge>
      <Badge variant="dot" color="error">
        <Button variant="text">Updates</Button>
      </Badge>
    </Box>
  ),
};

// Badge with Avatar
export const WithAvatar: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Badge content={5} color="success" overlap="circular">
        <Avatar>JD</Avatar>
      </Badge>
      <Badge variant="dot" color="success" overlap="circular">
        <Avatar>AB</Avatar>
      </Badge>
      <Badge content="Online" color="success" overlap="circular">
        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
      </Badge>
    </Box>
  ),
};

// Invisible Badge
export const Invisible: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <Box>
        <Typography variant="caption">Visible</Typography>
        <Badge content={5}>
          <Box width="40px" height="40px" backgroundColor="grey.200" />
        </Badge>
      </Box>
      <Box>
        <Typography variant="caption">Invisible</Typography>
        <Badge content={5} invisible>
          <Box width="40px" height="40px" backgroundColor="grey.200" />
        </Badge>
      </Box>
    </Box>
  ),
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px">
      <Box display="flex" gap="16px" alignItems="center">
        <Badge content={3} color="error">
          <Button variant="outline" startIcon={<span>🔔</span>}>
            Notifications
          </Button>
        </Badge>
        <Badge content={5} color="primary">
          <Button variant="outline" startIcon={<span>✉️</span>}>
            Messages
          </Button>
        </Badge>
        <Badge content={2} color="warning">
          <Button variant="outline" startIcon={<span>⚠️</span>}>
            Warnings
          </Button>
        </Badge>
      </Box>

      <Box display="flex" gap="16px" alignItems="center">
        <Badge variant="dot" color="success" overlap="circular">
          <Avatar>JD</Avatar>
        </Badge>
        <Box>
          <Typography variant="subtitle1">John Doe</Typography>
          <Typography variant="body2" color="text.secondary">
            Online
          </Typography>
        </Box>
      </Box>

      <Box display="flex" gap="16px" alignItems="center">
        <Badge content="Sale" color="error">
          <Box
            width="80px"
            height="80px"
            backgroundColor="grey.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Product</Typography>
          </Box>
        </Badge>
        <Badge content="New" color="primary">
          <Box
            width="80px"
            height="80px"
            backgroundColor="grey.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Product</Typography>
          </Box>
        </Badge>
        <Badge content="50% Off" color="success">
          <Box
            width="80px"
            height="80px"
            backgroundColor="grey.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Product</Typography>
          </Box>
        </Badge>
      </Box>
    </Box>
  ),
};
