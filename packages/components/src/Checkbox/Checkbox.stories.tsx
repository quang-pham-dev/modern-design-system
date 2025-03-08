import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';

import { Checkbox } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Button } from '../Button';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'The label for the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
  },
};

export const Errors: Story = {
  args: {
    label: 'Error checkbox',
    error: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </Box>
  ),
};

export const States: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked checkbox" checked />
      <Checkbox label="Indeterminate checkbox" indeterminate />
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled checked checkbox" disabled checked />
      <Checkbox label="Error checkbox" error />
    </Box>
  ),
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);

    return (
      <Box display="flex" flexDirection="column" gap="16px">
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <Typography variant="body2">
          Checkbox is {checked ? 'checked' : 'unchecked'}
        </Typography>
      </Box>
    );
  },
};

export const IndeterminateExample: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedItems, setCheckedItems] = useState([false, false, false]);

     
    const allChecked = checkedItems.every(Boolean);
     
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems([e.target.checked, e.target.checked, e.target.checked]);
    };

    const handleChildChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = e.target.checked;
        setCheckedItems(newCheckedItems);
      };

    return (
      <Box display="flex" flexDirection="column" gap="8px">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
        <Box paddingLeft="24px" display="flex" flexDirection="column" gap="8px">
          <Checkbox
            label="Option 1"
            checked={checkedItems[0]}
            onChange={handleChildChange(0)}
          />
          <Checkbox
            label="Option 2"
            checked={checkedItems[1]}
            onChange={handleChildChange(1)}
          />
          <Checkbox
            label="Option 3"
            checked={checkedItems[2]}
            onChange={handleChildChange(2)}
          />
        </Box>
      </Box>
    );
  },
};

export const WithFormValidation: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      setSubmitted(true);
      if (checked) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Typography variant="body1">
          Please accept the terms and conditions:
        </Typography>
        <Checkbox
          label="I accept the terms and conditions"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          error={submitted && !checked}
        />
        {submitted && !checked && (
          <Typography variant="caption" color="error.main">
            You must accept the terms and conditions to continue
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          Submit
        </Button>
      </Box>
    );
  },
};
