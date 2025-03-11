/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'If true, the switch will be checked',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the switch will be disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the switch will be in an error state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'The label for the switch',
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Default Switch',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Switch',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const Errors: Story = {
  args: {
    label: 'Error Switch',
    error: true,
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => {
    // Use a single state object for all switches
    const [switchStates, setSwitchStates] = useState({
      sm: false,
      md: false,
      lg: false,
    });

    // Handler to update individual switch states
    const handleSwitchChange = (size: 'sm' | 'md' | 'lg') => {
      setSwitchStates((prev) => ({
        ...prev,
        [size]: !prev[size],
      }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          size="sm"
          label="Small Switch"
          checked={switchStates.sm}
          onChange={() => handleSwitchChange('sm')}
        />
        <Switch
          size="md"
          label="Medium Switch"
          checked={switchStates.md}
          onChange={() => handleSwitchChange('md')}
        />
        <Switch
          size="lg"
          label="Large Switch"
          checked={switchStates.lg}
          onChange={() => handleSwitchChange('lg')}
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checked={checked}
          onChange={() => setChecked(!checked)}
          label={`Switch is ${checked ? 'ON' : 'OFF'}`}
        />
        <p>
          This is a controlled switch component. The current state is:{' '}
          {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
};

export const CustomCheckedColor: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checkedColor="#4caf50"
          checked={checked}
          onChange={() => setChecked(!checked)}
          label="Custom Checked Color"
        />
      </div>
    );
  },
};
export const CustomUncheckedColor: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          uncheckedColor="#bbf6f3"
          checkedColor="#30f8ee"
          checked={checked}
          onChange={() => setChecked(!checked)}
          label="Custom Unchecked Color"
        />
      </div>
    );
  },
};
