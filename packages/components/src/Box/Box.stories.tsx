import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './index';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'text',
      description: 'Padding applied to all sides',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    margin: {
      control: 'text',
      description: 'Margin applied to all sides',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the box',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the box',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    border: {
      control: 'text',
      description: 'Border style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
      description: 'Display property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    boxShadow: {
      control: 'text',
      description: 'Box shadow',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    overflow: {
      control: 'select',
      options: ['visible', 'hidden', 'scroll', 'auto'],
      description: 'Overflow behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the box',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: 'This is a basic Box',
    padding: '16px',
    backgroundColor: '#cf2525',
    display: 'grid',
  },
};

export const WithBackground: Story = {
  args: {
    children: 'Box with background',
    padding: '16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
};

export const WithBorder: Story = {
  args: {
    children: 'Box with border',
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export const WithShadow: Story = {
  args: {
    children: 'Box with shadow',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '4px',
  },
};

export const FlexContainer: Story = {
  args: {
    display: 'flex',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: (
      <>
        <div
          style={{
            padding: '8px',
            backgroundColor: '#e0e0e0',
            margin: '0 8px',
          }}
        >
          Item 1
        </div>
        <div
          style={{
            padding: '8px',
            backgroundColor: '#e0e0e0',
            margin: '0 8px',
          }}
        >
          Item 2
        </div>
        <div
          style={{
            padding: '8px',
            backgroundColor: '#e0e0e0',
            margin: '0 8px',
          }}
        >
          Item 3
        </div>
      </>
    ),
  },
};

export const FixedDimensions: Story = {
  args: {
    width: '300px',
    height: '150px',
    padding: '16px',
    backgroundColor: '#e8f4fd',
    borderRadius: '4px',
    display: 'flex',
    children: <div style={{ margin: 'auto' }}>Fixed size box (300×150)</div>,
  },
};

export const NestedBoxes: Story = {
  args: {
    padding: '16px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    children: (
      <>
        <Box
          padding="12px"
          margin="0 0 12px 0"
          backgroundColor="#ffffff"
          borderRadius="4px"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
        >
          Nested Box 1
        </Box>
        <Box
          padding="12px"
          backgroundColor="#ffffff"
          borderRadius="4px"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
        >
          Nested Box 2
        </Box>
      </>
    ),
  },
};

export const CardExample: Story = {
  args: {
    width: '300px',
    padding: '0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    children: (
      <>
        <div
          style={{
            height: '150px',
            backgroundColor: '#2196f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Card Image
        </div>
        <Box padding="16px">
          <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
          <p style={{ margin: '0 0 16px 0', color: '#666' }}>
            This is an example of how the Box component can be used to create a
            card-like UI element.
          </p>
          <button
            type="button"
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Learn More
          </button>
        </Box>
      </>
    ),
  },
};
