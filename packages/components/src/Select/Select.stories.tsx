/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import { Select } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Button } from '../Button';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'standard'],
      description: 'Visual style variant of the select',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the select is in an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the select should take up the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    options: {
      control: 'object',
      description: 'The options to display in the select dropdown',
    },
    value: {
      control: 'text',
      description: 'The currently selected value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
    options: defaultOptions,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select an option',
    options: defaultOptions,
    value: 'option2',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Select size="sm" placeholder="Small select" options={defaultOptions} />
      <Select size="md" placeholder="Medium select" options={defaultOptions} />
      <Select size="lg" placeholder="Large select" options={defaultOptions} />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Select
        variant="outlined"
        placeholder="Outlined select"
        options={defaultOptions}
      />
      <Select
        variant="filled"
        placeholder="Filled select"
        options={defaultOptions}
      />
      <Select
        variant="standard"
        placeholder="Standard select"
        options={defaultOptions}
      />
    </Box>
  ),
};

export const States: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Select placeholder="Default select" options={defaultOptions} />
      <Select disabled placeholder="Disabled select" options={defaultOptions} />
      <Select error placeholder="Error select" options={defaultOptions} />
    </Box>
  ),
};

export const WithDisabledOptions: Story = {
  args: {
    placeholder: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width select',
    options: defaultOptions,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Select
          value={value}
          onChange={(newValue) => setValue(newValue)}
          placeholder="Controlled select"
          options={defaultOptions}
          fullWidth
        />
        <Box>
          <Typography variant="body2">
            Selected value: {value || '(none)'}
          </Typography>
        </Box>
      </Box>
    );
  },
};

export const WithManyOptions: Story = {
  args: {
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'br', label: 'Brazil' },
      { value: 'ar', label: 'Argentina' },
      { value: 'co', label: 'Colombia' },
      { value: 'pe', label: 'Peru' },
      { value: 'cl', label: 'Chile' },
      { value: 'ec', label: 'Ecuador' },
      { value: 'bo', label: 'Bolivia' },
      { value: 'py', label: 'Paraguay' },
      { value: 'uy', label: 'Uruguay' },
      { value: 've', label: 'Venezuela' },
      { value: 'gy', label: 'Guyana' },
      { value: 'sr', label: 'Suriname' },
      { value: 'gf', label: 'French Guiana' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'it', label: 'Italy' },
      { value: 'es', label: 'Spain' },
    ],
  },
};

export const WithFormValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const [touched, setTouched] = useState(false);

    const handleChange = (newValue: string) => {
      setValue(newValue);
      setTouched(true);
    };

    const isValid = value !== '';
    const showError = touched && !isValid;

    return (
      <Box display="flex" flexDirection="column" gap="8px" width="300px">
        <Typography variant="body2" weight="bold">
          Please select an option:
        </Typography>
        <Select
          value={value}
          onChange={handleChange}
          error={showError}
          placeholder="Select an option"
          options={defaultOptions}
          fullWidth
        />
        {showError && (
          <Typography color="error.main" variant="caption">
            This field is required
          </Typography>
        )}
        <Box marginTop="16px">
          <Button
            onClick={() => {
              if (!isValid) {
                setTouched(true);
              } else {
                alert(`Form submitted with value: ${value}`);
              }
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Select
        placeholder="Custom styled select"
        options={defaultOptions}
        style={{
          backgroundColor: '#f8f9fa',
          borderColor: '#dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      />
      <Select
        placeholder="Custom hover effect"
        options={defaultOptions}
        css={{
          '&:hover': {
            backgroundColor: '#f0f4f8',
            transform: 'translateY(-2px)',
            transition: 'transform 0.2s ease',
          },
        }}
      />
    </Box>
  ),
};

export const GroupedWithLabel: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="24px" width="300px">
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography variant="body2" weight="bold">
          Select your country:
        </Typography>
        <Select
          placeholder="Choose a country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
            { value: 'br', label: 'Brazil' },
          ]}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="8px">
        <Typography variant="body2" weight="bold">
          Select your language:
        </Typography>
        <Select
          placeholder="Choose a language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' },
          ]}
        />
      </Box>
    </Box>
  ),
};

export const WithInitialFocus: Story = {
  render: () => {
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      // Focus the select on mount
      if (selectRef.current) {
        selectRef.current.focus();
      }
    }, []);

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Typography variant="body2">
          This select is focused on page load:
        </Typography>
        <Select
          ref={selectRef}
          placeholder="I'm focused on load"
          options={defaultOptions}
          fullWidth
        />
      </Box>
    );
  },
};

export const WithDynamicOptions: Story = {
  render: () => {
    const [category, setCategory] = useState('');

    const categories = [
      { value: 'fruits', label: 'Fruits' },
      { value: 'vegetables', label: 'Vegetables' },
      { value: 'dairy', label: 'Dairy' },
    ];

    const optionsMap = {
      fruits: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
      ],
      vegetables: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'broccoli', label: 'Broccoli' },
        { value: 'spinach', label: 'Spinach' },
      ],
      dairy: [
        { value: 'milk', label: 'Milk' },
        { value: 'cheese', label: 'Cheese' },
        { value: 'yogurt', label: 'Yogurt' },
      ],
      '': [],
    };

    const [item, setItem] = useState('');

    // Reset item when category changes
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useEffect(() => {
      setItem('');
    }, [category]);

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Typography variant="body2" weight="bold">
          Select a category and then an item:
        </Typography>

        <Select
          placeholder="Select category"
          options={categories}
          value={category}
          onChange={setCategory}
          fullWidth
        />

        <Select
          placeholder="Select item"
          options={optionsMap[category as keyof typeof optionsMap] || []}
          value={item}
          onChange={setItem}
          disabled={!category}
          fullWidth
        />

        {category && item && (
          <Box
            padding="12px"
            backgroundColor="primary.light"
            color="white"
            borderRadius="sm"
            marginTop="8px"
          >
            <Typography variant="body2">
              You selected: {item} from {category}
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
};
