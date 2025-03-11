import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './index';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    fullWidth: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an informational alert.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Information',
    children: 'This is an informational alert with a title.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Operation completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'This action might have consequences.',
  },
};

export const Errors: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred while processing your request.',
  },
};

export const Closable: Story = {
  args: {
    title: 'Closable Alert',
    closable: true,
    children: 'Click the X button to close this alert.',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'This alert takes up the full width of its container.',
  },
};
