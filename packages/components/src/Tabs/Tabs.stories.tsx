/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, Tab, TabPanel } from './index';
import { Box } from '../Box';
import { Typography } from '../Typography';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'The variant of the tabs',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tabs',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'If true, the tabs will take up the full width of their container',
    },
    centered: {
      control: 'boolean',
      description: 'If true, the tabs will be centered',
    },
    indicatorColor: {
      control: 'color',
      description: 'The color of the indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic Tabs
export const Basic: Story = {
  render: () => (
    <Box width="500px">
      <Tabs>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
        <TabPanel value={0} index={0}>
          <Typography>Content for Tab 1</Typography>
        </TabPanel>
        <TabPanel value={0} index={1}>
          <Typography>Content for Tab 2</Typography>
        </TabPanel>
        <TabPanel value={0} index={2}>
          <Typography>Content for Tab 3</Typography>
        </TabPanel>
      </Tabs>
    </Box>
  ),
};

// Controlled Tabs
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box width="500px">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
          <TabPanel value={value} index={0}>
            <Typography>Content for Tab 1</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography>Content for Tab 2</Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography>Content for Tab 3</Typography>
          </TabPanel>
        </Tabs>
      </Box>
    );
  },
};

// Tabs with Icons
export const WithIcons: Story = {
  render: () => (
    <Box width="500px">
      <Tabs>
        <Tab label="Home" icon={<span>🏠</span>} />
        <Tab label="Profile" icon={<span>👤</span>} />
        <Tab label="Settings" icon={<span>⚙️</span>} />
        <TabPanel value={0} index={0}>
          <Typography>Home content</Typography>
        </TabPanel>
        <TabPanel value={0} index={1}>
          <Typography>Profile content</Typography>
        </TabPanel>
        <TabPanel value={0} index={2}>
          <Typography>Settings content</Typography>
        </TabPanel>
      </Tabs>
    </Box>
  ),
};

// Vertical Tabs
export const Vertical: Story = {
  render: () => (
    <Box display="flex" height="300px">
      <Tabs orientation="vertical">
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
        <TabPanel value={0} index={0}>
          <Typography>Content for Tab 1</Typography>
        </TabPanel>
        <TabPanel value={0} index={1}>
          <Typography>Content for Tab 2</Typography>
        </TabPanel>
        <TabPanel value={0} index={2}>
          <Typography>Content for Tab 3</Typography>
        </TabPanel>
      </Tabs>
    </Box>
  ),
};

// Different Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px" width="500px">
      <Box gap={8}>
        <Typography variant="h6">Filled Variant</Typography>
        <Tabs variant="filled">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>

      <Box gap={8}>
        <Typography variant="h6">Outlined Variant</Typography>
        <Tabs variant="outlined">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>

      <Box gap={8}>
        <Typography variant="h6">Text Variant</Typography>
        <Tabs variant="text">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>
    </Box>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="32px" width="500px">
      <Box gap={8}>
        <Typography variant="h6">Small Size</Typography>
        <Tabs size="sm">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>

      <Box gap={8}>
        <Typography variant="h6">Medium Size (Default)</Typography>
        <Tabs size="md">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>

      <Box gap={8}>
        <Typography variant="h6">Large Size</Typography>
        <Tabs size="lg">
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
          <Tab label="Tab 3" />
        </Tabs>
      </Box>
    </Box>
  ),
};

// Full Width Tabs
export const FullWidth: Story = {
  render: () => (
    <Box width="500px">
      <Tabs fullWidth>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
    </Box>
  ),
};

// Centered Tabs
export const Centered: Story = {
  render: () => (
    <Box width="500px">
      <Tabs centered>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
    </Box>
  ),
};

// Disabled Tab
export const DisabledTab: Story = {
  render: () => (
    <Box width="500px">
      <Tabs>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" disabled />
        <Tab label="Tab 3" />
      </Tabs>
    </Box>
  ),
};

// Custom Indicator Color
export const CustomIndicatorColor: Story = {
  render: () => (
    <Box width="500px">
      <Tabs indicatorColor="success">
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>
    </Box>
  ),
};

// Tabs in a Card
export const TabsInCard: Story = {
  render: () => (
    <Box
      width="500px"
      padding="16px"
      boxShadow="0 4px 8px rgba(0,0,0,0.1)"
      borderRadius="8px"
      backgroundColor="white"
      gap={16}
    >
      <Typography variant="h5">Card with Tabs</Typography>
      <Tabs>
        <Tab label="Details" />
        <Tab label="Settings" />
        <Tab label="History" />
        <TabPanel value={0} index={0}>
          <Box padding="16px 0">
            <Typography>
              This is the details panel with information about the item .
            </Typography>
            <Typography>You can add any content here.</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={0} index={1}>
          <Box padding="16px 0" gap={8}>
            <Typography>Settings panel content.</Typography>
            <Typography>Configure your preferences here.</Typography>
          </Box>
        </TabPanel>
        <TabPanel value={0} index={2}>
          <Box padding="16px 0" gap={8}>
            <Typography>History panel showing past activities.</Typography>
            <Typography>View your recent actions.</Typography>
          </Box>
        </TabPanel>
      </Tabs>
    </Box>
  ),
};

// Scrollable Tabs
export const ScrollableTabs: Story = {
  render: () => (
    <Box width="300px" overflow="hidden">
      <Tabs>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
        <Tab label="Tab 4" />
        <Tab label="Tab 5" />
        <Tab label="Tab 6" />
        <Tab label="Tab 7" />
      </Tabs>
    </Box>
  ),
};

// Complex Example
export const ComplexExample: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box
        width="600px"
        padding="24px"
        boxShadow="0 4px 12px rgba(0,0,0,0.1)"
        borderRadius="8px"
        backgroundColor="white"
        gap={16}
      >
        <Typography variant="h4">Project Dashboard</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="filled"
          indicatorColor="primary"
        >
          <Tab label="Overview" icon={<span>📊</span>} />
          <Tab label="Tasks" icon={<span>✓</span>} />
          <Tab label="Team" icon={<span>👥</span>} />
          <Tab label="Files" icon={<span>📁</span>} />
          <TabPanel value={value} index={0}>
            <Box padding="24px 0" gap={16}>
              <Typography variant="h6">Project Overview</Typography>
              <Box display="flex" gap="16px" flexWrap="wrap">
                <Box
                  width="calc(50% - 8px)"
                  padding="16px"
                  backgroundColor="#f5f5f5"
                  borderRadius="4px"
                >
                  <Typography variant="subtitle1">Progress</Typography>
                  <Typography variant="h5" color="primary.main">
                    68%
                  </Typography>
                </Box>
                <Box
                  width="calc(50% - 8px)"
                  padding="16px"
                  backgroundColor="#f5f5f5"
                  borderRadius="4px"
                >
                  <Typography variant="subtitle1">Tasks</Typography>
                  <Typography variant="h5" color="primary.main">
                    24/35
                  </Typography>
                </Box>
                <Box
                  width="calc(50% - 8px)"
                  padding="16px"
                  backgroundColor="#f5f5f5"
                  borderRadius="4px"
                >
                  <Typography variant="subtitle1">Team Members</Typography>
                  <Typography variant="h5" color="primary.main">
                    8
                  </Typography>
                </Box>
                <Box
                  width="calc(50% - 8px)"
                  padding="16px"
                  backgroundColor="#f5f5f5"
                  borderRadius="4px"
                >
                  <Typography variant="subtitle1">Deadline</Typography>
                  <Typography variant="h5" color="primary.main">
                    15 Days
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box padding="24px 0" gap={16}>
              <Typography variant="h6">Task List</Typography>
              <Box display="flex" flexDirection="column" gap="8px">
                {[
                  'Design system setup',
                  'Component development',
                  'Documentation',
                  'Testing',
                ].map((task, index) => (
                  <Box
                    key={index.toString()}
                    padding="12px 16px"
                    backgroundColor="#f5f5f5"
                    borderRadius="4px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>{task}</Typography>
                    <Typography
                      variant="body2"
                      color={index < 2 ? 'success.main' : 'text.secondary'}
                    >
                      {index < 2 ? 'Completed' : 'In Progress'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box padding="24px 0" gap={16}>
              <Typography variant="h6">Team Members</Typography>
              <Box display="flex" flexDirection="column" gap="12px">
                {[
                  'John Doe',
                  'Jane Smith',
                  'Robert Johnson',
                  'Emily Davis',
                ].map((member, index) => (
                  <Box
                    key={index.toString()}
                    padding="12px 16px"
                    backgroundColor="#f5f5f5"
                    borderRadius="4px"
                    display="flex"
                    alignItems="center"
                    gap="12px"
                  >
                    <Box
                      width="36px"
                      height="36px"
                      borderRadius="50%"
                      backgroundColor="primary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography color="white">{member.charAt(0)}</Typography>
                    </Box>
                    <Box>
                      <Typography>{member}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {
                          [
                            'Designer',
                            'Developer',
                            'Project Manager',
                            'QA Engineer',
                          ][index]
                        }
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box padding="24px 0" gap={16}>
              <Typography variant="h6">Project Files</Typography>
              <Box display="flex" flexDirection="column" gap="8px">
                {[
                  'Design Assets.zip',
                  'Documentation.pdf',
                  'Project Plan.xlsx',
                  'Meeting Notes.docx',
                ].map((file, index) => (
                  <Box
                    key={index.toString()}
                    padding="12px 16px"
                    backgroundColor="#f5f5f5"
                    borderRadius="4px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>{file}</Typography>
                    <Typography variant="body2" color="primary.main">
                      Download
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </TabPanel>
        </Tabs>
      </Box>
    );
  },
};

// Mobile Tabs Example
export const MobileTabs: Story = {
  render: () => (
    <Box
      width="320px"
      padding="8px"
      border="1px solid #e0e0e0"
      borderRadius="8px"
    >
      <Tabs fullWidth size="sm">
        <Tab label="Home" icon={<span>🏠</span>} />
        <Tab label="Search" icon={<span>🔍</span>} />
        <Tab label="Profile" icon={<span>👤</span>} />
      </Tabs>
    </Box>
  ),
};
