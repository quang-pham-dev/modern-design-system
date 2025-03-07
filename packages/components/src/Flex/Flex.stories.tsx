import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Defines the direction of the flex items',
      table: {
        type: { summary: 'row | row-reverse | column | column-reverse' },
        defaultValue: { summary: 'row' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Defines how items are aligned along the main axis',
      table: {
        type: {
          summary:
            'flex-start | flex-end | center | space-between | space-around | space-evenly',
        },
        defaultValue: { summary: 'flex-start' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Defines how items are aligned along the cross axis',
      table: {
        type: {
          summary: 'flex-start | flex-end | center | baseline | stretch',
        },
        defaultValue: { summary: 'stretch' },
      },
    },
    grow: {
      control: 'number',
      description: 'Defines the ability for a flex item to grow if necessary',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    shrink: {
      control: 'number',
      description: 'Defines the ability for a flex item to shrink if necessary',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    basis: {
      control: 'text',
      description:
        'Defines the default size of an element before the remaining space is distributed',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    gap: {
      control: 'text',
      description: 'Defines the spacing between flex items',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Defines if the flex items should wrap',
      table: {
        type: { summary: 'nowrap | wrap | wrap-reverse' },
        defaultValue: { summary: 'nowrap' },
      },
    },
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
    children: {
      control: 'text',
      description: 'The content of the flex container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

// Helper function to create flex item boxes
const createFlexItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => (
    <Box
      key={index.toString()}
      padding="16px"
      backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
      border="1px solid #ccc"
      borderRadius="4px"
      width="80px"
      height="80px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      Item {index + 1}
    </Box>
  ));
};

export const Default: Story = {
  args: {
    children: createFlexItems(3),
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
};

export const RowDirection: Story = {
  args: {
    direction: 'row',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createFlexItems(3),
  },
};

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createFlexItems(3),
  },
};

export const JustifyContent: Story = {
  args: {
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createFlexItems(3),
  },
};

export const AlignItems: Story = {
  args: {
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    height: '200px',
    children: createFlexItems(3),
  },
};

export const WithGap: Story = {
  args: {
    gap: '24px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createFlexItems(3),
  },
};

export const Wrapping: Story = {
  args: {
    wrap: 'wrap',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '300px',
    children: createFlexItems(6),
  },
};

export const ResponsiveLayout: Story = {
  args: {
    direction: 'row',
    wrap: 'wrap',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: Array.from({ length: 5 }).map((_, index) => (
      <Box
        key={index.toString()}
        padding="16px"
        backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
        border="1px solid #ccc"
        borderRadius="4px"
        width="150px"
        height={`${80 + index * 20}px`}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Item {index + 1}
      </Box>
    )),
  },
};

export const CardLayout: Story = {
  args: {
    direction: 'column',
    padding: '0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    width: '300px',
    children: (
      <>
        <Box
          height="150px"
          backgroundColor="#2196f3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          style={{ fontWeight: 'bold' }}
        >
          Card Header
        </Box>
        <Box padding="16px">
          <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
          <p style={{ margin: '0 0 16px 0', color: '#666' }}>
            This is an example of how the Flex component can be used to create a
            card layout with a column direction.
          </p>
          <Flex justifyContent="space-between">
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
              Action 1
            </button>
            <button
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#2196f3',
                border: '1px solid #2196f3',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Action 2
            </button>
          </Flex>
        </Box>
      </>
    ),
  },
};

export const HolyGrailLayout: Story = {
  args: {
    direction: 'column',
    height: '400px',
    width: '100%',
    maxWidth: '800px',
    children: (
      <>
        <Box
          padding="16px"
          backgroundColor="#2196f3"
          color="white"
          textAlign="center"
          style={{ fontWeight: 'bold' }}
        >
          Header
        </Box>
        <Flex grow={1} height="0">
          <Box
            width="200px"
            padding="16px"
            backgroundColor="#e0e0e0"
            overflow="auto"
          >
            <h4 style={{ margin: '0 0 8px 0' }}>Sidebar</h4>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li>Navigation Item 1</li>
              <li>Navigation Item 2</li>
              <li>Navigation Item 3</li>
              <li>Navigation Item 4</li>
            </ul>
          </Box>
          <Box
            grow={1}
            padding="16px"
            backgroundColor="#f5f5f5"
            overflow="auto"
          >
            <h3 style={{ margin: '0 0 16px 0' }}>Main Content</h3>
            <p>
              This is an example of a "Holy Grail" layout with header, footer,
              main content area, and fixed-width sidebars. The Flex component
              makes it easy to create responsive layouts like this.
            </p>
            <p>
              The main content area grows to fill available space, while the
              sidebars maintain their fixed width.
            </p>
          </Box>
          <Box
            width="200px"
            padding="16px"
            backgroundColor="#e0e0e0"
            overflow="auto"
          >
            <h4 style={{ margin: '0 0 8px 0' }}>Right Sidebar</h4>
            <p style={{ margin: 0 }}>
              Additional information or related content can go here.
            </p>
          </Box>
        </Flex>
        <Box
          padding="16px"
          backgroundColor="#2196f3"
          color="white"
          textAlign="center"
        >
          Footer
        </Box>
      </>
    ),
  },
};

export const AlignSelf: Story = {
  args: {
    height: '300px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    gap: '16px',
    children: Array.from({ length: 4 }).map((_, index) => {
      const alignSelf =
        index === 0
          ? 'flex-start'
          : index === 1
            ? 'center'
            : index === 2
              ? 'flex-end'
              : 'stretch';

      return (
        <Box
          key={index.toString()}
          padding="16px"
          backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
          border="1px solid #ccc"
          borderRadius="4px"
          width="80px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ alignSelf }}
        >
          {alignSelf}
        </Box>
      );
    }),
  },
};

export const NestedFlexContainers: Story = {
  args: {
    direction: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: (
      <>
        <Box padding="8px" backgroundColor="#e0e0e0" borderRadius="4px">
          <h3 style={{ margin: '0 0 8px 0' }}>Nested Flex Containers</h3>
        </Box>
        <Flex gap="16px">
          <Box
            width="150px"
            padding="16px"
            backgroundColor="#e0e0e0"
            borderRadius="4px"
          >
            Item 1
          </Box>
          <Flex direction="column" gap="16px" grow={1}>
            <Box padding="16px" backgroundColor="#e0e0e0" borderRadius="4px">
              Nested Item 1
            </Box>
            <Flex gap="16px">
              <Box
                padding="16px"
                backgroundColor="#e0e0e0"
                borderRadius="4px"
                grow={1}
              >
                Nested Item 2
              </Box>
              <Box
                padding="16px"
                backgroundColor="#e0e0e0"
                borderRadius="4px"
                grow={1}
              >
                Nested Item 3
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </>
    ),
  },
};

export const EqualHeightColumns: Story = {
  args: {
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: Array.from({ length: 3 }).map((_, index) => (
      <Box
        key={index.toString()}
        padding="16px"
        backgroundColor="#e0e0e0"
        borderRadius="4px"
        grow={1}
        basis="0"
      >
        <h4 style={{ margin: '0 0 8px 0' }}>Column {index + 1}</h4>
        <p style={{ margin: 0 }}>
          {index === 0 && 'Short content.'}
          {index === 1 &&
            'Medium length content that takes up a bit more space.'}
          {index === 2 &&
            'Longer content that would normally make this column taller than the others. With flex-grow: 1 and flex-basis: 0, all columns maintain equal width regardless of content.'}
        </p>
      </Box>
    )),
  },
};
