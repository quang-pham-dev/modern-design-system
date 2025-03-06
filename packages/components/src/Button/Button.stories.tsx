import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const IconSend = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="sendIconTitle"
  >
    <title id="sendIconTitle">Send</title>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconDownload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="downloadIconTitle"
  >
    <title id="downloadIconTitle">Download</title>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="plusIconTitle"
  >
    <title id="plusIconTitle">Add</title>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="checkIconTitle"
  >
    <title id="checkIconTitle">Check</title>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * The Button component is a versatile interactive element that supports multiple variants,
 * sizes, and colors. It's designed to be used for user actions throughout the application.
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component that supports multiple variants, sizes, and colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The visual style variant of the button',
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'The size of the button',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      description: 'The color scheme of the button',
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    fullWidth: {
      description:
        'Whether the button should take up the full width of its container',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Whether the button is in a loading state',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    startIcon: {
      description: 'Icon to display before the button text',
      control: { disable: true },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    endIcon: {
      description: 'Icon to display after the button text',
      control: { disable: true },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      description: 'Function called when the button is clicked',
      action: 'clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      description: 'The content of the button',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default button with primary variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    color: 'default',
  },
};

/**
 * Button variants showcase
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Button component supports four variants: primary, secondary, outline, and text.',
      },
    },
  },
};

/**
 * Button sizes showcase
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Button component comes in four sizes: xs, sm, md, and lg.',
      },
    },
  },
};

/**
 * Button colors showcase
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button color="default">Default</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="outline" color="default">
          Default
        </Button>
        <Button variant="outline" color="success">
          Success
        </Button>
        <Button variant="outline" color="error">
          Error
        </Button>
        <Button variant="outline" color="warning">
          Warning
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Button component supports four color schemes: default, success, error, and warning.',
      },
    },
  },
};

/**
 * Button with icons
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button startIcon={<IconCheck />}>Start Icon</Button>
        <Button endIcon={<IconPlus />}>End Icon</Button>
        <Button startIcon={<IconCheck />} endIcon={<IconPlus />}>
          Both Icons
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="outline" startIcon={<IconDownload />}>
          Download
        </Button>
        <Button variant="text" endIcon={<IconSend />}>
          Send
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons can include icons at the start, end, or both positions to enhance visual communication.',
      },
    },
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Button can expand to fill the width of its container using the fullWidth prop.',
      },
    },
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button loading>Loading</Button>
        <Button variant="outline" loading>
          Loading
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button loading startIcon={<IconCheck />}>
          With Icon
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons can display a loading state to indicate an ongoing process.',
      },
    },
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="text" disabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons can be disabled to indicate that they are not interactive.',
      },
    },
  },
};

/**
 * Button combinations
 */
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h3>Primary Buttons</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Button size="sm" color="default">
          Default
        </Button>
        <Button size="sm" color="success">
          Success
        </Button>
        <Button size="sm" color="error">
          Error
        </Button>
        <Button size="sm" color="warning">
          Warning
        </Button>
      </div>

      <h3>Secondary Buttons</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Button variant="secondary" size="sm" color="default">
          Default
        </Button>
        <Button variant="secondary" size="sm" color="success">
          Success
        </Button>
        <Button variant="secondary" size="sm" color="error">
          Error
        </Button>
        <Button variant="secondary" size="sm" color="warning">
          Warning
        </Button>
      </div>

      <h3>Outline Buttons</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Button variant="outline" size="sm" color="default">
          Default
        </Button>
        <Button variant="outline" size="sm" color="success">
          Success
        </Button>
        <Button variant="outline" size="sm" color="error">
          Error
        </Button>
        <Button variant="outline" size="sm" color="warning">
          Warning
        </Button>
      </div>

      <h3>Text Buttons</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <Button variant="text" size="sm" color="default">
          Default
        </Button>
        <Button variant="text" size="sm" color="success">
          Success
        </Button>
        <Button variant="text" size="sm" color="error">
          Error
        </Button>
        <Button variant="text" size="sm" color="warning">
          Warning
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Various combinations of button variants, sizes, and colors to showcase the component's versatility.",
      },
    },
  },
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    children: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    color: 'default',
    fullWidth: true,
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to experiment with different button properties.',
      },
    },
  },
};
