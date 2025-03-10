/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect } from 'react';

import Select from './Select';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { SelectTrigger } from './index';
import { SelectProvider, useSelect } from './SelectContext';

interface SelectOption {
  option: {
    value: string;
    label: string;
    icon?: string;
    description?: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable select component that supports various states, sizes, and variants. It provides features like disabled options, async loading, custom search, and keyboard navigation.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          'Basic select component with default configuration. Shows a list of options in a dropdown when clicked.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Select an option',
    options: defaultOptions,
    value: 'option2',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Select component with a pre-selected value. Demonstrates how to set an initial value.',
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          'The Select component comes in three sizes: small (sm), medium (md), and large (lg). The size affects the padding and font size of the select.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          'Select component supports three visual variants: outlined (default), filled, and standard. Each variant has its own unique visual style and interaction states.',
      },
    },
  },
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
              marginRight: '8px',
            }}
          >
            Submit
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setValue('');
              setTouched(false);
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    );
  },
};

export const CustomizedWithComposition: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, []);

    const selectState = useSelect(defaultOptions, value, setValue);

    return (
      <Box width="300px">
        <Typography variant="body2">
          Customized Select using Composition:
        </Typography>

        <SelectProvider value={selectState}>
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              border: '2px dashed #6366f1',
              borderRadius: '8px',
              padding: '4px',
            }}
          >
            <SelectTrigger
              placeholder="Custom select"
              variant="standard"
              fullWidth
            />

            {selectState.isOpen && (
              <div style={{ position: 'relative', zIndex: 1000 }}>
                <div
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: 0,
                    width: containerWidth,
                    background: 'linear-gradient(to right, #f9fafb, #f3f4f6)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    padding: '8px 0',
                  }}
                >
                  {defaultOptions.map((option) => (
                    <Box
                      key={option.value}
                      style={{
                        padding: '10px 16px',
                        cursor: 'pointer',
                        backgroundColor:
                          option.value === value ? '#6366f120' : 'transparent',
                        borderLeft:
                          option.value === value
                            ? '3px solid #6366f1'
                            : '3px solid transparent',
                        transition: 'all 0.2s',
                      }}
                      onClick={() => {
                        selectState.onChange(option.value);
                        selectState.setIsOpen(false);
                      }}
                    >
                      {option.label}
                    </Box>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SelectProvider>

        <Typography variant="body2">Selected: {value || '(none)'}</Typography>
      </Box>
    );
  },
};

export const AsyncLoading: Story = {
  render: () => {
    const [options, setOptions] = useState<
      Array<{ value: string; label: string }>
    >([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const loadOptions = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOptions([
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'solid', label: 'Solid' },
        ]);
        setLoading(false);
      }, 1500);
    };

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Select
          value={value}
          onChange={setValue}
          placeholder={loading ? 'Loading options...' : 'Select framework'}
          options={options}
          disabled={loading}
          fullWidth
          onClick={() => {
            if (options.length === 0 && !loading) {
              loadOptions();
            }
          }}
        />

        <Button
          onClick={() => {
            setValue('');
            setOptions([]);
          }}
          disabled={options.length === 0}
        >
          Reset
        </Button>
      </Box>
    );
  },
};

export const WithCustomSearch: Story = {
  render: () => {
    const allOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
      { value: 'fig', label: 'Fig' },
      { value: 'grape', label: 'Grape' },
      { value: 'honeydew', label: 'Honeydew' },
    ];

    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = allOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <Box width="300px">
        <div style={{ position: 'relative' }}>
          <Box
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ color: value ? 'inherit' : '#9ca3af' }}>
              {value
                ? allOptions.find((o) => o.value === value)?.label
                : 'Select a fruit'}
            </span>
            <span
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▼
            </span>
          </Box>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '4px',
                zIndex: 1000,
              }}
            >
              <div style={{ padding: '8px' }}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <Box
                      key={option.value}
                      style={{
                        padding: '10px 14px',
                        cursor: 'pointer',
                        backgroundColor:
                          option.value === value ? '#f3f4f6' : 'transparent',
                      }}
                      onClick={() => {
                        setValue(option.value);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      {option.label}
                    </Box>
                  ))
                ) : (
                  <div style={{ padding: '10px 14px', color: '#9ca3af' }}>
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <Typography variant="body2">
          Selected:{' '}
          {value ? allOptions.find((o) => o.value === value)?.label : '(none)'}
        </Typography>
      </Box>
    );
  },
};

export const MultipleSelects: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'uk', label: 'United Kingdom' },
    ];

    const cities = {
      us: [
        { value: 'nyc', label: 'New York' },
        { value: 'la', label: 'Los Angeles' },
        { value: 'chi', label: 'Chicago' },
      ],
      ca: [
        { value: 'tor', label: 'Toronto' },
        { value: 'van', label: 'Vancouver' },
        { value: 'mon', label: 'Montreal' },
      ],
      mx: [
        { value: 'mex', label: 'Mexico City' },
        { value: 'gua', label: 'Guadalajara' },
        { value: 'mon', label: 'Monterrey' },
      ],
      uk: [
        { value: 'lon', label: 'London' },
        { value: 'man', label: 'Manchester' },
        { value: 'bir', label: 'Birmingham' },
      ],
    };

    const handleCountryChange = (newValue: string) => {
      setCountry(newValue);
      setCity(''); // Reset city when country changes
    };

    return (
      <Box display="flex" flexDirection="column" gap="16px" width="300px">
        <Typography variant="body2" weight="bold">
          Dependent Selects:
        </Typography>

        <Select
          value={country}
          onChange={handleCountryChange}
          placeholder="Select a country"
          options={countries}
          fullWidth
        />

        <Select
          value={city}
          onChange={setCity}
          placeholder={country ? 'Select a city' : 'Select a country first'}
          options={country ? cities[country as keyof typeof cities] : []}
          disabled={!country}
          fullWidth
        />

        {country && city && (
          <Typography variant="body2">
            Selected: {countries.find((c) => c.value === country)?.label},
            {
              cities[country as keyof typeof cities].find(
                (c) => c.value === city,
              )?.label
            }
          </Typography>
        )}
      </Box>
    );
  },
};

export const CustomRenderOption: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const options = [
      {
        value: 'react',
        label: 'React',
        icon: '⚛️',
        description: 'A JavaScript library for building user interfaces',
      },
      {
        value: 'vue',
        label: 'Vue',
        icon: '🟢',
        description: 'The Progressive JavaScript Framework',
      },
      {
        value: 'angular',
        label: 'Angular',
        icon: '🔴',
        description:
          'Platform for building mobile and desktop web applications',
      },
      {
        value: 'svelte',
        label: 'Svelte',
        icon: '🟠',
        description: 'Cybernetically enhanced web apps',
      },
    ];

    // Create a custom SelectOption component
    const CustomOption = ({ option, isSelected, onClick }: SelectOption) => (
      <Box
        style={{
          padding: '12px 16px',
          cursor: 'pointer',
          backgroundColor: isSelected ? '#f3f4f6' : 'transparent',
          borderLeft: isSelected
            ? '3px solid #6366f1'
            : '3px solid transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
        onClick={onClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>{option.icon}</span>
          <span style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
            {option.label}
          </span>
        </div>
        <div
          style={{ fontSize: '12px', color: '#6b7280', paddingLeft: '28px' }}
        >
          {option.description}
        </div>
      </Box>
    );

    // Create a custom implementation using the composition pattern
    const selectState = useSelect(options, value, setValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, []);

    return (
      <Box width="300px">
        <Typography variant="body2">Custom Option Rendering:</Typography>

        <SelectProvider value={selectState}>
          <div ref={containerRef} style={{ position: 'relative' }}>
            <SelectTrigger
              placeholder="Select a framework"
              variant="outlined"
              fullWidth
            />

            {selectState.isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: containerWidth,
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  marginTop: '4px',
                  zIndex: 1000,
                  overflow: 'hidden',
                }}
              >
                {options.map((option) => (
                  <CustomOption
                    key={option.value}
                    option={option}
                    isSelected={option.value === value}
                    onClick={() => {
                      selectState.onChange(option.value);
                      selectState.setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </SelectProvider>

        {value && (
          <Box
            marginTop="16px"
            padding="12px"
            backgroundColor="#f9fafb"
            borderRadius="4px"
          >
            <Typography variant="body2" weight="bold">
              Selected Framework:
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
              }}
            >
              <span style={{ fontSize: '24px' }}>
                {options.find((o) => o.value === value)?.icon}
              </span>
              <div>
                <Typography variant="body2" weight="bold">
                  {options.find((o) => o.value === value)?.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {options.find((o) => o.value === value)?.description}
                </Typography>
              </div>
            </div>
          </Box>
        )}
      </Box>
    );
  },
};

export const VirtualizedList: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // Generate a large list of options
    const generateOptions = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        value: `option-${i}`,
        label: `Option ${i + 1}`,
      }));
    };

    const options = generateOptions(1000);

    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, []);

    // Simple virtualization implementation
    const [scrollTop, setScrollTop] = useState(0);
    const itemHeight = 40; // height of each option in pixels
    const visibleItems = 8; // number of items visible at once

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
    const endIndex = Math.min(options.length, startIndex + visibleItems + 6);

    const visibleOptions = options.slice(startIndex, endIndex);
    const paddingTop = startIndex * itemHeight;
    const totalHeight = options.length * itemHeight;

    return (
      <Box width="300px">
        <Typography variant="body2">
          Virtualized Select (1000 options):
        </Typography>

        <div ref={containerRef} style={{ position: 'relative' }}>
          <Box
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ color: value ? 'inherit' : '#9ca3af' }}>
              {value
                ? options.find((o) => o.value === value)?.label
                : 'Select an option'}
            </span>
            <span
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▼
            </span>
          </Box>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: containerWidth,
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '4px',
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  height: `${visibleItems * itemHeight}px`,
                  overflowY: 'auto',
                  position: 'relative',
                }}
                onScroll={handleScroll}
              >
                <div
                  style={{ height: `${totalHeight}px`, position: 'relative' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: paddingTop,
                      left: 0,
                      right: 0,
                    }}
                  >
                    {visibleOptions.map((option) => (
                      <Box
                        key={option.value}
                        style={{
                          height: `${itemHeight}px`,
                          padding: '10px 14px',
                          cursor: 'pointer',
                          backgroundColor:
                            option.value === value ? '#f3f4f6' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          setValue(option.value);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </Box>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Typography variant="body2">
          Selected:{' '}
          {value ? options.find((o) => o.value === value)?.label : '(none)'}
        </Typography>

        <Typography variant="body2">
          Selected:{' '}
          {value && value !== 'placeholder'
            ? options.find((o) => o.value === value)?.label
            : '(none)'}
        </Typography>
      </Box>
    );
  },
};

export const GroupedOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const groupedOptions = [
      {
        groupLabel: 'Frontend',
        options: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
        ],
      },
      {
        groupLabel: 'Backend',
        options: [
          { value: 'node', label: 'Node.js' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
        ],
      },
      {
        groupLabel: 'Database',
        options: [
          { value: 'mongodb', label: 'MongoDB' },
          { value: 'postgres', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
        ],
      },
    ];

    // Flatten options for the Select component
    const flatOptions = groupedOptions.flatMap((group) => group.options);

    return (
      <Box width="300px" gap="8px">
        <Typography variant="body2">Grouped Options:</Typography>

        <div style={{ position: 'relative' }}>
          <Box
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => setValue((value) => (value ? '' : 'placeholder'))}
          >
            <span
              style={{
                color: value && value !== 'placeholder' ? 'inherit' : '#9ca3af',
              }}
            >
              {value && value !== 'placeholder'
                ? flatOptions.find((o) => o.value === value)?.label
                : 'Select a technology'}
            </span>
            <span
              style={{
                transform: value === 'placeholder' ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▼
            </span>
          </Box>

          {value === 'placeholder' && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '4px',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {groupedOptions.map((group, groupIndex) => (
                <div key={group.groupLabel}>
                  <div
                    style={{
                      padding: '8px 12px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      backgroundColor: '#f9fafb',
                      borderTop: groupIndex > 0 ? '1px solid #e5e7eb' : 'none',
                    }}
                  >
                    {group.groupLabel}
                  </div>

                  {group.options.map((option) => (
                    <Box
                      key={option.value}
                      style={{
                        padding: '10px 14px 10px 20px',
                        cursor: 'pointer',
                        backgroundColor:
                          option.value === value ? '#f3f4f6' : 'transparent',
                      }}
                      onClick={() => setValue(option.value)}
                    >
                      {option.label}
                    </Box>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <Typography variant="body2">
          Selected:{' '}
          {value && value !== 'placeholder'
            ? flatOptions.find((o) => o.value === value)?.label
            : '(none)'}
        </Typography>
      </Box>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const options = [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'py', label: 'Python' },
      { value: 'rb', label: 'Ruby' },
      { value: 'go', label: 'Go' },
      { value: 'rs', label: 'Rust' },
    ];

    const handleToggleOption = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    };

    return (
      <Box width="300px" gap="8px">
        <Typography variant="body2">Multi-Select Implementation:</Typography>

        <div style={{ position: 'relative' }}>
          <Box
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '42px',
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedValues.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedValues.map((value) => (
                  <Box
                    key={value}
                    style={{
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleOption(value);
                    }}
                  >
                    {options.find((o) => o.value === value)?.label}
                    <span style={{ cursor: 'pointer', fontSize: '12px' }}>
                      ✕
                    </span>
                  </Box>
                ))}
              </div>
            ) : (
              <span style={{ color: '#9ca3af' }}>Select languages</span>
            )}
            <span
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▼
            </span>
          </Box>

          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '4px',
                zIndex: 1000,
              }}
            >
              {options.map((option) => (
                <Box
                  key={option.value}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    backgroundColor: selectedValues.includes(option.value)
                      ? '#f3f4f6'
                      : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleOption(option.value);
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      border: selectedValues.includes(option.value)
                        ? '2px solid #6366f1'
                        : '2px solid #d1d5db',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: selectedValues.includes(option.value)
                        ? '#6366f1'
                        : 'transparent',
                    }}
                  >
                    {selectedValues.includes(option.value) && (
                      <span style={{ color: 'white', fontSize: '12px' }}>
                        ✓
                      </span>
                    )}
                  </div>
                  {option.label}
                </Box>
              ))}
            </div>
          )}
        </div>

        <Typography variant="body2">
          Selected:{' '}
          {selectedValues.length > 0
            ? selectedValues
                .map((v) => options.find((o) => o.value === v)?.label)
                .join(', ')
            : '(none)'}
        </Typography>
      </Box>
    );
  },
};

export const AccessibilityFocused: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
      { value: 'option5', label: 'Option 5' },
    ];

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : prev,
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            setValue(options[focusedIndex]?.value || '');
            setIsOpen(false);
            setFocusedIndex(-1);
          } else {
            setIsOpen(!isOpen);
            if (!isOpen) setFocusedIndex(0);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'Tab':
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
      }
    };

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          optionsRef.current &&
          !optionsRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <Box width="300px" gap="8px">
        <Typography variant="body2">Keyboard Accessible Select:</Typography>

        <div style={{ position: 'relative' }}>
          <div
            ref={triggerRef}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '10px 14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              outline: 'none',
              boxShadow:
                document.activeElement === triggerRef.current
                  ? '0 0 0 2px #6366f120'
                  : 'none',
            }}
          >
            <input
              type="text"
              list="select-options"
              aria-label="Select an option"
              value={options[focusedIndex]?.label || ''}
              readOnly
              tabIndex={0}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
            />
            <datalist id="select-options">
              {options.map((option) => (
                <option key={option.value} value={option.label} />
              ))}
            </datalist>
            <span style={{ color: value ? 'inherit' : '#9ca3af' }}>
              {value
                ? options.find((o) => o.value === value)?.label
                : 'Select an option'}
            </span>
            <span
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            >
              ▼
            </span>
          </div>

          {isOpen && (
            <Box
              ref={optionsRef}
              id="select-options"
              aria-label="Options"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '4px',
                zIndex: 1000,
              }}
            >
              {options.map((option, index) => (
                <Box
                  key={option.value}
                  id={`option-${option.value}`}
                  aria-selected={option.value === value}
                  style={{
                    padding: '10px 14px',
                    cursor: 'pointer',
                    backgroundColor:
                      index === focusedIndex
                        ? '#6366f120'
                        : option.value === value
                          ? '#f3f4f6'
                          : 'transparent',
                    outline: 'none',
                  }}
                  onClick={() => {
                    setValue(option.value);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  {option.label}
                </Box>
              ))}
            </Box>
          )}
        </div>

        <Box marginTop="16px" gap="8px">
          <Typography variant="body2">
            Selected:{' '}
            {value ? options.find((o) => o.value === value)?.label : '(none)'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Try using keyboard: Tab to focus, Space/Enter to open, Arrow keys to
            navigate, Enter to select, Esc to close
          </Typography>
        </Box>
      </Box>
    );
  },
};
export const ThemeAwareSelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const options = [
      { value: 'home', label: 'Home', icon: '🏠' },
      { value: 'search', label: 'Search', icon: '🔍' },
      { value: 'settings', label: 'Settings', icon: '⚙️' },
      { value: 'profile', label: 'Profile', icon: '👤' },
      { value: 'notifications', label: 'Notifications', icon: '🔔' },
    ];

    // Theme configurations
    const themes = {
      light: {
        background: '#ffffff',
        text: '#1f2937',
        border: '#d1d5db',
        placeholder: '#9ca3af',
        hover: '#f3f4f6',
        selected: '#e5e7eb',
        shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        accent: '#6366f1',
      },
      dark: {
        background: '#1f2937',
        text: '#f9fafb',
        border: '#4b5563',
        placeholder: '#9ca3af',
        hover: '#374151',
        selected: '#4b5563',
        shadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        accent: '#818cf8',
      },
    };

    const currentTheme = themes[theme];

    return (
      <Box width="300px" gap="16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="16px"
        >
          <Typography variant="body2" weight="bold">
            Theme-Aware Select:
          </Typography>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          >
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Box>

        <div
          style={{
            padding: '16px',
            backgroundColor: currentTheme.background,
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div style={{ position: 'relative' }}>
            <Box
              style={{
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '4px',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: currentTheme.background,
                color: currentTheme.text,
                transition: 'all 0.3s ease',
              }}
              onClick={() => setValue((value) => (value ? '' : 'placeholder'))}
            >
              <span
                style={{
                  color:
                    value && value !== 'placeholder'
                      ? currentTheme.text
                      : currentTheme.placeholder,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {value && value !== 'placeholder' ? (
                  <>
                    <span>{options.find((o) => o.value === value)?.icon}</span>
                    <span>{options.find((o) => o.value === value)?.label}</span>
                  </>
                ) : (
                  'Select an option'
                )}
              </span>
              <span
                style={{
                  transform:
                    value === 'placeholder' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  color: currentTheme.text,
                }}
              >
                ▼
              </span>
            </Box>

            {value === 'placeholder' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  backgroundColor: currentTheme.background,
                  borderRadius: '4px',
                  boxShadow: currentTheme.shadow,
                  marginTop: '4px',
                  zIndex: 1000,
                  border: `1px solid ${currentTheme.border}`,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {options.map((option) => (
                  <Box
                    key={option.value}
                    style={{
                      padding: '10px 14px',
                      cursor: 'pointer',
                      backgroundColor:
                        option.value === value
                          ? currentTheme.selected
                          : currentTheme.background,
                      color: currentTheme.text,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background-color 0.2s ease',
                    }}
                    onClick={() => setValue(option.value)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        currentTheme.hover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        option.value === value
                          ? currentTheme.selected
                          : currentTheme.background;
                    }}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </Box>
                ))}
              </div>
            )}
          </div>

          {value && value !== 'placeholder' && (
            <Typography variant="body2" style={{ color: currentTheme.text }}>
              Selected: {options.find((o) => o.value === value)?.label}
            </Typography>
          )}
        </div>

        <Typography variant="body2">
          This select component adapts to the current theme, changing colors and
          styles accordingly.
        </Typography>
      </Box>
    );
  },
};
