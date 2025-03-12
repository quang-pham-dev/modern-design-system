/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { Box } from '../Box';

const meta = {
  title: 'Form/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'The selected date',
    },
    dateFormat: {
      control: 'select',
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'],
      description: 'Format to display the date',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    isDisabled: {
      control: 'boolean',
      description: 'If true, the datepicker is disabled',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'If true, the datepicker is read-only',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic DatePicker
export const Basic: Story = {
  args: {
    placeholder: 'Select date',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <Box width="300px">
        <DatePicker {...args} value={date} onChange={setDate} />
      </Box>
    );
  },
};

// With Default Value
export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Select date',
  },
  render: (args) => {
    const defaultDate = new Date();
    const [date, setDate] = useState<Date | null>(defaultDate);
    return (
      <Box width="300px">
        <DatePicker {...args} value={date} onChange={setDate} />
      </Box>
    );
  },
};

// Different Date Formats
export const DateFormats: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(new Date());
    const [date2, setDate2] = useState<Date | null>(new Date());
    const [date3, setDate3] = useState<Date | null>(new Date());

    return (
      <Box display="flex" flexDirection="column" gap="1rem" width="300px">
        <DatePicker
          value={date1}
          onChange={setDate1}
          dateFormat="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        />
        <DatePicker
          value={date2}
          onChange={setDate2}
          dateFormat="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
        />
        <DatePicker
          value={date3}
          onChange={setDate3}
          dateFormat="YYYY/MM/DD"
          placeholder="YYYY/MM/DD"
        />
      </Box>
    );
  },
};

// With Min and Max Date
export const WithMinMaxDate: Story = {
  args: {
    placeholder: 'Select date (within range)',
  },
  render: (args) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); // 7 days ago

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7); // 7 days from now

    const [date, setDate] = useState<Date | null>(today);

    return (
      <Box width="300px">
        <DatePicker
          {...args}
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Box>
    );
  },
};

// Disabled DatePicker
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled datepicker',
    isDisabled: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <Box width="300px">
        <DatePicker {...args} value={date} onChange={setDate} />
      </Box>
    );
  },
};

// Read-only DatePicker
export const ReadOnly: Story = {
  args: {
    placeholder: 'Read-only datepicker',
    isReadOnly: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <Box width="300px">
        <DatePicker {...args} value={date} onChange={setDate} />
      </Box>
    );
  },
};
