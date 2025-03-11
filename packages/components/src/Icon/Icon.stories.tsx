import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'info-circle',
        'check-circle',
        'exclamation-triangle',
        'exclamation-circle',
        'times',
        'spinner',
        'check',
        'times-circle',
        'bell',
        'envelope',
        'user',
        'cog',
        'search',
        'home',
        'trash',
        'edit',
        'download',
        'upload',
        'plus',
        'minus',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
      ],
    },
    spin: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'info-circle',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon name="info-circle" size="xs" />
      <Icon name="info-circle" size="sm" />
      <Icon name="info-circle" size="md" />
      <Icon name="info-circle" size="lg" />
      <Icon name="info-circle" size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon name="info-circle" color="primary" />
      <Icon name="info-circle" color="secondary" />
      <Icon name="info-circle" color="success" />
      <Icon name="info-circle" color="error" />
      <Icon name="info-circle" color="warning" />
      <Icon name="info-circle" color="info" />
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Icon name="spinner" spin />
      <Icon name="spinner" pulse />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
      }}
    >
      <Icon name="info-circle" />
      <Icon name="check-circle" />
      <Icon name="exclamation-triangle" />
      <Icon name="exclamation-circle" />
      <Icon name="times" />
      <Icon name="spinner" />
      <Icon name="check" />
      <Icon name="times-circle" />
      <Icon name="bell" />
      <Icon name="envelope" />
      <Icon name="user" />
      <Icon name="cog" />
      <Icon name="search" />
      <Icon name="home" />
      <Icon name="trash" />
      <Icon name="edit" />
      <Icon name="download" />
      <Icon name="upload" />
      <Icon name="plus" />
      <Icon name="minus" />
    </div>
  ),
};
