/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta = {
  title: 'Form/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current value of the slider',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Default value of the slider',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value of the slider',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value of the slider',
    },
    step: {
      control: { type: 'number', min: 1 },
      description: 'Step value of the slider',
    },
    isDisabled: {
      control: 'boolean',
      description: 'If true, the slider will be disabled',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'If true, the slider will be read-only',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the slider',
    },
    showValue: {
      control: 'boolean',
      description: 'If true, the slider will show the current value',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'success', 'error', 'warning'],
      description: 'Color scheme of the slider',
    },
    isVertical: {
      control: 'boolean',
      description: 'If true, the slider will be oriented vertically',
    },
    verticalHeight: {
      control: 'text',
      description: 'Height of the vertical slider',
    },
    horizontalWidth: {
      control: 'text',
      description: 'Width of the horizontal slider',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Slider
export const Basic: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <Box width="300px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};

// Slider with Value Display
export const WithValueDisplay: Story = {
  args: {
    defaultValue: 50,
    showValue: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <Box width="300px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState(30);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(70);

    return (
      <Box display="flex" flexDirection="column" gap="2rem" width="300px">
        <Box>
          <Typography fontSize="sm">Small</Typography>
          <Slider size="sm" value={value1} onChange={setValue1} />
        </Box>
        <Box>
          <Typography fontSize="sm">Medium (default)</Typography>
          <Slider size="md" value={value2} onChange={setValue2} />
        </Box>
        <Box>
          <Typography fontSize="sm">Large</Typography>
          <Slider size="lg" value={value3} onChange={setValue3} />
        </Box>
      </Box>
    );
  },
};

// Different Color Schemes
export const ColorSchemes: Story = {
  render: () => {
    const [value1, setValue1] = useState(25);
    const [value2, setValue2] = useState(50);
    const [value3, setValue3] = useState(75);
    const [value4, setValue4] = useState(60);

    return (
      <Box display="flex" flexDirection="column" gap="2rem" width="300px">
        <Box>
          <Typography fontSize="sm">Primary (default)</Typography>
          <Slider colorScheme="primary" value={value1} onChange={setValue1} />
        </Box>
        <Box>
          <Typography fontSize="sm">Success</Typography>
          <Slider colorScheme="success" value={value2} onChange={setValue2} />
        </Box>
        <Box>
          <Typography fontSize="sm">Error</Typography>
          <Slider colorScheme="error" value={value3} onChange={setValue3} />
        </Box>
        <Box>
          <Typography fontSize="sm">Warning</Typography>
          <Slider colorScheme="warning" value={value4} onChange={setValue4} />
        </Box>
      </Box>
    );
  },
};

// Vertical Slider
export const Vertical: Story = {
  args: {
    isVertical: true,
    verticalHeight: '200px',
    defaultValue: 50,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <Box height="220px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};

// Disabled Slider
export const Disabled: Story = {
  args: {
    defaultValue: 50,
    isDisabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <Box width="300px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};

// Custom Range
export const CustomRange: Story = {
  args: {
    min: -50,
    max: 50,
    defaultValue: 0,
    showValue: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 0);
    return (
      <Box width="300px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};

// Custom Step
export const CustomStep: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    showValue: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue || 50);
    return (
      <Box width="300px">
        <Slider {...args} value={value} onChange={setValue} />
      </Box>
    );
  },
};
