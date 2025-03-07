import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Textarea } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'standard'],
      description: 'Visual style variant of the textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the textarea is in an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the textarea should take up the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoResize: {
      control: 'boolean',
      description:
        'Whether the textarea should automatically adjust its height based on content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    minRows: {
      control: { type: 'number', min: 1 },
      description: 'Minimum number of rows to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    maxRows: {
      control: { type: 'number', min: 1 },
      description: 'Maximum number of rows before scrolling',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Textarea variant="outlined" placeholder="Outlined textarea" />
      <Textarea variant="filled" placeholder="Filled textarea" />
      <Textarea variant="standard" placeholder="Standard textarea" />
    </Box>
  ),
};

export const States: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Textarea placeholder="Default textarea" />
      <Textarea disabled placeholder="Disabled textarea" />
      <Textarea error placeholder="Error textarea" />
    </Box>
  ),
};

export const RowConfiguration: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Textarea minRows={2} placeholder="2 rows minimum" />
      <Textarea minRows={5} placeholder="5 rows minimum" />
      <Textarea
        minRows={3}
        maxRows={6}
        placeholder="3-6 rows (with scrolling)"
      />
    </Box>
  ),
};

export const AutoResize: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px" width="400px">
      <Typography variant="body1">
        Type in the textarea below to see it automatically resize:
      </Typography>
      <Textarea
        autoResize
        minRows={2}
        maxRows={10}
        placeholder="Start typing to see auto-resize in action..."
        fullWidth
      />
    </Box>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width textarea',
  },
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="400px">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled textarea"
          fullWidth
        />
        <Box>
          <Typography variant="body2">Current value:</Typography>
          <Box
            padding="8px"
            border="1px solid"
            borderColor="primary.light"
            borderRadius="sm"
            marginTop="4px"
          >
            {value || '(empty)'}
          </Box>
        </Box>
      </Box>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    const maxLength = 200;

    return (
      <Box display="flex" flexDirection="column" gap="4px" width="400px">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message (max 200 characters)"
          maxLength={maxLength}
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end">
          <Typography
            variant="caption"
            color={
              value.length > maxLength * 0.9 ? 'error.main' : 'text.secondary'
            }
          >
            {value.length}/{maxLength} characters
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const WithFormValidation: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isValid, setIsValid] = useState(true);

    const validateMessage = (value: string) => {
      return value.length >= 10 || value.length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setMessage(newValue);
      setIsValid(validateMessage(newValue));
    };

    return (
      <Box display="flex" flexDirection="column" gap="8px" width="400px">
        <Textarea
          value={message}
          onChange={handleChange}
          error={!isValid}
          placeholder="Enter at least 10 characters"
          fullWidth
        />
        {!isValid && (
          <Typography color="error.main" variant="caption">
            Message must be at least 10 characters long
          </Typography>
        )}
      </Box>
    );
  },
};
