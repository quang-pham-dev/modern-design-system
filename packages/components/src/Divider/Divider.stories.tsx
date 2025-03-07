import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './index';
import { Stack } from '../Stack';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    color: {
      control: 'color',
      description: 'The color of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#e0e0e0' },
      },
    },
    thickness: {
      control: 'text',
      description: 'The thickness of the divider',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '1px' },
      },
    },
    width: {
      control: 'text',
      description: 'The width of the divider (for horizontal orientation)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'The height of the divider (for vertical orientation)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '100%' },
      },
    },
    margin: {
      control: 'text',
      description: 'The margin around the divider',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box width="300px" gap="16px">
      <Typography variant="body1">Content above the divider</Typography>
      <Divider {...args} />
      <Typography variant="body1">Content below the divider</Typography>
    </Box>
  ),
};

export const CustomColor: Story = {
  args: {
    color: 'rgba(63, 81, 181, 1)',
    thickness: '2px',
  },
  render: (args) => (
    <Box width="300px" gap="16px">
      <Typography variant="body1">Content above the divider</Typography>
      <Divider {...args} />
      <Typography variant="body1">Content below the divider</Typography>
    </Box>
  ),
};

export const WithMargin: Story = {
  args: {
    margin: '24px 0',
  },
  render: (args) => (
    <Box width="300px">
      <Typography variant="body1">Content above the divider</Typography>
      <Divider {...args} />
      <Typography variant="body1">Content below the divider</Typography>
    </Box>
  ),
};

export const VerticalDivider: Story = {
  args: {
    orientation: 'vertical',
    height: '100px',
  },
  render: (args) => (
    <Box display="flex" alignItems="center" height="120px">
      <Typography variant="body1">Left content</Typography>
      <Box margin="0 16px">
        <Divider {...args} />
      </Box>
      <Typography variant="body1">Right content</Typography>
    </Box>
  ),
};

export const InList: Story = {
  render: () => (
    <Box width="300px">
      <Stack direction="vertical" spacing="0">
        <Box padding="16px" borderBottom="1px solid #f0f0f0">
          <Typography variant="body1">List Item 1</Typography>
        </Box>
        <Box padding="16px" borderBottom="1px solid #f0f0f0">
          <Typography variant="body1">List Item 2</Typography>
        </Box>
        <Box padding="16px" borderBottom="1px solid #f0f0f0">
          <Typography variant="body1">List Item 3</Typography>
        </Box>
        <Box padding="16px">
          <Typography variant="body1">List Item 4</Typography>
        </Box>
      </Stack>
    </Box>
  ),
};

export const InTextContent: Story = {
  render: () => (
    <Box width="400px" gap="16px">
      <Typography variant="h3">Section Title</Typography>
      <Typography variant="body1">
        This is the first paragraph of content. It provides an introduction to
        the topic at hand.
      </Typography>
      <Divider margin="24px 0" />
      <Typography variant="h4">Subsection Title</Typography>
      <Typography variant="body1">
        This is the second paragraph of content. It goes into more detail about
        the topic.
      </Typography>
    </Box>
  ),
};

export const MultipleStyles: Story = {
  render: () => (
    <Stack direction="vertical" spacing="32px" width="400px" gap="8px">
      <Box>
        <Typography variant="body2" color="#666">
          Default
        </Typography>
        <Divider />
      </Box>

      <Box>
        <Typography variant="body2" color="#666">
          Thick
        </Typography>
        <Divider thickness="3px" />
      </Box>

      <Box>
        <Typography variant="body2" color="#666">
          Colored
        </Typography>
        <Divider color="#f50057" />
      </Box>

      <Box>
        <Typography variant="body2" color="#666">
          Dashed
        </Typography>
        <Box
          height="1px"
          width="100%"
          style={{
            backgroundImage:
              'linear-gradient(to right, #bdbdbd 50%, transparent 50%)',
            backgroundSize: '16px 1px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </Box>

      <Box gap="8px">
        <Typography variant="body2" color="#666">
          With Text
        </Typography>
        <Box position="relative" paddingTop="10px" paddingBottom="10px">
          <Divider />
          <Box
            position="absolute"
            top="0"
            left="50%"
            padding="0 16px"
            backgroundColor="white"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <Typography variant="body2">OR</Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  ),
};
