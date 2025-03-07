import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Input } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'standard'],
      description: 'Visual style variant of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the input should take up the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Icon component for adornment examples
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="SearchIcon"
  >
    <title id="sendIconTitle">Search</title>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Input variant="outlined" placeholder="Outlined input" />
      <Input variant="filled" placeholder="Filled input" />
      <Input variant="standard" placeholder="Standard input" />
    </Box>
  ),
};

export const States: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Input placeholder="Default input" />
      <Input disabled placeholder="Disabled input" />
      <Input error placeholder="Error input" />
    </Box>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Input
        startAdornment={<SearchIcon />}
        placeholder="With start adornment"
      />
      <Input endAdornment={<span>$</span>} placeholder="With end adornment" />
      <Input
        startAdornment={<SearchIcon />}
        endAdornment={<span>$</span>}
        placeholder="With both adornments"
      />
    </Box>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return (
      <Box display="flex" flexDirection="column" gap="16px">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled input"
        />
        <Box>Current value: {value || '(empty)'}</Box>
      </Box>
    );
  },
};

export const WithFormValidation: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isValid, setIsValid] = useState(true);

    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return value === '' || emailRegex.test(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setEmail(newValue);
      setIsValid(validateEmail(newValue));
    };

    return (
      <Box display="flex" flexDirection="column" gap="8px">
        <Input
          value={email}
          onChange={handleChange}
          error={!isValid}
          placeholder="Enter email address"
          fullWidth
        />
        {!isValid && (
          <Typography color="error.main" fontSize="xs">
            Please enter a valid email address
          </Typography>
        )}
      </Box>
    );
  },
};
