import type { Meta, StoryObj } from '@storybook/react';
import { Tag, type TagColorScheme } from './index';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle'],
    },
    colorScheme: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'gray',
      ],
    },
    isRounded: {
      control: 'boolean',
    },
    isClosable: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'text',
    },
    rightIcon: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Tag',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Tag label="Small" size="sm" />
      <Tag label="Medium" size="md" />
      <Tag label="Large" size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Tag label="Solid" variant="solid" />
      <Tag label="Outline" variant="outline" />
      <Tag label="Subtle" variant="subtle" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Tag label="Primary" colorScheme="primary" />
      <Tag label="Secondary" colorScheme="secondary" />
      <Tag label="Success" colorScheme="success" />
      <Tag label="Error" colorScheme="error" />
      <Tag label="Warning" colorScheme="warning" />
      <Tag label="Info" colorScheme="info" />
      <Tag label="Gray" colorScheme="grey" />
    </div>
  ),
};

export const Rounded: Story = {
  args: {
    label: 'Rounded Tag',
    isRounded: true,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Tag label="Info" leftIcon="info-circle" />
      <Tag label="Success" leftIcon="check-circle" colorScheme="success" />
      <Tag
        label="Warning"
        rightIcon="exclamation-triangle"
        colorScheme="warning"
      />
      <Tag
        label="With both icons"
        leftIcon="info-circle"
        rightIcon="check-circle"
        colorScheme="info"
      />
    </div>
  ),
};

export const Closable: Story = {
  args: {
    label: 'Click to close',
    isClosable: true,
    onClose: () => alert('Tag closed!'),
  },
};

export const ClosableWithIcon: Story = {
  args: {
    label: 'Feature',
    leftIcon: 'tag',
    isClosable: true,
    onClose: () => alert('Tag closed!'),
  },
};

export const CustomStyling: Story = {
  args: {
    label: 'Custom Tag',
    sx: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      border: '1px dashed #3f51b5',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  },
};

export const TagGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tag label="React" colorScheme="primary" isRounded />
      <Tag label="TypeScript" colorScheme="info" isRounded />
      <Tag label="JavaScript" colorScheme="warning" isRounded />
      <Tag label="CSS" colorScheme="secondary" isRounded />
      <Tag label="HTML" colorScheme="error" isRounded />
      <Tag label="Node.js" colorScheme="success" isRounded />
    </div>
  ),
};

export const VariantsByColorScheme: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'gray',
      ].map((colorScheme) => (
        <div key={colorScheme} style={{ display: 'flex', gap: '10px' }}>
          <Tag
            label={`${colorScheme} solid`}
            variant="solid"
            colorScheme={colorScheme as TagColorScheme}
          />
          <Tag
            label={`${colorScheme} outline`}
            variant="outline"
            colorScheme={colorScheme as TagColorScheme}
          />
          <Tag
            label={`${colorScheme} subtle`}
            variant="subtle"
            colorScheme={colorScheme as TagColorScheme}
          />
        </div>
      ))}
    </div>
  ),
};
