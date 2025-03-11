import type { Meta, StoryObj } from '@storybook/react';
import { FormControl } from './index';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { Stack } from '../Stack';

const meta: Meta<typeof FormControl> = {
  title: 'Form/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the form control',
    },
    helperText: {
      control: 'text',
      description: 'The helper text for the form control',
    },
    errorMessage: {
      control: 'text',
      description: 'The error message for the form control',
    },
    error: {
      control: 'boolean',
      description: 'If true, the form control will be in an error state',
    },
    required: {
      control: 'boolean',
      description: 'If true, the form control will be required',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the form control will be disabled',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the form control',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormControl>;

export const Default: Story = {
  args: {
    label: 'Email',
    helperText: 'We will never share your email',
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: true,
    errorMessage: 'Please enter a valid email address',
    children: <Input placeholder="Enter your email" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <Input placeholder="Enter your email" />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    disabled: true,
    helperText: 'This field is currently disabled',
    children: <Input placeholder="Enter your email" />,
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    helperText: 'Select your country',
    children: (
      <Select
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'mx', label: 'Mexico' },
        ]}
        placeholder="Select a country"
      />
    ),
  },
};

export const WithCheckbox: Story = {
  args: {
    helperText: 'Accept the terms and conditions',
    children: <Checkbox label="I agree to the terms and conditions" />,
  },
};

export const WithSwitch: Story = {
  args: {
    helperText: 'Enable notifications',
    children: <Switch label="Notifications" />,
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <Stack spacing={4}>
      <FormControl label="Small" size="sm">
        <Input placeholder="Small input" />
      </FormControl>
      <FormControl label="Medium" size="md">
        <Input placeholder="Medium input" />
      </FormControl>
      <FormControl label="Large" size="lg">
        <Input placeholder="Large input" />
      </FormControl>
    </Stack>
  ),
};

export const FormExample: Story = {
  render: () => (
    <Stack spacing={20} style={{ width: '400px' }}>
      <FormControl label="Full Name" required>
        <Input placeholder="Enter your full name" />
      </FormControl>
      <FormControl label="Email" required>
        <Input placeholder="Enter your email" type="email" />
      </FormControl>
      <FormControl label="Country">
        <Select
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
          placeholder="Select a country"
        />
      </FormControl>
      <FormControl>
        <Checkbox label="Subscribe to newsletter" />
      </FormControl>
      <FormControl>
        <Switch label="Enable notifications" />
      </FormControl>
    </Stack>
  ),
};
