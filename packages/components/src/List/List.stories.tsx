import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemText } from './ListItemText';
import { ListItemIcon } from './ListItemIcon';
import { Box } from '../Box';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'contained'],
      description: 'The variant of the list',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the list',
    },
    density: {
      control: 'select',
      options: ['default', 'compact', 'comfortable'],
      description: 'The density of the list',
    },
    disablePadding: {
      control: 'boolean',
      description: 'If true, the list will have no padding',
    },
    disableDivider: {
      control: 'boolean',
      description: 'If true, the list items will not have dividers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

// Basic List
export const Basic: Story = {
  args: {
    children: (
      <>
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </>
    ),
  },
};

// List Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List variant="standard" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Standard List" secondary="Default variant" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List variant="outlined" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Outlined List" secondary="With border" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List variant="contained" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Contained List" secondary="With background" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// List Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List size="sm" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Small List" secondary="Smaller text size" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List size="md" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Medium List" secondary="Default size" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List size="lg" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Large List" secondary="Larger text size" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// List Densities
export const Densities: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List density="default" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Default Density" secondary="Normal spacing" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List density="compact" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Compact Density" secondary="Less spacing" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List density="comfortable" sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText
            primary="Comfortable Density"
            secondary="More spacing"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// List with Disabled Padding
export const DisabledPadding: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="Normal Padding" secondary="Default padding" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List disablePadding sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="No Padding" secondary="Padding disabled" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// List with Disabled Dividers
export const DisabledDividers: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="With Dividers" secondary="Default dividers" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List disableDivider sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText primary="No Dividers" secondary="Dividers disabled" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// List with Icons
export const WithIcons: Story = {
  render: () => (
    <List sx={{ width: '300px' }}>
      <ListItem>
        <ListItemIcon>📧</ListItemIcon>
        <ListItemText primary="Inbox" secondary="Messages and notifications" />
      </ListItem>
      <ListItem>
        <ListItemIcon>⭐</ListItemIcon>
        <ListItemText primary="Starred" secondary="Favorite items" />
      </ListItem>
      <ListItem>
        <ListItemIcon>📤</ListItemIcon>
        <ListItemText primary="Sent" secondary="Sent messages" />
      </ListItem>
      <ListItem>
        <ListItemIcon>🗑️</ListItemIcon>
        <ListItemText primary="Trash" secondary="Deleted items" />
      </ListItem>
    </List>
  ),
};

// Interactive List Items
export const InteractiveItems: Story = {
  render: () => (
    <List sx={{ width: '300px' }}>
      <ListItem button>
        <ListItemIcon>🏠</ListItemIcon>
        <ListItemText primary="Home" secondary="Go to home page" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>👤</ListItemIcon>
        <ListItemText primary="Profile" secondary="View your profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>⚙️</ListItemIcon>
        <ListItemText primary="Settings" secondary="Adjust your preferences" />
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>🔒</ListItemIcon>
        <ListItemText primary="Admin" secondary="Restricted access" />
      </ListItem>
    </List>
  ),
};

// Selected List Item
export const SelectedItem: Story = {
  render: () => (
    <List sx={{ width: '300px' }}>
      <ListItem>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem selected>
        <ListItemText primary="Item 2 (Selected)" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" />
      </ListItem>
    </List>
  ),
};

// Dense List Items
export const DenseItems: Story = {
  render: () => (
    <Box display="flex" gap="24px">
      <List sx={{ width: '200px' }}>
        <ListItem>
          <ListItemText
            primary="Normal Density"
            secondary="Default item height"
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>

      <List sx={{ width: '200px' }}>
        <ListItem dense>
          <ListItemText primary="Dense Items" secondary="Reduced item height" />
        </ListItem>
        <ListItem dense>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem dense>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  ),
};

// Nested Lists
export const NestedLists: Story = {
  render: () => (
    <List sx={{ width: '300px' }}>
      <ListItem>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" />
        <List sx={{ paddingLeft: '16px', width: '100%' }}>
          <ListItem>
            <ListItemText primary="Nested Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Nested Item 2" />
          </ListItem>
        </List>
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" />
      </ListItem>
    </List>
  ),
};

// Combined Features
export const CombinedFeatures: Story = {
  render: () => (
    <List
      variant="outlined"
      size="md"
      density="compact"
      sx={{ width: '300px' }}
    >
      <ListItem button selected>
        <ListItemIcon>📂</ListItemIcon>
        <ListItemText primary="Documents" secondary="View your documents" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>📊</ListItemIcon>
        <ListItemText primary="Analytics" secondary="View your statistics" />
      </ListItem>
      <ListItem button disabled>
        <ListItemIcon>🔒</ListItemIcon>
        <ListItemText primary="Restricted" secondary="No access" />
      </ListItem>
      <ListItem dense button>
        <ListItemIcon>ℹ️</ListItemIcon>
        <ListItemText primary="About" secondary="Information" />
      </ListItem>
    </List>
  ),
};
