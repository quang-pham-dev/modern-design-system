import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Divider } from '../Divider';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'The direction of the stack',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
      },
    },
    spacing: {
      control: 'text',
      description: 'The spacing between items',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '0' },
      },
    },
    shouldWrapChildren: {
      control: 'boolean',
      description:
        'If true, each child will be wrapped in a div to ensure consistent spacing',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    divider: {
      control: 'object',
      description: 'Divider element to be rendered between items',
      table: {
        type: { summary: 'React.ReactElement' },
        defaultValue: { summary: 'undefined' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      description: 'Alignment of items along the cross axis',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'stretch' },
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
      description: 'Alignment of items along the main axis',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the stack',
      table: {
        type: { summary: 'string | number' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the stack',
      table: {
        type: { summary: 'string | number' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding applied to all sides',
      table: {
        type: { summary: 'string | number' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the stack',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Helper function to create box items
const createBoxItems = (
  count: number,
  color = '#f5f5f5',
  border = '1px solid #e0e0e0',
) => {
  return Array.from({ length: count }).map((_, index) => (
    <Box
      key={index.toString()}
      padding="16px"
      backgroundColor={color}
      border={border}
      borderRadius="4px"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="body1">Item {index + 1}</Typography>
    </Box>
  ));
};

export const Default: Story = {
  args: {
    direction: 'vertical',
    spacing: '16px',
    width: '300px',
    children: createBoxItems(3),
  },
};

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    spacing: '16px',
    width: '100%',
    maxWidth: '600px',
    children: createBoxItems(3),
  },
};

export const WithDifferentSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: '24px',
    width: '300px',
    children: createBoxItems(4),
  },
};

export const WithDivider: Story = {
  args: {
    direction: 'vertical',
    spacing: '16px',
    width: '300px',
    divider: <Divider />,
    children: createBoxItems(3),
  },
};

export const HorizontalWithDivider: Story = {
  args: {
    direction: 'horizontal',
    spacing: '16px',
    width: '100%',
    maxWidth: '600px',
    divider: <Divider orientation="vertical" height="40px" />,
    alignItems: 'center',
    children: createBoxItems(3),
  },
};

export const NestedStacks: Story = {
  args: {
    direction: 'vertical',
    spacing: '24px',
    width: '100%',
    maxWidth: '600px',
    children: (
      <>
        <Box
          padding="16px"
          backgroundColor="#f5f5f5"
          borderRadius="4px"
          gap="16px"
        >
          <Typography variant="h3">Main Section</Typography>
          <Stack direction="horizontal" spacing="16px" alignItems="center">
            {createBoxItems(2, '#e3f2fd', '1px solid #bbdefb')}
          </Stack>
        </Box>
        <Box padding="16px" backgroundColor="#f5f5f5" borderRadius="4px">
          <Typography variant="h3">Secondary Section</Typography>
          <Stack direction="horizontal" spacing="16px" alignItems="center">
            {createBoxItems(3, '#e8f5e9', '1px solid #c8e6c9')}
          </Stack>
        </Box>
      </>
    ),
  },
};

export const AlignmentOptions: Story = {
  args: {
    direction: 'horizontal',
    spacing: '16px',
    width: '100%',
    maxWidth: '600px',
    height: '200px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'space-between',
    children: Array.from({ length: 3 }).map((_, index) => (
      <Box
        key={index.toString()}
        padding="16px"
        backgroundColor="white"
        border="1px solid #e0e0e0"
        borderRadius="4px"
        height={`${60 + index * 30}px`}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Item {index + 1}
      </Box>
    )),
  },
};

export const FormLayout: Story = {
  args: {
    direction: 'vertical',
    spacing: '20px',
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    children: (
      <Box width="300px" justifyContent="center" alignItems="center">
        <Typography variant="h2">Contact Form</Typography>
        <Stack direction="vertical">
          <Typography variant="label" weight="bold">
            Name
          </Typography>
          <Box
            padding="12px"
            border="1px solid #ddd"
            borderRadius="4px"
            width="100%"
          />
        </Stack>
        <Stack direction="vertical" marginTop="20px" marginBottom="20px">
          <Typography variant="label" weight="bold">
            Email
          </Typography>
          <Box
            padding="12px"
            border="1px solid #ddd"
            borderRadius="4px"
            width="100%"
          />
        </Stack>
        <Stack direction="vertical">
          <Typography variant="label" weight="bold">
            Message
          </Typography>
          <Box
            padding="12px"
            border="1px solid #ddd"
            borderRadius="4px"
            height="100px"
            width="100%"
          />
        </Stack>
        <Stack
          direction="horizontal"
          marginTop="20px"
          spacing="12px"
          justifyContent="flex-end"
        >
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </Stack>
      </Box>
    ),
  },
};

export const CardLayout: Story = {
  args: {
    direction: 'vertical',
    spacing: '16px',
    width: '100%',
    maxWidth: '350px',
    children: Array.from({ length: 3 }).map((_, index) => (
      <Box
        key={index.toString()}
        padding="0"
        backgroundColor="white"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        <Box
          height="160px"
          backgroundColor={`hsl(${index * 60}, 70%, 65%)`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          <Typography variant="h4" color="white">
            Card {index + 1}
          </Typography>
        </Box>
        <Stack direction="vertical" spacing="12px" padding="16px">
          <Typography variant="h3">Card Title {index + 1}</Typography>
          <Typography variant="body2" color="#666">
            This is a card component built using the Stack component for
            consistent spacing.
          </Typography>
          <Stack direction="horizontal" spacing="8px" justifyContent="flex-end">
            <Button variant="text">Learn More</Button>
            <Button variant="primary">Action</Button>
          </Stack>
        </Stack>
      </Box>
    )),
  },
};

export const NavigationMenu: Story = {
  args: {
    direction: 'vertical',
    spacing: '4px',
    width: '240px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    children: (
      <Box gap="16px">
        <Typography variant="h3">Navigation</Typography>
        {['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'].map(
          (item, index) => (
            <Box
              key={index.toString()}
              padding="12px 16px"
              backgroundColor={index === 0 ? '#e0e0e0' : 'transparent'}
              borderRadius="4px"
              width="200px"
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body2">{item}</Typography>
            </Box>
          ),
        )}
      </Box>
    ),
  },
};

export const ResponsiveStack: Story = {
  render: (args) => {
    return (
      <Box style={{ width: '100%', maxWidth: '800px' }} gap="16px">
        <Typography variant="body1">
          This example demonstrates a responsive stack that changes direction
          based on screen size. Resize your browser to see the effect.
        </Typography>
        <Stack
          {...args}
          direction={window.innerWidth < 600 ? 'vertical' : 'horizontal'}
          spacing="16px"
          width="100%"
        >
          {createBoxItems(3)}
        </Stack>
        <Typography variant="caption" color="#666">
          Note: In a real application, you would implement responsive props
          using your styling system. This is a conceptual example.
        </Typography>
      </Box>
    );
  },
};

export const WithWrappedChildren: Story = {
  args: {
    direction: 'vertical',
    spacing: '16px',
    shouldWrapChildren: true,
    width: '300px',
    children: [
      <Typography key="1" variant="body1">
        Text item 1
      </Typography>,
      <Typography key="2" variant="body1">
        Text item 2
      </Typography>,
      <Typography key="3" variant="body1">
        Text item 3
      </Typography>,
    ],
  },
};
